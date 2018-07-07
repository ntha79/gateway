package com.hdmon.gateway.security.oauth2;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.hdmon.gateway.config.ApplicationProperties;
import com.hdmon.gateway.domain.IsoResponseEntity;
import com.hdmon.gateway.web.rest.vm.CancelGcmUserVM;
import com.hdmon.gateway.web.rest.vm.StoreGcmUserVM;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Manages authentication cases for OAuth2 updating the cookies holding access and refresh tokens accordingly.
 * <p>
 * It can authenticate users, refresh the token cookies should they expire and log users out.
 */
public class OAuth2AuthenticationService {

    private final Logger log = LoggerFactory.getLogger(OAuth2AuthenticationService.class);

    /**
     * Number of seconds to cache refresh token grants so we don't have to repeat them in case of parallel requests.
     */
    private static final long REFRESH_TOKEN_CACHE_SECS = 10l;

    /**
     * Used to contact the OAuth2 token endpoint.
     */
    private final OAuth2TokenEndpointClient authorizationClient;
    /**
     * Helps us with cookie handling.
     */
    private final OAuth2CookieHelper cookieHelper;

    /**
     * Caches Refresh grant results for a refresh token value so we can reuse them.
     * This avoids hammering UAA in case of several multi-threaded requests arriving in parallel.
     */
    private final Cache<String, OAuth2Cookies> recentlyRefreshed;

    private final ApplicationProperties applicationProperties;

    public OAuth2AuthenticationService(OAuth2TokenEndpointClient authorizationClient, OAuth2CookieHelper cookieHelper, ApplicationProperties applicationProperties) {
        this.authorizationClient = authorizationClient;
        this.cookieHelper = cookieHelper;
        this.applicationProperties = applicationProperties;

        recentlyRefreshed = CacheBuilder.newBuilder()
            .expireAfterWrite(REFRESH_TOKEN_CACHE_SECS, TimeUnit.SECONDS)
            .build();
    }

    /**
     * Authenticate the user by username and password.
     *
     * @param request  the request coming from the client.
     * @param response the response going back to the server.
     * @param params   the params holding the username, password and rememberMe.
     * @return the OAuth2AccessToken as a ResponseEntity. Will return OK (200), if successful.
     * If the UAA cannot authenticate the user, the status code returned by UAA will be returned.
     */
    public ResponseEntity<OAuth2AccessToken> authenticate(HttpServletRequest request, HttpServletResponse response,
                                                          Map<String, String> params) {
        try {
            String username = params.get("username");
            String password = params.get("password");
            boolean rememberMe = Boolean.valueOf(params.get("rememberMe"));
            String deviceId = params.get("deviceId");
            String gmcRegId = params.get("gmcRegId");
            String clientType = params.get("clientType");

            OAuth2AccessToken accessToken = authorizationClient.sendPasswordGrant(username, password, deviceId, gmcRegId, clientType);
            if(accessToken != null)
            {
                storeGmcToken(accessToken.getValue(), username, deviceId, gmcRegId, clientType);
            }

            OAuth2Cookies cookies = new OAuth2Cookies();
            cookieHelper.createCookies(request, accessToken, rememberMe, cookies);
            cookies.addCookiesTo(response);
            if (log.isDebugEnabled()) {
                log.debug("successfully authenticated user {}", params.get("username"));
            }
            return ResponseEntity.ok(accessToken);
        } catch (Exception ex) {
            log.error("failed to get OAuth2 tokens from UAA", ex);
            throw ex;
        }
    }

    /**
     * Try to refresh the access token using the refresh token provided as cookie.
     * Note that browsers typically send multiple requests in parallel which means the access token
     * will be expired on multiple threads. We don't want to send multiple requests to UAA though,
     * so we need to cache results for a certain duration and synchronize threads to avoid sending
     * multiple requests in parallel.
     *
     * @param request       the request potentially holding the refresh token.
     * @param response      the response setting the new cookies (if refresh was successful).
     * @param refreshCookie the refresh token cookie. Must not be null.
     * @return the new servlet request containing the updated cookies for relaying downstream.
     */
    public HttpServletRequest refreshToken(HttpServletRequest request, HttpServletResponse response, Cookie
        refreshCookie) {
        //check if non-remember-me session has expired
        if (cookieHelper.isSessionExpired(refreshCookie)) {
            log.info("session has expired due to inactivity");
            logout(request, response, null);       //logout to clear cookies in browser
            return stripTokens(request);            //don't include cookies downstream
        }
        OAuth2Cookies cookies = getCachedCookies(refreshCookie.getValue());
        synchronized (cookies) {
            //check if we have a result from another thread already
            if (cookies.getAccessTokenCookie() == null) {            //no, we are first!
                //send a refresh_token grant to UAA, getting new tokens
                String refreshCookieValue = OAuth2CookieHelper.getRefreshTokenValue(refreshCookie);
                OAuth2AccessToken accessToken = authorizationClient.sendRefreshGrant(refreshCookieValue);
                boolean rememberMe = OAuth2CookieHelper.isRememberMe(refreshCookie);
                cookieHelper.createCookies(request, accessToken, rememberMe, cookies);
                //add cookies to response to update browser
                cookies.addCookiesTo(response);
            } else {
                log.debug("reusing cached refresh_token grant");
            }
            //replace cookies in original request with new ones
            CookieCollection requestCookies = new CookieCollection(request.getCookies());
            requestCookies.add(cookies.getAccessTokenCookie());
            requestCookies.add(cookies.getRefreshTokenCookie());
            return new CookiesHttpServletRequestWrapper(request, requestCookies.toArray());
        }
    }

    /**
     * Get the result from the cache in a thread-safe manner.
     *
     * @param refreshTokenValue the refresh token for which we want the results.
     * @return a RefreshGrantResult for that token. This will either be empty, if we are the first one to do the
     * request,
     * or contain some results already, if another thread already handled the grant for us.
     */
    private OAuth2Cookies getCachedCookies(String refreshTokenValue) {
        synchronized (recentlyRefreshed) {
            OAuth2Cookies ctx = recentlyRefreshed.getIfPresent(refreshTokenValue);
            if (ctx == null) {
                ctx = new OAuth2Cookies();
                recentlyRefreshed.put(refreshTokenValue, ctx);
            }
            return ctx;
        }
    }

    /**
     * Logs the user out by clearing all cookies.
     *
     * @param httpServletRequest  the request containing the Cookies.
     * @param httpServletResponse the response used to clear them.
     */
    public void logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                       Map<String, String> params) {
        //Chỉ trường hợp logout mới xóa
        if(params != null) {
            Cookie cookie = OAuth2CookieHelper.getAccessTokenCookie(httpServletRequest);
            String accessToken = cookie.getValue();
            String deviceId = params.get("deviceId");
            cancelGmcToken(accessToken, deviceId);
        }

        //Xóa cookie
        cookieHelper.clearCookies(httpServletRequest, httpServletResponse);
    }

    /**
     * Strips token cookies preventing them from being used further down the chain.
     * For example, the OAuth2 client won't checked them and they won't be relayed to other services.
     *
     * @param httpServletRequest the incoming request.
     * @return the request to replace it with which has the tokens stripped.
     */
    public HttpServletRequest stripTokens(HttpServletRequest httpServletRequest) {
        Cookie[] cookies = cookieHelper.stripCookies(httpServletRequest.getCookies());
        return new CookiesHttpServletRequestWrapper(httpServletRequest, cookies);
    }

    /**
     * Lưu thông tin của gmc token sang notification serivce
     *
     * @param login  username của thành viên đăng nhập.
     * @param deviceId id của thiết bị hiện thời.
     * @param gmcRegId token nhận được từ gmc
     */
    protected boolean storeGmcToken(String accessToken, String login, String deviceId, String gmcRegId, String clientType)
    {
        boolean blResult = false;
        try {
            if (clientType.isEmpty()) clientType = "UNKNOW";
            RestTemplate restTemplate = new RestTemplate();
            ObjectMapper mapper = new ObjectMapper();
            String encodedAuth = OAuth2AccessToken.BEARER_TYPE + " " + accessToken;

            HttpHeaders reqHeaders = new HttpHeaders();
            reqHeaders.add("Authorization", encodedAuth);
            reqHeaders.add("X-XSRF-TOKEN", accessToken);
            reqHeaders.add("Cookie", "XSRF-TOKEN=" + accessToken);
            reqHeaders.setContentType(MediaType.APPLICATION_JSON);

            StoreGcmUserVM storeUserVM = new  StoreGcmUserVM(deviceId, gmcRegId, clientType, login);
            String jsonBody = mapper.writeValueAsString(storeUserVM);

            HttpEntity<String> httpEntity = new HttpEntity<>(jsonBody, reqHeaders);
            String requestUrl = applicationProperties.getMicroservices().getNotificationUrl() + "/api/notificationusers/storeuser";
            ResponseEntity<IsoResponseEntity> responseEntity = restTemplate.postForEntity(requestUrl, httpEntity, IsoResponseEntity.class);

            if (responseEntity.getStatusCode() != HttpStatus.OK) {
                log.debug("failed to store GmcToken on Notification Service, status: {}", responseEntity.getStatusCodeValue());
                blResult = false;
            } else {
                if (responseEntity.getBody().getError() == 1) {
                    blResult = true;
                }
            }
        }
        catch (Exception ex)
        {
            log.info("Loi ghi trong ham OAuth2AuthenticationService.storeGmcToken(token, {},{},{},{})", login, deviceId, gmcRegId, clientType);
            log.error("{}", ex);
        }
        return blResult;
    }

    /**
     * Thay đổi trạng thái của gmc token trong notification serivce khi userlogout
     * @param accessToken token của user đang thao tác
     * @param deviceId id của thiết bị hiện thời.
     * return true/false
     */
    protected boolean cancelGmcToken(String accessToken, String deviceId)
    {
        boolean blResult = false;
        try {
            RestTemplate restTemplate = new RestTemplate();
            ObjectMapper mapper = new ObjectMapper();
            String encodedAuth = OAuth2AccessToken.BEARER_TYPE + " " + accessToken;

            HttpHeaders reqHeaders = new HttpHeaders();
            reqHeaders.add("Authorization", encodedAuth);
            reqHeaders.add("X-XSRF-TOKEN", accessToken);
            reqHeaders.add("Cookie", "XSRF-TOKEN=" + accessToken);
            reqHeaders.setContentType(MediaType.APPLICATION_JSON);

            CancelGcmUserVM cancelGcmUserVM = new  CancelGcmUserVM(deviceId);
            String jsonBody = mapper.writeValueAsString(cancelGcmUserVM);

            HttpEntity<String> httpEntity = new HttpEntity<>(jsonBody, reqHeaders);
            String requestUrl = applicationProperties.getMicroservices().getNotificationUrl() + "/api/notificationusers/canceluser";
            ResponseEntity<IsoResponseEntity> responseEntity = restTemplate.postForEntity(requestUrl, httpEntity, IsoResponseEntity.class);

            if (responseEntity.getStatusCode() != HttpStatus.OK) {
                log.debug("failed to cancel GmcToken on Notification Service, status: {}", responseEntity.getStatusCodeValue());
                blResult = false;
            } else {
                if (responseEntity.getBody().getError() == 1) {
                    blResult = true;
                }
            }
        }
        catch (Exception ex)
        {
            log.info("Loi ghi trong ham OAuth2AuthenticationService.cancelGmcToken(token, {})", deviceId);
            log.error("{}", ex);
        }
        return blResult;
    }
}
