package com.hdmon.gateway.web.rest.vm;

/**
 * Created by UserName on 6/30/2018.
 */
public class CancelGcmUserVM {
    private String deviceId;

    public CancelGcmUserVM()
    {
        super();
    }

    public CancelGcmUserVM(CancelGcmUserVM entity)
    {
        this.deviceId = entity.deviceId;
    }

    public CancelGcmUserVM(String deviceId)
    {
        this.deviceId = deviceId;
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

    @Override
    public String toString() {
        return "StoreUserVM{" +
            "deviceId='" + getDeviceId() + '\'' +
            '}';
    }
}
