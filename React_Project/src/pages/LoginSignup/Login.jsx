import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Button } from "@mui/material";
import CustomInput from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ toggleForm }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if userDetails are already in session storage on component mount
  useEffect(() => {
    const userDetails = sessionStorage.getItem("loginDetails");
    if (userDetails && userDetails != null) {
      navigate("/dashboard"); // Redirect to dashboard if userDetails are found
    }else{
      navigate("/login");
    }
  }, [navigate]);

  const handleLogin = async (values) => {
    console.log("Form submitted:", values);
    try {
      const response = await axios.post("http://localhost:8081/api/login", values);
      const data = response.data;

      if (data && data.responseMsg === "Success") {
        if (data.userDetails) {
          sessionStorage.setItem("loginDetails", JSON.stringify(data.userDetails));
          navigate("/dashboard");
        }
      } else if (data.errorMsg) {
        alert(data.errorMsg);
        setError(data.errorMsg);
      } else {
        setError(data.responseMsg);
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      alert(errorMessage); // Display error message in alert box
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-teal-700 mb-2">Welcome Back</h1>
      <p className="text-gray-600 mb-6">Please login to your account</p>

      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={handleLogin}
      >
        <Form>
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded">
              <span className="text-red-500 font-bold">{error}</span>
            </div>
          )}
          <CustomInput
            name="username"
            label="Enter UserId"
            type="text"
            placeholder="Enter User Id"
          />
          <CustomInput
            name="password"
            label="Enter Password"
            type="password"
            placeholder="Enter Password"
            toggleVisibility
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            type="submit"
            sx={{
              borderRadius: "8px",
              fontWeight: "bold",
              textTransform: "none",
              marginTop: "20px",
            }}
          >
            Login
          </Button>
        </Form>
      </Formik>

      <p className="text-sm mt-4">Don't have an account? </p>
      <button
        className="text-teal-700 font-bold cursor-pointer"
        onClick={toggleForm}
      >
        Register →
      </button>
    </div>
  );
};

export default Login;
