package com.eureka_server.services.model;

import java.sql.Timestamp;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Entity;

@SuppressWarnings("deprecation")
@Entity
@Table(name = "session_service")
public class SessionService {
	    @Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    @Column(name = "session_id")
	    private UUID sessionId;

	    @Column(name = "user_id")
	    private UUID userId;

	    @Column(name = "username")
	    private String username;

	    @Column(name = "login_time")
	    private Timestamp loginTime;

	    @Column(name = "last_activity_time")
	    private Timestamp lastActivityTime;

	    @Column(name = "expiration_time")
	    private Timestamp expirationTime;

	    @Column(name = "is_active")
	    private boolean isActive;

	    @Column(name = "ip_address")
	    private String ipAddress;

	    @Column(name = "user_agent")
	    private String userAgent;

	    @Column(name = "device_info")
	    private String deviceInfo;

	    // Getters and setters
	    public UUID getSessionId() {
	        return sessionId;
	    }

	    public void setSessionId(UUID sessionId) {
	        this.sessionId = sessionId;
	    }

	    public UUID getUserId() {
	        return userId;
	    }

	    public void setUserId(UUID userId) {
	        this.userId = userId;
	    }

	    public String getUsername() {
	        return username;
	    }

	    public void setUsername(String username) {
	        this.username = username;
	    }

	    public Timestamp getLoginTime() {
	        return loginTime;
	    }

	    public void setLoginTime(Timestamp loginTime) {
	        this.loginTime = loginTime;
	    }

	    public Timestamp getLastActivityTime() {
	        return lastActivityTime;
	    }

	    public void setLastActivityTime(Timestamp lastActivityTime) {
	        this.lastActivityTime = lastActivityTime;
	    }

	    public Timestamp getExpirationTime() {
	        return expirationTime;
	    }

	    public void setExpirationTime(Timestamp expirationTime) {
	        this.expirationTime = expirationTime;
	    }

	    public boolean isActive() {
	        return isActive;
	    }

	    public void setActive(boolean active) {
	        isActive = active;
	    }

	    public String getIpAddress() {
	        return ipAddress;
	    }

	    public void setIpAddress(String ipAddress) {
	        this.ipAddress = ipAddress;
	    }

	    public String getUserAgent() {
	        return userAgent;
	    }

	    public void setUserAgent(String userAgent) {
	        this.userAgent = userAgent;
	    }

	    public String getDeviceInfo() {
	        return deviceInfo;
	    }

	    public void setDeviceInfo(String deviceInfo) {
	        this.deviceInfo = deviceInfo;
	    }
}
