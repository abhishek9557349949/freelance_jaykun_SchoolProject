import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../styles/login_signup.css";
import Login from "./Login";
import Signup from "./Signup";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-signup-container">
      {/* Full Background */}
      <div className="background-image"></div>

      {/* White Area for Forms */}
      <motion.div
        className={`form-container`}
        animate={{ x: isLogin ? 0 : "100%" }}
        transition={{ duration: 0.8 }}
      >
        {/* Form Content */}
        <div className="form-content">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Login toggleForm={toggleForm} />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Signup toggleForm={toggleForm} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginSignup;
