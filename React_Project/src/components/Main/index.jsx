import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../../styles/Main.css";

const Main = ({ children }) => {
  return (
    <div className="main-layout">
      {/* Fixed Header */}
      <Header />

      <div className="layout-container">
        {/* Sidebar */}
        <Sidebar />
        {/* Content Area */}
        <main className="content-wrapper">{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Main;
