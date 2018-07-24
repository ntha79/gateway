package com.hdmon.gateway.web.rest.vm;

/**
 * Created by UserName on 6/30/2018.
 */
public class CancelGcmUserVM {
    private String deviceId;
    private String userLoginname;

    public CancelGcmUserVM()
    {
        super();
    }

    public CancelGcmUserVM(CancelGcmUserVM entity)
    {
        this.deviceId = entity.deviceId;
    }

    public CancelGcmUserVM(String deviceId, String userLoginname)
    {
        this.deviceId = deviceId;
        this.userLoginname = userLoginname;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public CancelGcmUserVM deviceId(String deviceId) {
        this.deviceId = deviceId;
        return this;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getUserLoginname() {
        return userLoginname;
    }

    public CancelGcmUserVM userLoginname(String userLoginname) {
        this.userLoginname = userLoginname;
        return this;
    }

    public void setUserLoginname(String userLoginname) {
        this.userLoginname = userLoginname;
    }

    @Override
    public String toString() {
        return "StoreUserVM{" +
            "deviceId='" + getDeviceId() + '\'' +
            ", userLoginname='" + getUserLoginname() + '\'' +
            '}';
    }
}
