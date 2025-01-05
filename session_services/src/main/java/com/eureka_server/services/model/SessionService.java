package com.eureka_server.services.model;

import java.sql.Timestamp;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

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
	    
	    @Column(name = "password")
	    private String password;

	    @Column(name = "login_time")
	    private Timestamp loginTime;

	    @Column(name = "last_activity_time")
	    private Timestamp lastActivityTime;

	    @Column(name = "expiration_time")
	    private Timestamp expirationTime;

	    @Column(name = "is_active")
	    private String isActive;

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

	    public String isActive() {
	        return isActive;
	    }

	    public void setActive(String active) {
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

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}
	    
}
