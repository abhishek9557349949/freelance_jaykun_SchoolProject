package com.eureka_server.services.servicemanager;


import org.springframework.stereotype.Service;

import com.erueka_server.services.repo.UserDetailsRepository;
import com.eureka_server.services.model.UserDetails;

import java.util.List;

@Service
public class SessionServices {
	private final UserDetailsRepository userDetailsRepository;

    public SessionServices(UserDetailsRepository userDetailsRepository) {
        this.userDetailsRepository = userDetailsRepository;
    }

    public List<UserDetails> getAllUserDetails() {
        return userDetailsRepository.findAll();
    }
}
