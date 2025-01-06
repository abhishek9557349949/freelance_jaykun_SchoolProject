import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Button } from "@mui/material";
import CustomInput from "../../components/CustomInput";
import { signupValidationSchema } from "../../validation";
import { useNavigate } from "react-router-dom";
import CustomRadioGroup from "../../components/CustomRadioGroup";
import axios from "axios"; // Axios for API calls

const Signup = ({ toggleForm }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (values) => {
    try {
      const response = await axios.post("http://localhost:8081/api/signup", {
        username: values.username,
        firstName: values.firstName,
        lastName: values.lastName,
        middleName: null, // Optional field
        phoneNumber: values.mobile,
        email: values.email,
        passwordHashcode: values.password, // Assuming the backend hashes the password
        role: "ADMIN", // Default role (customize as needed)
      });

      const { successMsg, errorMsg } = response.data;

      if (successMsg) {
        alert(successMsg); // Display success message
        navigate("/login"); // Redirect to login page
      } else if (errorMsg) {
        setError(errorMsg);
        alert(errorMsg); // Display error message
      }
    } catch (err) {
      const errorMsg = err.response?.data?.errorMsg || "Something went wrong!";
      setError(errorMsg);
      alert(errorMsg); // Show error in an alert box
    }
  };

  return (
    <div className="signup-form">
      <h1 className="form-title">Create Account</h1>
      <p className="form-subtitle">Please register to continue</p>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          mobile: "",
          gender: "",
          password: "",
          confirmPassword: "", // Re-enter password field
        }}
        validationSchema={signupValidationSchema}
        onSubmit={handleSignup}
      >
        {({ values, handleChange }) => (
          <Form>
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded">
                <span className="text-red-500 font-bold">{error}</span>
              </div>
            )}

            {/* First Name and Last Name */}
            <div className="flex gap-4">
              <CustomInput
                name="firstName"
                label="First Name"
                placeholder="Enter First Name"
              />
              <CustomInput
                name="lastName"
                label="Last Name"
                placeholder="Enter Last Name"
              />
            </div>

            {/* Username */}
            <CustomInput
              name="username"
              label="User ID"
              type="text"
              placeholder="Enter User ID"
            />

            {/* Email */}
            <CustomInput
              name="email"
              label="Email"
              type="email"
              placeholder="Enter Email"
            />

            {/* Mobile */}
            <CustomInput
              name="mobile"
              label="Mobile Number"
              type="tel"
              placeholder="Enter Mobile Number"
            />

            {/* Gender */}
            <CustomRadioGroup
              name="gender"
              label="Gender"
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Other", value: "Other" },
              ]}
              value={values.gender}
              onChange={handleChange("gender")}
            />

            {/* Password */}
            <CustomInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter Password"
              toggleVisibility
            />

            {/* Re-enter Password */}
            <CustomInput
              name="confirmPassword"
              label="Re-enter Password"
              type="password"
              placeholder="Re-enter Password"
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
              Register
            </Button>
          </Form>
        )}
      </Formik>

      <p className="form-footer">Already have an account?</p>
      <button className="toggle-btn" onClick={toggleForm}>
        ← Login
      </button>
    </div>
  );
};

export default Signup;
