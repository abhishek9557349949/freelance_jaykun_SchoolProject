import React, { useState, useEffect } from 'react';
import Main from '../components/Main';
import './Activities.css';

const Activities = () => {
  const storedProjects = localStorage.getItem('projects');
  const initialProjects = storedProjects
    ? JSON.parse(storedProjects)
    : [
        { projectName: 'Web Development', activities: [] },
        { projectName: 'Mobile App', activities: [] },
        { projectName: 'Data Science Project', activities: [] },
        { projectName: 'DevOps Pipeline', activities: [] },
      ];

  const [projects, setProjects] = useState(initialProjects);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [activityName, setActivityName] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [challenges, setChallenges] = useState('');
  const [solution, setSolution] = useState('');

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addActivity = () => {
    if (selectedProject && activityName && activityDescription && challenges && solution) {
      const updatedProjects = projects.map((project) => {
        if (project.projectName === selectedProject) {
          return {
            ...project,
            activities: [
              ...project.activities,
              {
                title: activityName,
                description: activityDescription,
                challenges: challenges,
                solution: solution,
              },
            ],
          };
        }
        return project;
      });
      setProjects(updatedProjects);
      setShowPopup(false);
      setActivityName('');
      setActivityDescription('');
      setChallenges('');
      setSolution('');
      setSelectedProject('');
    }
  };

  const removeActivity = (projectName, activityIndex) => {
    const updatedProjects = projects.map((project) => {
      if (project.projectName === projectName) {
        const updatedActivities = project.activities.filter((_, index) => index !== activityIndex);
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
    setActivityName('');
    setActivityDescription('');
    setChallenges('');
    setSolution('');
    setSelectedProject('');
  };

  return (
    <Main>
      <div className="activities-container">
        <div className="header">
          <h2>Projects</h2>
          <button className="add-activity-button" onClick={() => setShowPopup(true)}>
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
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <p><strong>Challenges Faced:</strong> {activity.challenges}</p>
                    <p><strong>Solution:</strong> {activity.solution}</p>
                    <button
                      className="remove-activity-button"
                      onClick={() => removeActivity(project.projectName, i)}
                    >
                      Remove Activity
                    </button>
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
            <span className="close-btn" onClick={closePopup}>&times;</span>
            <h3>Add Activity</h3>
            <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
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
              <button className="add-button" onClick={addActivity}>Add</button>
              <button className="cancel-button" onClick={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </Main>
  );
};

export default Activities;
