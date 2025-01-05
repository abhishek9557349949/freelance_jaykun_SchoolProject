import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Dashboard, Folder, FolderCopyTwoTone, Logout, LocalActivityTwoTone } from "@mui/icons-material";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Add Project", icon: <Folder />, path: "/addproject" },
    { text: "Projects", icon: <FolderCopyTwoTone />, path: "/project" },
    { text: "Activities", icon: <LocalActivityTwoTone />, path: "/activities" },
    { text: "Logout", icon: <Logout />, path: "/logout" },
  ];

  const handleLogout = async () => {
    try {
      // Retrieve the username from session storage
      const userDetails = JSON.parse(sessionStorage.getItem("loginDetails"));
      const username = userDetails?.username;

      if (username) {
        // Make the API request to logout
        const response = await axios.post("http://localhost:8081/api/logout", {
          username,
        });

        // Check if logout was successful
        if (response.status === 200) {
          // Clear session storage
          sessionStorage.removeItem("loginDetails");

          // Redirect to the login page
          navigate("/login");
        } else {
          alert("Logout failed. Please try again.");
        }
      } else {
        alert("No user is logged in.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };

  return (
    <aside className="bg-teal-800 text-white w-60 h-screen fixed flex flex-col shadow-md">
      <nav className="flex flex-col gap-2 px-4 pt-4">
        {menuItems.map((item, index) =>
          item.text === "Logout" ? (
            <button
              key={index}
              className="flex items-center gap-4 text-sm px-3 py-2 rounded-md hover:bg-teal-700 transition cursor-pointer"
              onClick={handleLogout}
            >
              <span>{item.icon}</span>
              {item.text}
            </button>
          ) : (
            <NavLink
              key={index}
              to={item.path}
              className="flex items-center gap-4 text-sm px-3 py-2 rounded-md hover:bg-teal-700 transition"
            >
              <span>{item.icon}</span>
              {item.text}
            </NavLink>
          )
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
