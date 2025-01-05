import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Main from '../components/Main';
import { Card, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const userDetail = JSON.parse(sessionStorage.getItem("loginDetails"));
      const userName = userDetail?.username;
      try {
        const response = await axios.post('http://192.168.29.79:8081/api/application/getprojectlist', { userName });
        
        if (response.data.successMsg === "Success") {
          setProjects(response.data.projects);
        } else if (response.data.successMsg === "login") {
          sessionStorage.removeItem("loginDetails");
          navigate("/login");
        } else {
          setError('Failed to fetch projects');
        }
      } catch (err) {
        setError('Error fetching projects');
        console.error(err);
      }
    };

    fetchProjects();
  }, [navigate]);

  return (
    <Main>
      <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>Projects</h1>
      {error && <Typography color="error">{error}</Typography>}
      
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.projectId}>
            <Card className="p-4 shadow-md rounded-lg">
              <Typography variant="h6" className="font-bold mb-3">
                {project.projectName}
              </Typography>
              <Typography variant="body2" color="textSecondary" className="mb-2">
                {project.projectDescription}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Total Time: {project.totalTime} hours
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Main>
  );
};

export default Projects;
