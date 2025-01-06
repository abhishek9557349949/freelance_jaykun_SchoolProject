package com.eureka_server.services.repo;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.eureka_server.services.model.SessionService;

import jakarta.persistence.LockModeType;
import jakarta.transaction.Transactional;

public interface SessionServiceRepository extends JpaRepository<SessionService, Integer> {
	
	public SessionService findByUsernameAndPassword(String username,String password);
	
	public SessionService findByUsername(String username);

	@Query("SELECT s FROM SessionService s WHERE s.expirationTime < :currentTime AND s.isActive = 'Y'")
    List<SessionService> findExpiredSessions(Timestamp currentTime);
}

