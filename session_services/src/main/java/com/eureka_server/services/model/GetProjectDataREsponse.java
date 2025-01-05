package com.eureka_server.services.model;

public class GetProjectDataREsponse {

	private String successmsg;
	private String errmsg;
	private AllProjectData allProjectData;
	
	public String getSuccessmsg() {
		return successmsg;
	}
	public void setSuccessmsg(String successmsg) {
		this.successmsg = successmsg;
	}
	public String getErrmsg() {
		return errmsg;
	}
	public void setErrmsg(String errmsg) {
		this.errmsg = errmsg;
	}
	public AllProjectData getAllProjectData() {
		return allProjectData;
	}
	public void setAllProjectData(AllProjectData allProjectData) {
		this.allProjectData = allProjectData;
	}
	
	
	
}
