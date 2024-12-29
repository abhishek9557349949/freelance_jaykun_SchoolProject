package com.erueka_server.services.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public class SessionServiceRepo extends JpaRepository<SessionService, UUID> {
    Optional<SessionService> findBySessionId(UUID sessionId);
    Optional<SessionService> findByUsernameAndIsActive(String username, boolean isActive);
}