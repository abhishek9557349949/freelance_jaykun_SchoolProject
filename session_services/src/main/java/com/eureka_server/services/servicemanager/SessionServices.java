package com.eureka_server.services.servicemanager;


import org.springframework.stereotype.Service;

import com.eureka_server.services.model.LoginResponse;
import com.eureka_server.services.model.SessionService;
import com.eureka_server.services.model.UserDetails;
import com.eureka_server.services.repo.SessionServiceRepository;
import com.eureka_server.services.repo.UserDetailsRepository;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;

@Service
public class SessionServices {
	private final UserDetailsRepository userDetailsRepository;
	private final SessionServiceRepository sessionServiceRepository;

    public SessionServices(UserDetailsRepository userDetailsRepository, SessionServiceRepository sessionServiceRepository) {
        this.userDetailsRepository = userDetailsRepository;
		this.sessionServiceRepository = sessionServiceRepository;
    }

    public List<UserDetails> getAllUserDetails() {
        return userDetailsRepository.findAll();
    }

	public LoginResponse loginAttempt(String id, String pass, LoginResponse response) {
		SessionService sessionService = new SessionService();
		UserDetails userDetails = new UserDetails();
		try {
			long currentTimeMillis = System.currentTimeMillis();
	        Timestamp timestamp = new Timestamp(currentTimeMillis);
	        Calendar calendar = Calendar.getInstance();
	        calendar.setTime(timestamp);
	        calendar.add(Calendar.MINUTE, 10);
	        Timestamp expitationTimestamp = new Timestamp(calendar.getTimeInMillis());
			sessionService = sessionServiceRepository.findByUsernameAndPassword(id, pass);
			if(sessionService != null) {
				sessionService.setUserId(UUID.randomUUID());
				sessionService.setLoginTime(timestamp);
				sessionService.setLastActivityTime(timestamp);
				sessionService.setExpirationTime(expitationTimestamp);
				sessionService.setActive("Y");
				sessionServiceRepository.save(sessionService);
				response.setResponseMsg("Success");
				userDetails = userDetailsRepository.findByUsername(id);
				response.setUserDetails(userDetails);
				response.setUserName(id);
				response.setPassword(userDetails.getPasswordHashcode());
			}else {
				response.setResponseMsg("Incorrect Username or Password");
			}
		} catch (Exception e) {
			response.setErrorMsg("Db is not Responding");
		}
		return response;
	}

	public LoginResponse logoutAttempt(String id, LoginResponse response) {
		SessionService sessionService = new SessionService();
		UserDetails userDetails = new UserDetails();
		try {
			long currentTimeMillis = System.currentTimeMillis();
	        Timestamp timestamp = new Timestamp(currentTimeMillis);
			sessionService = sessionServiceRepository.findByUsername(id);
			if(sessionService != null) {
				sessionService.setLastActivityTime(timestamp);
				sessionService.setExpirationTime(timestamp);
				sessionService.setActive("N");
				sessionServiceRepository.save(sessionService);
				response.setResponseMsg("Success");
				userDetails = userDetailsRepository.findByUsername(id);
				response.setUserDetails(userDetails);
				response.setUserName(id);
				response.setPassword(userDetails.getPasswordHashcode());
			}else {
				response.setResponseMsg("Incorrect Username or Password");
			}
		} catch (Exception e) {
			response.setErrorMsg("Db is not Responding");
		}
		return response;
	}

	public void autoLogout() {
		Timestamp currentTime = Timestamp.from(Instant.now());
        List<SessionService> expiredSessions = sessionServiceRepository.findExpiredSessions(currentTime);

        for (SessionService session : expiredSessions) {
        	session.setLastActivityTime(currentTime);
        	session.setExpirationTime(currentTime);
            session.setActive("N");
            sessionServiceRepository.save(session);
            System.out.println("Logged out session: " + session.getSessionId());
        }
		
	}
}
