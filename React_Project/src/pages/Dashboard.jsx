import React from "react";
import Main from "../components/Main";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Card, Typography } from "@mui/material";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const projectData = {
    hours: {
      labels: ["Project A", "Project B", "Project C", "Project D"],
      data: [24, 18, 32, 12],
    },
    activities: {
      labels: ["Project A", "Project B", "Project C", "Project D"],
      data: [15, 8, 20, 10],
    },
    timeBreakdown1: {
      labels: ["Planning", "Development", "Testing", "Deployment"],
      data: [10, 25, 15, 8],
    },
    timeBreakdown2: {
      labels: ["Meetings", "Coding", "Review", "Documentation"],
      data: [12, 28, 16, 10],
    },
  };

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
