import React, { useState, useEffect } from "react";
import Main from "../components/Main";
import "./Activities.css";
import { useNavigate } from "react-router-dom"; // For redirection

const Activities = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [challenges, setChallenges] = useState("");
  const [solution, setSolution] = useState("");

  useEffect(() => {
    // Fetch data from the API on component mount
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/application/getactivitylist",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userName: "john_doe" }),
          }
        );

        const data = await response.json();

        if (data.successMsg === "Success") {
          // Transform the response to match the state structure
          const updatedProjects = data.projectActivityList.reduce(
            (acc, activity) => {
              const existingProject = acc.find(
                (project) => project.projectName === activity.projectName
              );
              if (existingProject) {
                existingProject.activities.push({
                  title: activity.activityName,
                  description: activity.activityDescription,
                  challenges: activity.challengesFaced,
                  solution: activity.solution,
                });
              } else {
                acc.push({
                  projectName: activity.projectName,
                  activities: [
                    {
                      title: activity.activityName,
                      description: activity.activityDescription,
                      challenges: activity.challengesFaced,
                      solution: activity.solution,
                    },
                  ],
                });
              }
              return acc;
            },
            []
          );

          setProjects(updatedProjects);
        } else if (data.successMsg === "login") {
          navigate("/login"); // Redirect to login if required
        } else if (data.errorMsg) {
          alert(data.errorMsg); // Show error message
        }
      } catch (error) {
        alert("Error fetching activities. Please try again later.");
      }
    };

    fetchActivities();
  }, [navigate]);

  const addActivity = async () => {
    if (
      selectedProject &&
      activityName &&
      activityDescription &&
      challenges &&
      solution
    ) {
      const activityPayload = {
        userName: "john_doe",
        projectActivity: {
          projectName: selectedProject,
          activityName,
          activityDescription,
          challengesFaced: challenges,
          solution,
        },
      };

      try {
        const response = await fetch(
          "http://localhost:8081/api/application/addactivity",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(activityPayload),
          }
        );

        const data = await response.json();

        if (data.successMsg === "Success") {
          const updatedProjects = projects.map((project) => {
            if (project.projectName === selectedProject) {
              return {
                ...project,
                activities: [
                  ...project.activities,
                  {
                    title: activityName,
                    description: activityDescription,
                    challenges,
                    solution,
                  },
                ],
              };
            }
            return project;
          });

          setProjects(updatedProjects);
          setShowPopup(false);
          setActivityName("");
          setActivityDescription("");
          setChallenges("");
          setSolution("");
          setSelectedProject("");
          alert("Activity added successfully!");
        } else if (data.successMsg === "login") {
          navigate("/login"); // Redirect to login if required
        } else if (data.errorMsg) {
          alert(data.errorMsg); // Display error message
        }
      } catch (error) {
        alert("Error adding activity. Please try again later.");
      }
    } else {
      alert("Please fill out all fields before adding an activity.");
    }
  };

  const removeActivity = (projectName, activityIndex) => {
    const updatedProjects = projects.map((project) => {
      if (project.projectName === projectName) {
        const updatedActivities = project.activities.filter(
          (_, index) => index !== activityIndex
        );
        return {
          ...project,
          activities: updatedActivities,
        };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const closePopup = () => {
    setShowPopup(false);
    setActivityName("");
    setActivityDescription("");
    setChallenges("");
    setSolution("");
    setSelectedProject("");
  };

  return (
    <Main>
      <div className="activities-container">
        <div className="header">
          <h2>Projects</h2>
          <button
            className="add-activity-button"
            onClick={() => setShowPopup(true)}
          >
            + Add Activity
          </button>
        </div>

        <div className="projects-container">
          {projects.map((project, index) => (
            <div key={index} className="project-section">
              <h3>{project.projectName}</h3>
              <div className="activities-grid">
                {project.activities.map((activity, i) => (
                  <div key={i} className="activity-card">
                    <h4>Activity Name: {activity.title}</h4>
                    <p>Description: {activity.description}</p>
                    <p>
                      <strong>Challenges Faced:</strong> {activity.challenges}
                    </p>
                    <p>
                      <strong>Solution:</strong> {activity.solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <span className="close-btn" onClick={closePopup}>
              &times;
            </span>
            <h3>Add Activity</h3>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">Select Project</option>
              {projects.map((project, index) => (
                <option key={index} value={project.projectName}>
                  {project.projectName}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Activity Name"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
            />
            <textarea
              placeholder="Activity Description"
              value={activityDescription}
              onChange={(e) => setActivityDescription(e.target.value)}
            ></textarea>
            <textarea
              placeholder="Challenges Faced"
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
            ></textarea>
            <textarea
              placeholder="Solution"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            ></textarea>
            <div className="popup-buttons">
              <button className="add-button" onClick={addActivity}>
                Add
              </button>
              <button className="cancel-button" onClick={closePopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Main>
  );
};

export default Activities;
