package com.eureka_server.services.model;

public class AddActivityRequest {

	private String userName;
	private ProjectActivity projectActivity;
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public ProjectActivity getProjectActivity() {
		return projectActivity;
	}
	public void setProjectActivity(ProjectActivity projectActivity) {
		this.projectActivity = projectActivity;
	}
	
	
}
