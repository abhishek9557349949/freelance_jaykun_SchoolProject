package com.eureka_server.services.controllermanager;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eureka_server.services.model.AddProjectREsponse;
import com.eureka_server.services.model.GetProjectDataREsponse;
import com.eureka_server.services.servicemanager.ApplicationService;

@RestController
@RequestMapping("/api/application")
public class ApplicationController {
	
	private final ApplicationService applicationService;
	
	public ApplicationController(ApplicationService applicationService) {
		this.applicationService = applicationService;
	}
	
	@PostMapping("/addproject")
	public AddProjectREsponse addProject(@RequestBody AddProjectREsponse project) {
		AddProjectREsponse addProjectREsponse = new AddProjectREsponse();
		addProjectREsponse = applicationService.addProject(project);
		return addProjectREsponse;
	}
	
	@PostMapping("/getprojectdata")
	public GetProjectDataREsponse getProjectData(@RequestBody AddProjectREsponse project) {
		GetProjectDataREsponse getProjectDataREsponse = new GetProjectDataREsponse();
		getProjectDataREsponse = applicationService.getProjectData(project);
		return getProjectDataREsponse;
	}
}
