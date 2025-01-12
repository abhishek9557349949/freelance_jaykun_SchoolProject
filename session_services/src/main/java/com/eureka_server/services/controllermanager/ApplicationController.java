package com.eureka_server.services.controllermanager;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eureka_server.services.model.AddActivityRequest;
import com.eureka_server.services.model.AddActivityResponse;
import com.eureka_server.services.model.AddProjectREsponse;
import com.eureka_server.services.model.GetProjectDataREsponse;
import com.eureka_server.services.model.ProjectListResponse;
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
	
	@PostMapping("/getprojectlist")
	public ProjectListResponse getProjectList(@RequestBody AddProjectREsponse project) {
		ProjectListResponse addProjectREsponse = new ProjectListResponse();
		addProjectREsponse = applicationService.getProjectList(project);
		return addProjectREsponse;
	}
	
	@PostMapping("/getactivitylist")
	public AddActivityResponse getActivityList(@RequestBody AddActivityRequest project) {
		AddActivityResponse addActivityResponse = new AddActivityResponse();
		addActivityResponse = applicationService.getActivityList(project);
		return addActivityResponse;
	}
	
	@PostMapping("/addactivity")
	public AddActivityResponse addActivity(@RequestBody AddActivityRequest project) {
		AddActivityResponse addActivityResponse = new AddActivityResponse();
		addActivityResponse = applicationService.addActivity(project);
		return addActivityResponse;
	}
}
