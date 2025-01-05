import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Main from "../components/Main";
import CustomInput from "../components/CustomInput";
import CustomRadioGroup from "../components/CustomRadioGroup";
import CustomSelect from "../components/CustomSelect";
import { FormLabel } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
  const [assignedMembers, setAssignedMembers] = useState([]);
  const navigate = useNavigate();
  const categories = [
    { value: "web-development", label: "Web Development" },
    { value: "mobile-development", label: "Mobile Development" },
    { value: "data-science", label: "Data Science" },
  ];

  const members = [
    {
      value: 1,
      label: "John Doe",
      email: "john.doe@example.com",
      role: "Frontend Developer",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      value: 2,
      label: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Backend Developer",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      value: 3,
      label: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "UI/UX Designer",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      value: 4,
      label: "Bob Brown",
      email: "bob.brown@example.com",
      role: "Project Manager",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      value: 5,
      label: "Charlie Green",
      email: "charlie.green@example.com",
      role: "DevOps Engineer",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      value: 6,
      label: "Diana Prince",
      email: "diana.prince@example.com",
      role: "Quality Analyst",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      value: 7,
      label: "Ethan Hunt",
      email: "ethan.hunt@example.com",
      role: "Security Specialist",
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      value: 8,
      label: "Fiona Clarke",
      email: "fiona.clarke@example.com",
      role: "Data Scientist",
      avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      value: 9,
      label: "George White",
      email: "george.white@example.com",
      role: "Business Analyst",
      avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
      value: 10,
      label: "Hannah Lee",
      email: "hannah.lee@example.com",
      role: "Full Stack Developer",
      avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    },
  ];

  const initialValues = {
    projectName: "",
    projectDescription: ""
  };

  const validationSchema = Yup.object({
    projectName: Yup.string().required("Project Name is required"),
    projectDescription: Yup.string().required(
      "Project Description is required"
    ),
    category: Yup.string().required("Category is required"),

    deadline: Yup.date().required("Deadline is required"),
    priority: Yup.string().required("Priority is required"),
    members: Yup.array().min(1, "At least one member is required"),
  });

  const handleAddMember = (values, setFieldValue) => {
    try {
      if (values !== null && values !== undefined && values !== "") {
        if (assignedMembers.map((m) => m.value).includes(values)) {
          console.log("Member already assigned");
          setFieldValue("selectedMember", "");
          return;
        }
        setAssignedMembers((assignedMembers) =>
          [...assignedMembers, members.find((m) => m.value === values)].filter(
            (m) => m.value !== undefined && m.value !== null
          )
        );
        setFieldValue(
          "members",
          assignedMembers.filter(
            (m) => m.value !== undefined && m.value !== null
          )
        );
        setFieldValue("selectedMember", "");
      } else {
        console.log("No member selected");
        setFieldValue("selectedMember", "");
      }
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const handleRemoveMember = (member) => {
    setAssignedMembers((prev) => prev.filter((m) => m !== member));
  };

  const handleSubmit = async (values) => {
    const userDetail = JSON.parse(sessionStorage.getItem("loginDetails"));
    const userName = userDetail?.username;

    const requestData = {
      project: {
        projectName: values.projectName,
        projectDescription: values.projectDescription,
      },
      userName: userName, // Include userName in the request body
    };

    try {
      const response = await fetch("http://localhost/api/application/addproject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData), // Send the request in the exact format
      });

      const result = await response.json();

      // Check for success or error message in the response
      if (result.successMsg === "Success") {
        // Success scenario
        alert("Project Added Successfully"); // You can show this message in any way you prefer
      } else if (result.errMsg) {
        // Error scenario
        alert(result.errMsg); // You can show this message in any way you prefer
      } else if (result.successMsg === "login") {
        sessionStorage.removeItem("loginDetails");
        navigate("/login");
        return;
      } 
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Main>
      <div className="p-8 h-full">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">
          Add a New Project
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, errors, setFieldValue }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <CustomInput label="Project Name" name="projectName" />
                <CustomInput
                  label="Project Description"
                  name="projectDescription"
                  multiline
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <CustomInput label="Client Name" name="clientName" />
                <CustomInput label="Skills" name="skills" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <CustomSelect
                  label="Select Category"
                  name="category"
                  options={categories}
                />
                <CustomInput label="Deadline" name="deadline" type="date" />
              </div>

              <div>
                <CustomRadioGroup
                  label="Priority"
                  name="priority"
                  onChange={(e) => setFieldValue("priority", e.target.value)}
                  options={[  
                    { label: "Platinum", value: "platinum" },
                    { label: "Gold", value: "gold" },
                    { label: "Silver", value: "silver" },
                    { label: "Bronze", value: "bronze" },
                  ]}
                />
              </div>
              <FormLabel component="legend" className={`text-gray-600 mb-2`}>
                {"Assign Members"}
              </FormLabel>
              <div className="flex flex-wrap gap-4 items-center">
                {/* Left Section: Dropdown */}
                <div
                  className="grid grid-cols-10 items-center justify-between border border-gray-300 rounded-md p-4"
                  style={{
                    flexBasis: "clamp(300px, 40%, calc(40% - 16px))",
                    minHeight: "150px",
                  }}
                >
                  <CustomSelect
                    label="Select Members"
                    name="selectedMember"
                    options={members}
                    className="mr-2 col-span-7"
                  />
                  <button
                    type="button"
                    className="bg-teal-700 text-white px-4 py-2 rounded-md col-span-3"
                    onClick={() =>
                      handleAddMember(values.selectedMember, setFieldValue)
                    }
                  >
                    Add Member
                  </button>
                </div>

                {/* Right Section: Member Cards */}
                <div
                  className="flex-2 flex-grow grid grid-cols-3 gap-4 border border-gray-300 rounded-md p-4 items-center"
                  style={{
                    minHeight: "150px",
                  }}
                >
                  {assignedMembers.length === 0 ? (
                    <div className="text-gray-500 col-span-3 text-center">
                      No members selected
                    </div>
                  ) : (
                    assignedMembers.map((member, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 rounded-md p-2 flex items-center justify-between"
                      >
                        <span className="capitalize">{member.label}</span>
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => handleRemoveMember(member)}
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-teal-700 text-white rounded-md"
                >
                  Add Project
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Main>
  );
};

export default AddProject;
