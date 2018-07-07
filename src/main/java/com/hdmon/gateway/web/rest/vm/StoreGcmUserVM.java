package com.hdmon.gateway.web.rest.vm;

/**
 * Created by UserName on 6/30/2018.
 */
public class StoreGcmUserVM {
    private String deviceId;
    private String gmcRegId;
    private String clientType;
    private String ownerUsername;

    public StoreGcmUserVM()
    {
        super();
    }

    public StoreGcmUserVM(StoreGcmUserVM entity)
    {
        this.deviceId = entity.deviceId;
        this.gmcRegId = entity.gmcRegId;
        this.clientType = entity.clientType;
        this.ownerUsername = entity.ownerUsername;
    }

    public StoreGcmUserVM(String deviceId, String gmcRegId, String clientType, String ownerUsername)
    {
        this.deviceId = deviceId;
        this.gmcRegId = gmcRegId;
        this.clientType = clientType;
        this.ownerUsername = ownerUsername;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public StoreGcmUserVM deviceId(String deviceId) {
        this.deviceId = deviceId;
        return this;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getGmcRegId() {
        return gmcRegId;
    }

    public StoreGcmUserVM gmcRegId(String gmcRegId) {
        this.gmcRegId = gmcRegId;
        return this;
    }

    public void setGmcRegId(String gmcRegId) {
        this.gmcRegId = gmcRegId;
    }

    public String getClientType() {
        return clientType;
    }

    public StoreGcmUserVM clientType(String clientType) {
        this.clientType = clientType;
        return this;
    }

    public void setClientType(String clientType) {
        this.clientType = clientType;
    }

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public StoreGcmUserVM ownerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
        return this;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }

    @Override
    public String toString() {
        return "StoreGcmUserVM{" +
            "deviceId='" + getDeviceId() + '\'' +
            ", gmcRegId='" + getGmcRegId() + '\'' +
            ", clientType='" + getClientType() + '\'' +
            ", ownerUsername='" + getOwnerUsername() + '\'' +
            '}';
    }
}
