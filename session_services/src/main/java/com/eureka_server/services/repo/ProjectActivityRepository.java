package com.eureka_server.services.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eureka_server.services.model.ProjectActivity;

public interface ProjectActivityRepository extends JpaRepository<ProjectActivity, Integer>{

}
