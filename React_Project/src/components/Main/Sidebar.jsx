import React from "react";
import { NavLink } from "react-router-dom";
import { Dashboard, Folder, FolderCopyTwoTone, Logout, LocalActivityTwoTone } from "@mui/icons-material";

const Sidebar = () => {
  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Add Project", icon: <Folder />, path: "/addproject" },
    { text: "Projects", icon: <FolderCopyTwoTone />, path: "/project" },
    { text: "Activities", icon: <LocalActivityTwoTone />, path: "/activities" },
    { text: "Logout", icon: <Logout />, path: "/logout" },
  ];

  return (
    <aside className="bg-teal-800 text-white w-60 h-screen fixed flex flex-col shadow-md">
      {/* <div className="p-6 text-lg font-bold">Sidebar Menu</div> */}
      <nav className="flex flex-col gap-2 px-4 pt-4">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className="flex items-center gap-4 text-sm px-3 py-2 rounded-md hover:bg-teal-700 transition"
          >
            <span>{item.icon}</span>
            {item.text}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
