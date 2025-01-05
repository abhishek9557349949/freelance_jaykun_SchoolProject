import React, { useState, useEffect } from "react";
import Main from "../components/Main";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [projectData, setProjectData] = useState({
    hours: { labels: [], data: [] },
    activities: { labels: [], data: [] },
    timeBreakdown1: { labels: [], data: [] },
    timeBreakdown2: { labels: [], data: [] },
  });
  const navigate = useNavigate();

  const chartConfig = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Hours",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  const createChartData = (labels, data) => ({
    labels,
    datasets: [
      {
        data,
        backgroundColor: "#008080",
        borderColor: "#004d4d",
        borderWidth: 1,
        hoverBackgroundColor: "#00b3b3",
      },
    ],
  });

  useEffect(() => {
    const fetchProjectData = async () => {
      const userDetail = JSON.parse(sessionStorage.getItem("loginDetails"));
      const userName = userDetail?.username;

      if (!userDetail) {
        sessionStorage.removeItem("loginDetails");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.post("http://localhost:8081/api/application/getprojectdata", {
          userName,
        });

        console.log("API Response:", response.data); // Log the API response

        const data = response.data;

        if (data.successmsg === "login") {
          sessionStorage.removeItem("loginDetails");
          navigate("/login");
        } else {
          setProjectData(data.allProjectData); // Set the project data
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();
  }, [navigate]);

  return (
    <Main>
      <div className="bg-gray-100 p-5 min-h-screen">
        {/* Overview Section */}
        <div className="mb-8">
          <h5 className="text-xl font-bold text-teal-700 mb-4">All Projects Overview</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Project Hours Chart */}
            <Card className="p-4 shadow-md rounded-lg">
              <Typography variant="h6" className="font-bold mb-3">
                Project Hours
              </Typography>
              <div className="relative h-72 w-full">
                <Bar
                  data={createChartData(projectData.hours.labels, projectData.hours.data)}
                  options={chartConfig}
                />
              </div>
            </Card>

            {/* Project Activities Chart */}
            <Card className="p-4 shadow-md rounded-lg">
              <Typography variant="h6" className="font-bold mb-3">
                Project Activities
              </Typography>
              <div className="relative h-72 w-full">
                <Bar
                  data={createChartData(projectData.activities.labels, projectData.activities.data)}
                  options={chartConfig}
                />
              </div>
            </Card>
          </div>
        </div>

        {/* Individual Project Details */}
        <div>
          <h5 className="text-xl font-bold text-teal-700 mb-4">Individual Project Details</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Project A - Time Breakdown */}
            <Card className="p-4 shadow-md rounded-lg">
              <Typography variant="h6" className="font-bold mb-3">
                Project A - Time Breakdown
              </Typography>
              <div className="relative h-72 w-full">
                <Bar
                  data={createChartData(projectData.timeBreakdown1.labels, projectData.timeBreakdown1.data)}
                  options={chartConfig}
                />
              </div>
            </Card>

            {/* Project B - Time Breakdown */}
            <Card className="p-4 shadow-md rounded-lg">
              <Typography variant="h6" className="font-bold mb-3">
                Project B - Time Breakdown
              </Typography>
              <div className="relative h-72 w-full">
                <Bar
                  data={createChartData(projectData.timeBreakdown2.labels, projectData.timeBreakdown2.data)}
                  options={chartConfig}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Dashboard;
