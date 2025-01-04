package com.erueka_server.services.repo;

import com.eureka_server.services.model.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepository extends JpaRepository<UserDetails, Integer> {
	
}
