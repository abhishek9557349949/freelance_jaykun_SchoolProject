package com.eureka_server.services.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eureka_server.services.model.Projects;

public interface ProjectsReopsitory  extends JpaRepository<Projects, Integer>{

}
