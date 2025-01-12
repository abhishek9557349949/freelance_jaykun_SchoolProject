package com.eureka_server.services.model;


import jakarta.persistence.*;

@Entity
@Table(name = "project_activity")
public class ProjectActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_name", nullable = false)
    private String projectName;

    @Column(name = "activity_name", nullable = false)
    private String activityName;

    @Column(name = "activity_description")
    private String activityDescription;

    @Column(name = "challenges_faced")
    private String challengesFaced;

    @Column(name = "solution")
    private String solution;

    // Constructors
    public ProjectActivity() {
    }

    public ProjectActivity(String projectName, String activityName, String activityDescription, String challengesFaced, String solution) {
        this.projectName = projectName;
        this.activityName = activityName;
        this.activityDescription = activityDescription;
        this.challengesFaced = challengesFaced;
        this.solution = solution;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public String getActivityDescription() {
        return activityDescription;
    }

    public void setActivityDescription(String activityDescription) {
        this.activityDescription = activityDescription;
    }

    public String getChallengesFaced() {
        return challengesFaced;
    }

    public void setChallengesFaced(String challengesFaced) {
        this.challengesFaced = challengesFaced;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

}

