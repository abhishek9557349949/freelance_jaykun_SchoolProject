package com.eureka_server.services.controllermanager;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eureka_server.services.model.LoginRequest;
import com.eureka_server.services.model.LoginResponse;
import com.eureka_server.services.model.SignupResponse;
import com.eureka_server.services.model.UserDetails;
import com.eureka_server.services.servicemanager.SessionServices;

@RestController
@RequestMapping("/api")
public class SessionController {
	
	private final SessionServices sessionServices;

    public SessionController(SessionServices sessionServices) {
        this.sessionServices = sessionServices;
    }

    @GetMapping("/getallData")
    public List<UserDetails> getAllUserDetails() {
        return sessionServices.getAllUserDetails();
    }
    
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginreq) {
    	LoginResponse loginResponse = new LoginResponse();
    	try {
    		loginResponse  = sessionServices.loginAttempt(loginreq.getUsername(), loginreq.getPassword(), loginResponse);
    	}catch(Exception e) {
    		loginResponse.setErrorMsg("Something Went Wrong, Please Try Again.");
    	}
    	return loginResponse;
    }
    
    @PostMapping("/logout")
    public LoginResponse logout(@RequestBody LoginRequest loginreq) {
    	LoginResponse logoutResponse = new LoginResponse();
    	try {
    		logoutResponse  = sessionServices.logoutAttempt(loginreq.getUsername(), logoutResponse);
    	}catch(Exception e) {
    		logoutResponse.setErrorMsg("Something Went Wrong, Please Try Again.");
    	}
    	return logoutResponse;
    }
    
    @PostMapping("/signup")
    public SignupResponse signup(@RequestBody UserDetails userDetails) {
    	SignupResponse signupResponse = new SignupResponse();
    	try {
    		signupResponse  = sessionServices.signUpAttempt(userDetails);
    	}catch(Exception e) {
    		signupResponse.setErrorMsg("Something Went Wrong, Please Try Again.");
    	}
    	return signupResponse;
    }
    
    @Scheduled(fixedRate = 60000)
    public void autoLogoutInactiveUsers() {
        sessionServices.autoLogout();
    }
}
