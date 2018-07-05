package com.hdmon.gateway.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Gateway.
 * <p>
 * Properties are configured in the application.yml file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {
    private final ApplicationProperties.Microservices microservice = new ApplicationProperties.Microservices();

    public Microservices getMicroservices() {
        return microservice;
    }

    public static class Microservices {
        private String notificationUrl = "http://localhost:8080/notificationservice";

        public Microservices() {
        }

        public String getNotificationUrl() {
            return notificationUrl;
        }

        public void setNotificationUrl(String notificationUrl) {
            this.notificationUrl = notificationUrl;
        }
    }
}
