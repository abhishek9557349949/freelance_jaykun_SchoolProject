import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Button } from "@mui/material";
import CustomInput from "../../components/CustomInput";
import { signupValidationSchema } from "../../validation";
import { useNavigate } from "react-router-dom";
import CustomRadioGroup from "../../components/CustomRadioGroup";
import { LoginApis } from "../../services/api/auth";

const Signup = ({ toggleForm }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (values) => {
    console.log("Signed up successfully!", values);
    try {
      const { data } = LoginApis.registerUser(values);
      if (data) {
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.response.data.message);
    }
    // navigate("/login");
  };

  return (
    <div className="signup-form">
      <h1 className="form-title">Create Account</h1>
      <p className="form-subtitle">Please register to continue</p>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          gender: "",
          password: "",
          confirmPassword: "", // Added for re-enter password
        }}
        validationSchema={signupValidationSchema}
        onSubmit={handleSignup}
      >
        {({ values, handleChange }) => (
          <Form>
            {/* First Name and Last Name */}
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded">
                <span className="text-red-500 font-bold">{error}</span>
              </div>
            )}
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

      <p className="form-footer">Already have an account? </p>
      <button className="toggle-btn" onClick={toggleForm}>
        ← Login
      </button>
    </div>
  );
};

export default Signup;
