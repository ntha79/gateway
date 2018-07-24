package com.hdmon.gateway.service.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hdmon.gateway.config.ApplicationProperties;
import com.hdmon.gateway.domain.IsoResponseEntity;
import com.hdmon.gateway.security.oauth2.OAuth2AuthenticationService;
import com.hdmon.gateway.web.rest.vm.CancelGcmUserVM;
import com.hdmon.gateway.web.rest.vm.StoreGcmUserVM;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by UserName on 7/19/2018.
 */
public class MicroserviceHelper {
    private final static Logger log = LoggerFactory.getLogger(MicroserviceHelper.class);

    /**
     * Cập nhật thông tin thiết bị khi dăng nhập sang notification serivce
     * Last update date: 19-07-2018
     * @param accessToken  token của thành viên đăng nhập.
     * @param userId id của thành viên đang xử lý.
     * @param deviceId id của thiết bị hiện thời.
     * @param appVersion phiên bản của app.
     * @param appVersion đời máy và hđh đang sử dụng.
     * @param clientType phân loại hệ điều hành để thống kê.
     * @param clientLocation địa điểm thực hiện đăng nhập.
     */
    public static boolean updateDeviceManagerByLogin(String notificationUrl, String accessToken, Long userId, String deviceId, String appVersion, String clientVersion, String clientType, String clientLocation)
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

            Map<String, String> params = new HashMap<>();
            params.put("userLoginId", userId.toString());
            params.put("deviceId", deviceId);
            params.put("appVersion", appVersion);
            params.put("clientVersion", clientVersion);
            params.put("clientType", clientType);
            params.put("clientLocation", clientLocation);
            String jsonBody = mapper.writeValueAsString(params);

            HttpEntity<String> httpEntity = new HttpEntity<>(jsonBody, reqHeaders);
            String requestUrl = notificationUrl + "/api/hd/devicemanagers/updatebylogin";
            ResponseEntity<IsoResponseEntity> responseEntity = restTemplate.postForEntity(requestUrl, httpEntity, IsoResponseEntity.class);

            if (responseEntity.getStatusCode() != HttpStatus.OK) {
                log.debug("failed to update devicemanagers by login on Notification Service, status: {}", responseEntity.getStatusCodeValue());
                blResult = false;
            } else {
                if (responseEntity.getBody().getError() == 1) {
                    blResult = true;
                }
            }
        }
        catch (Exception ex)
        {
            log.info("Loi ghi trong ham MicroserviceHelper.updateDeviceManagerByLogin(token, {},{})", userId, deviceId);
            log.error("{}", ex);
        }
        return blResult;
    }

    /**
     * Cập nhật thông tin thiết bị khi dăng xuất sang notification serivce
     * Last update date: 19-07-2018
     * @param accessToken  token của thành viên đăng nhập.
     * @param userId id của thành viên đang xử lý.
     * @param deviceId id của thiết bị hiện thời.
     *
     */
    public static boolean updateDeviceManagerByLogout(String notificationUrl, String accessToken, Long userId, String deviceId)
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

            Map<String, String> params = new HashMap<>();
            params.put("userLoginId", userId.toString());
            params.put("deviceId", deviceId);
            String jsonBody = mapper.writeValueAsString(params);

            HttpEntity<String> httpEntity = new HttpEntity<>(jsonBody, reqHeaders);
            String requestUrl = notificationUrl + "/api/hd/devicemanagers/updatebylogout";
            ResponseEntity<IsoResponseEntity> responseEntity = restTemplate.postForEntity(requestUrl, httpEntity, IsoResponseEntity.class);

            if (responseEntity.getStatusCode() != HttpStatus.OK) {
                log.debug("failed to update devicemanagers by logout on Notification Service, status: {}", responseEntity.getStatusCodeValue());
                blResult = false;
            } else {
                if (responseEntity.getBody().getError() == 1) {
                    blResult = true;
                }
            }
            log.info("updateDeviceManagerByLogout {}", responseEntity.getBody());
        }
        catch (Exception ex)
        {
            log.info("Loi ghi trong ham MicroserviceHelper.updateDeviceManagerByLogout(token, {},{})", userId, deviceId);
            log.error("{}", ex);
        }
        return blResult;
    }

    /**
     * Lưu thông tin của gmc token sang notification serivce
     * Last update date: 20-07-2018
     * @param userId id của thành viên đăng nhập.
     * @param deviceId id của thiết bị hiện thời.
     * @param gmcRegId token nhận được từ gmc
     */
    public static boolean storeGmcTokenWhenLogin(String notificationUrl, String accessToken, Long userId, String deviceId, String gmcRegId, String clientType)
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

            Map<String, String> params = new HashMap<>();
            params.put("userLoginId", userId.toString());
            params.put("deviceId", deviceId);
            params.put("gmcRegId", gmcRegId);
            params.put("clientType", clientType);
            String jsonBody = mapper.writeValueAsString(params);

            HttpEntity<String> httpEntity = new HttpEntity<>(jsonBody, reqHeaders);
            String requestUrl = notificationUrl + "/api/hd/notificationusers/storeuser";
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
            log.info("Loi ghi trong ham MicroserviceHelper.storeGmcTokenWhenLogin(token, {},{},{},{})", userId, deviceId, gmcRegId, clientType);
            log.error("{}", ex);
        }
        return blResult;
    }

    /**
     * Thay đổi trạng thái của gmc token trong notification serivce khi userlogout
     * Last update date: 20-07-2018
     * @param accessToken token của user đang thao tác
     * @param deviceId id của thiết bị hiện thời.
     * return true/false
     */
    public static boolean cancelGmcTokenWhenLogout(String notificationUrl, String accessToken, String deviceId, Long userLoginId)
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

            Map<String, String> params = new HashMap<>();
            params.put("deviceId", deviceId);
            params.put("userLoginId", userLoginId.toString());

            String jsonBody = mapper.writeValueAsString(params);

            HttpEntity<String> httpEntity = new HttpEntity<>(jsonBody, reqHeaders);
            String requestUrl = notificationUrl + "/api/hd/notificationusers/canceluser";
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
            log.info("Loi ghi trong ham MicroserviceHelper.cancelGmcTokenWhenLogout(token, {})", deviceId);
            log.error("{}", ex);
        }
        return blResult;
    }
}
