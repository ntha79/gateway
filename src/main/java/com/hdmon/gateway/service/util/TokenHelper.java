package com.hdmon.gateway.service.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.jwt.Jwt;
import org.springframework.security.jwt.JwtHelper;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Optional;

/**
 * Created by UserName on 7/14/2018.
 */
public class TokenHelper {
    private final static Logger log = LoggerFactory.getLogger(TokenHelper.class);

    /**
     * Lấy userId từ token của thành viên đang thực hiện.
     * @param request: request của đối tượng gửi lên.
     * @return trả về giá trị username của user đang thực hiện.
     */
    public static Long getUserIdFromToken(HttpServletRequest request) {
        Long usernId = 0L;
        try {
            final HashMap claimsMap = getClaimsFromRequest(request);
            if(claimsMap != null)
                usernId = Long.parseLong(claimsMap.get("user_id").toString());
        } catch (Exception e) {
            usernId = 0L;
        }
        return usernId;
    }

    /**
     * Lấy userId từ token của thành viên đang thực hiện.
     * @param token: token của đối tượng gửi lên.
     * @return trả về giá trị username của user đang thực hiện.
     */
    public static Long getUserIdFromToken(String token) {
        Long userId = 0L;
        try {
            final HashMap claimsMap = getClaimsFromToken(token);
            if(claimsMap != null)
                userId = Long.parseLong(claimsMap.get("user_id").toString());
        } catch (Exception e) {
            userId = 0L;
        }
        return userId;
    }

    /**
     * Lấy username từ token của thành viên đang thực hiện.
     * @param request: request của đối tượng gửi lên.
     * @return trả về giá trị username của user đang thực hiện.
     */
    public static String getUsernameFromToken(HttpServletRequest request) {
        String username;
        try {
            final HashMap claimsMap = getClaimsFromRequest(request);
            username = claimsMap.get("user_name").toString();
        } catch (Exception e) {
            username = null;
        }
        return username;
    }

    /**
     * Thực hiện kiểm tra userid truyền vào và lấy username từ token.
     * @param request của đối tượng gửi lên.
     * @param userId: id của tài khoản thực hiện.
     * @return trả về giá trị username của user đang thực hiện.
     */
    public static String getUsernameFromToken(HttpServletRequest request, Long userId) {
        String username = null;
        try {
            final HashMap claimsMap = getClaimsFromRequest(request);
            String userIdInToken = claimsMap.get("user_id").toString();
            if(userIdInToken.equals(userId.toString())) {
                username = claimsMap.get("user_name").toString();
            }
        } catch (Exception e) {
            username = null;
        }
        return username;
    }

    /**
     * Thực hiện lấy access token từ header gọi lên.
     *
     * @param request của đối tượng gửi lên.
     * @return trả về giá trị access token.
     */
    public static String extractHeaderToken(HttpServletRequest request) {
        Enumeration<String> headers = request.getHeaders("Authorization");
        while (headers.hasMoreElements()) { // typically there is only one (most servers enforce that)
            String value = headers.nextElement();
            if ((value.toLowerCase().startsWith(OAuth2AccessToken.BEARER_TYPE.toLowerCase()))) {
                String authHeaderValue = value.substring(OAuth2AccessToken.BEARER_TYPE.length()).trim();
                // Add this here for the auth details later. Would be better to change the signature of this method.
                request.setAttribute(OAuth2AuthenticationDetails.ACCESS_TOKEN_TYPE,
                    value.substring(0, OAuth2AccessToken.BEARER_TYPE.length()).trim());
                int commaIndex = authHeaderValue.indexOf(',');
                if (commaIndex > 0) {
                    authHeaderValue = authHeaderValue.substring(0, commaIndex);
                }
                return authHeaderValue;
            }
        }
        return null;
    }

    /**
     * Thực hiện hiện giải mã access token để thực hiện lấy thông tin.
     *
     * @param request của đối tượng gửi lên.
     * @return danh sách các đối tượng trong access token.
     */
    protected static HashMap getClaimsFromRequest(HttpServletRequest request) {
        HashMap claimsMap;
        try {
            String token = extractHeaderToken(request);
            claimsMap = getClaimsFromToken(token);
        } catch (Exception e) {
            claimsMap = null;

            log.info("Loi trong qua trinh giai ma token. Ham goi TokenHelper.getClaimsFromToken()");
            log.error("{}", e);
        }
        return claimsMap;
    }

    /**
     * Thực hiện hiện giải mã access token để thực hiện lấy thông tin.
     *
     * @param token: giá trị token cần giải mã.
     * @return danh sách các đối tượng trong access token.
     */
    public static HashMap getClaimsFromToken(String token) {
        HashMap claimsMap;
        try {
            if(token != null) {
                Jwt jwtToken = JwtHelper.decode(token);
                String claims = jwtToken.getClaims();
                claimsMap = new ObjectMapper().readValue(claims, HashMap.class);
            }
            else
            {
                claimsMap = null;
            }
        } catch (Exception e) {
            claimsMap = null;

            log.info("Loi trong qua trinh giai ma token. Ham goi TokenHelper.getClaimsFromToken()");
            log.error("{}", e);
        }
        return claimsMap;
    }
}
