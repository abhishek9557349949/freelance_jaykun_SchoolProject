import React from "react";
import OTHLogo from "../../assets/logo/OTH_LOGO.jpg";

const Header = () => {
  // Retrieve user details from session storage
  const userDetails = JSON.parse(sessionStorage.getItem("loginDetails"));

  return (
    <header className="sticky top-0 z-10 flex items-center bg-teal-700 text-white py-3 px-6 shadow-md">
      {/* Left: University Logo */}
      <div className="flex items-center">
        <img
          src={OTHLogo}
          alt="University Logo"
          style={{ height: "50px", width: "50px", borderRadius: "25%" }}
        />
      </div>

      {/* Center: Application Title */}
      <div className="flex-1 text-center text-lg font-bold">Project Diary</div>

      {/* Right: User Profile Icon */}
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
          <span className="text-teal-700 font-bold">
          {userDetails
          ? `${userDetails.firstName.charAt(0).toUpperCase()}`
          : "A"}
          {userDetails
          ? `${userDetails.lastName.charAt(0).toUpperCase()}`
          : "A"}</span>
        </div>
      </div>

      {/* Welcome Message */}
      <p className="ml-4">
        {userDetails
          ? `Welcome, ${userDetails.firstName} ${userDetails.lastName}`
          : "Welcome, Guest"}
      </p>
    </header>
  );
};

export default Header;
