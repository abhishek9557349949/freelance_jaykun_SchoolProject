import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Button } from "@mui/material";
import { loginValidationSchema } from "../../validation";
import CustomInput from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { LoginApis } from "../../services/api/auth";

const Login = ({ toggleForm }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    console.log("Form submitted:", values);
    navigate("/dashboard");
    try {
      const { data } = await LoginApis.loginUser(values);
      if (data) {
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-teal-700 mb-2">Welcome Back</h1>
      <p className="text-gray-600 mb-6">Please login to your account</p>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        <Form>
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded">
              <span className="text-red-500 font-bold">{error}</span>
            </div>
          )}
          <CustomInput
            name="email"
            label="Enter Mail"
            type="email"
            placeholder="Enter Mail"
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
