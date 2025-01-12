package com.eureka_server.services.model;

import java.util.List;

public class AddActivityResponse {
	
	private String successMsg;
	private String errorMsg;
	private List<ProjectActivity> projectActivityList;
	private String username;
	
	
	public String getSuccessMsg() {
		return successMsg;
	}
	public void setSuccessMsg(String successMsg) {
		this.successMsg = successMsg;
	}
	public String getErrorMsg() {
		return errorMsg;
	}
	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public List<ProjectActivity> getProjectActivityList() {
		return projectActivityList;
	}
	public void setProjectActivityList(List<ProjectActivity> projectActivityList) {
		this.projectActivityList = projectActivityList;
	}
	
	
}
