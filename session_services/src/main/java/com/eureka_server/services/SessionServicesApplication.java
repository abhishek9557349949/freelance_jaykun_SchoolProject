package com.eureka_server.services;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class SessionServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(SessionServicesApplication.class, args);
	}

}