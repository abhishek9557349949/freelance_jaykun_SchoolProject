package com.eureka_server.services.controllermanager;

import com.eureka_server.services.model.UserDetails;
import com.eureka_server.services.servicemanager.SessionServices;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
