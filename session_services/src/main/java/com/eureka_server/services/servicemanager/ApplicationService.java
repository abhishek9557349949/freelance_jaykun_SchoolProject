package com.eureka_server.services.servicemanager;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eureka_server.services.model.AddProjectREsponse;
import com.eureka_server.services.model.AllProjectData;
import com.eureka_server.services.model.GetProjectDataREsponse;
import com.eureka_server.services.model.ProjectData;
import com.eureka_server.services.model.Projects;
import com.eureka_server.services.model.SessionService;
import com.eureka_server.services.model.TimeDescription;
import com.eureka_server.services.repo.ProjectsReopsitory;
import com.eureka_server.services.repo.SessionServiceRepository;
import com.eureka_server.services.repo.TimeDEscriptionRepository;

@Service
public class ApplicationService {
	private final SessionServiceRepository sessionServiceRepository;
	private final ProjectsReopsitory projectsReopsitory;
	private final TimeDEscriptionRepository timeDEscriptionRepository;

    public ApplicationService(TimeDEscriptionRepository timeDEscriptionRepository, SessionServiceRepository sessionServiceRepository, ProjectsReopsitory projectsReopsitory) {
		this.sessionServiceRepository = sessionServiceRepository;
		this.projectsReopsitory = projectsReopsitory;
		this.timeDEscriptionRepository = timeDEscriptionRepository;
    }

	public AddProjectREsponse addProject(AddProjectREsponse project) {
		SessionService sessionService = new SessionService();
		Projects projects = new Projects();
		try {
			long currentTimeMillis = System.currentTimeMillis();
	        Timestamp timestamp = new Timestamp(currentTimeMillis);
	        Calendar calendar = Calendar.getInstance();
	        calendar.setTime(timestamp);
	        calendar.add(Calendar.MINUTE, 10);
	        Timestamp expitationTimestamp = new Timestamp(calendar.getTimeInMillis());
			sessionService = sessionServiceRepository.findByUsername(project.getUserName());
			if(sessionService != null && "Y".equalsIgnoreCase(sessionService.isActive())) {
				sessionService.setLastActivityTime(timestamp);
				sessionService.setExpirationTime(expitationTimestamp);
				sessionServiceRepository.save(sessionService);
				
				projects.setProjectName(project.getProject().getProjectName());
				projects.setProjectDescription(project.getProject().getProjectDescription());
				projectsReopsitory.save(projects);
				project.setSuccessMsg("Success");
			}else {
				project.setSuccessMsg("login");;
			}
		} catch (Exception e) {
			project.setErrMsg("Db is not Responding");
		}
		return project;
	}

	public GetProjectDataREsponse getProjectData(AddProjectREsponse project) {
		GetProjectDataREsponse getProjectDataREsponse = new GetProjectDataREsponse();
		SessionService sessionService = new SessionService();
		AllProjectData allprojectData = new AllProjectData();
		ProjectData projectData = new ProjectData();
		try {
			long currentTimeMillis = System.currentTimeMillis();
	        Timestamp timestamp = new Timestamp(currentTimeMillis);
	        Calendar calendar = Calendar.getInstance();
	        calendar.setTime(timestamp);
	        calendar.add(Calendar.MINUTE, 10);
	        Timestamp expitationTimestamp = new Timestamp(calendar.getTimeInMillis());
			sessionService = sessionServiceRepository.findByUsername(project.getUserName());
			if(sessionService != null && "Y".equalsIgnoreCase(sessionService.isActive())) {
				sessionService.setLastActivityTime(timestamp);
				sessionService.setExpirationTime(expitationTimestamp);
				sessionServiceRepository.save(sessionService);
				List<TimeDescription> timeDescriptionList = timeDEscriptionRepository.findAll();
				List<Projects> projectlList = projectsReopsitory.findAll();
				List<String> name = new ArrayList<String>();
				List<Integer> time = new ArrayList<Integer>();
				for(Projects projectWiseData : projectlList) {
					name.add(projectWiseData.getProjectName());
					time.add(projectWiseData.getTotalTime());
				}
				projectData.setLabels(name);
				projectData.setData(time);
				allprojectData.setHours(projectData);
				projectData.setLabels(name);
				projectData.setData(time);
				allprojectData.setActivities(projectData);
				
				List<String> name2 = new ArrayList<String>();
				List<Integer> time2 = new ArrayList<Integer>();
				ProjectData projectData2 = new ProjectData();
				int i;
				for(i = 0; i < timeDescriptionList.size()/2; i++) {
					name2.add(timeDescriptionList.get(i).getDescription());
					time2.add(timeDescriptionList.get(i).getTotalTime());
				}
				projectData2.setLabels(name2);
				projectData2.setData(time2);
				allprojectData.setTimeBreakdown1(projectData2);
				ProjectData projectData3 = new ProjectData();
				List<String> name3 = new ArrayList<String>();
				List<Integer> time3 = new ArrayList<Integer>();
				for(; i < timeDescriptionList.size(); i++) {
					name3.add(timeDescriptionList.get(i).getDescription());
					time3.add(timeDescriptionList.get(i).getTotalTime());
				}
				projectData3.setLabels(name3);
				projectData3.setData(time3);
				allprojectData.setTimeBreakdown2(projectData3);
				
				getProjectDataREsponse.setAllProjectData(allprojectData);
				getProjectDataREsponse.setSuccessmsg("success");
			}else {
				getProjectDataREsponse.setSuccessmsg("login");;
			}
		} catch (Exception e) {
			getProjectDataREsponse.setErrmsg("Db is not Responding");
		}
		return getProjectDataREsponse;
	}
}
