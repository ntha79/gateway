package com.hdmon.gateway.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hdmon.gateway.domain.IsoResponseEntity;
import com.hdmon.gateway.security.oauth2.OAuth2AuthenticationService;
import com.hdmon.gateway.service.util.TokenHelper;
import com.hdmon.gateway.web.rest.errors.ResponseErrorCode;
import com.hdmon.gateway.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.Map;

/**
 * Authentication endpoint for web client.
 * Used to authenticate a user using OAuth2 access tokens or log him out.
 *
 * @author markus.oellinger
 */
@RestController
@RequestMapping("/auth")
public class AuthResource {

    private final Logger log = LoggerFactory.getLogger(AuthResource.class);

    private OAuth2AuthenticationService authenticationService;

    public AuthResource(OAuth2AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    /**
     * Authenticates a user setting the access and refresh token cookies.
     *
     * @param request  the HttpServletRequest holding - among others - the headers passed from the client.
     * @param response the HttpServletResponse getting the cookies set upon successful authentication.
     * @param params   the login params (username, password, rememberMe).
     * @return the access token of the authenticated user. Will return an error code if it fails to authenticate the user.
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST, consumes = MediaType
        .APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<OAuth2AccessToken> authenticate(HttpServletRequest request, HttpServletResponse response, @RequestBody
        Map<String, String> params) {
        return authenticationService.authenticate(request, response, params);
    }

    /**
     * Logout current user deleting his cookies.
     *
     * @param request  the HttpServletRequest holding - among others - the headers passed from the client.
     * @param response the HttpServletResponse getting the cookies set upon successful authentication.
     * @return an empty response entity.
     */
    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    @Timed
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response, @RequestBody
        Map<String, String> params) {
        String userLoginname = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("logging out user {}", userLoginname);
        authenticationService.logout(request, response);
        return ResponseEntity.ok(null);
    }

    //=========================================HDMON-START=========================================
    /**
     * POST  /hd/login : đăng nhập vào hệ thống.
     * Last update date: 20-07-2018
     * @return cấu trúc json, báo kết quả đăng nhập.
     */
    @RequestMapping(value = "/hd/login", method = RequestMethod.POST)
    @Timed
    public ResponseEntity<IsoResponseEntity> login_hd(HttpServletRequest request, HttpServletResponse response, @RequestBody
        Map<String, String> params) {
        log.debug("REST request to login into the system.");

        IsoResponseEntity<OAuth2AccessToken> responseEntity = new IsoResponseEntity<>();
        HttpHeaders httpHeaders;
        try {
            OAuth2AccessToken accessToken = authenticationService.authenticate_hd(request, response, params, responseEntity);
            if(accessToken != null) {
                responseEntity.setError(ResponseErrorCode.SUCCESSFULL.getValue());
                responseEntity.setData(accessToken);
                responseEntity.setMessage("successfull");

                httpHeaders = HeaderUtil.createAlert("Auth", "successfull");
            }
            else if(responseEntity.getError() == ResponseErrorCode.UNKNOW_ERROR.getValue())
            {
                responseEntity.setError(ResponseErrorCode.FAIL.getValue());
                responseEntity.setData(null);
                responseEntity.setMessage("fail");

                httpHeaders = HeaderUtil.createAlert("Auth", "fail");
            }
            else
            {
                httpHeaders = HeaderUtil.createFailureAlert("Auth", responseEntity.getMessage(), responseEntity.getException());
            }
        }
        catch (Exception ex)
        {
            responseEntity.setError(ResponseErrorCode.SYSTEM_ERROR.getValue());
            responseEntity.setMessage("system_error");
            responseEntity.setException(String.format("%s", ex.getMessage()));

            httpHeaders = HeaderUtil.createFailureAlert("Auth", "system_error", ex.getMessage());

            log.info("Co loi xay ra khi goi ham AuthResource.login_hd({})", params);
            log.error("failed to get OAuth2 tokens from UAA", ex);
        }
        return new ResponseEntity<>(responseEntity, httpHeaders, HttpStatus.OK);
    }

    /**
     * POST  /hd/logout : đăng xuất khỏi hệ thống.
     * Last update date: 19-07-2018
     * @return cấu trúc json, báo kết quả đăng xuất.
     */
    @RequestMapping(value = "/hd/logout", method = RequestMethod.POST)
    @Timed
    public ResponseEntity<IsoResponseEntity> logout_hd(HttpServletRequest request, HttpServletResponse response, @RequestBody
        Map<String, String> params) {
        log.debug("REST request to clear session, cookie info.");

        IsoResponseEntity responseEntity = new IsoResponseEntity();
        HttpHeaders httpHeaders;
        try {
            String userLoginname = SecurityContextHolder.getContext().getAuthentication().getName();
            log.info("logging out user {}", userLoginname);
            boolean blResult = authenticationService.logout_hd(request, response, params);
            if(blResult) {
                responseEntity.setError(ResponseErrorCode.SUCCESSFULL.getValue());
                responseEntity.setData(true);
                responseEntity.setMessage("successfull");

                httpHeaders = HeaderUtil.createAlert("Auth", "successfull");
            }
            else
            {
                responseEntity.setError(ResponseErrorCode.FAIL.getValue());
                responseEntity.setData(false);
                responseEntity.setMessage("fail");

                httpHeaders = HeaderUtil.createAlert("Auth", "fail");
            }
        }
        catch (Exception ex)
        {
            responseEntity.setError(ResponseErrorCode.SYSTEM_ERROR.getValue());
            responseEntity.setMessage("system_error");
            responseEntity.setException(String.format("%s", ex.getMessage()));

            httpHeaders = HeaderUtil.createFailureAlert("Auth", "system_error", ex.getMessage());
        }
        return new ResponseEntity<>(responseEntity, httpHeaders, HttpStatus.OK);
    }


    /**
     * POST  /hd/refreshtoken : làm mới token.
     * Last update date: 19-07-2018
     * @return cấu trúc json trong đó có chi tiết của token mới.
     */
    @RequestMapping(value = "/hd/refreshtoken", method = RequestMethod.POST)
    @Timed
    public ResponseEntity<IsoResponseEntity> refreshToken_hd(HttpServletRequest request, HttpServletResponse response, @RequestBody
        Map<String, String> params) {
        log.debug("REST request to refresh token from the refreshtoken");

        IsoResponseEntity responseEntity = new IsoResponseEntity();
        HttpHeaders httpHeaders;
        try {
            OAuth2AccessToken accessToken = authenticationService.refreshTokenForApp_hd(request, response, params);
            if(accessToken != null) {
                responseEntity.setError(ResponseErrorCode.SUCCESSFULL.getValue());
                responseEntity.setData(accessToken);
                responseEntity.setMessage("successfull");
                httpHeaders = HeaderUtil.createEntityCreationAlert("Auth", String.valueOf(1));
            }
            else
            {
                responseEntity.setError(ResponseErrorCode.DENIED.getValue());
                responseEntity.setMessage("denied");
                responseEntity.setException("You are not authorized to perform this action!");
                httpHeaders = HeaderUtil.createFailureAlert("Auth", "denied", "You are not authorized to perform this action!");
            }
        }
        catch (Exception ex)
        {
            responseEntity.setError(ResponseErrorCode.SYSTEM_ERROR.getValue());
            responseEntity.setMessage("system_error");
            responseEntity.setException(String.format("%s", ex.getMessage()));

            httpHeaders = HeaderUtil.createFailureAlert("Auth", "system_error", ex.getMessage());
        }
        return new ResponseEntity<>(responseEntity, httpHeaders, HttpStatus.OK);
    }

    /**
     * GET  /hd/servertime : lấy giờ của hệ thống.
     * Last update date: 19-07-2018
     * @return cấu trúc json trong đó có giờ của hệ thống.
     */
    @GetMapping("/hd/servertime")
    @Timed
    public ResponseEntity<IsoResponseEntity> getServerTime_hd() {
        log.debug("REST request to get time of server");

        IsoResponseEntity responseEntity = new IsoResponseEntity();
        responseEntity.setError(ResponseErrorCode.SUCCESSFULL.getValue());
        responseEntity.setData(new Date().getTime());
        responseEntity.setMessage("successfull");

        return new ResponseEntity<>(responseEntity, HttpStatus.OK);
    }

    //=========================================HDMON-END===========================================
}
