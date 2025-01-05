import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const signupValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string()
    // .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  gender: Yup.string().required("Please select a gender"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please re-enter your password"),
});

export const projectValidationSchema = Yup.object().shape({
  projectName: Yup.string().required("Project name is required"),
  projectDescription: Yup.string().required("Project description is required"),
  category: Yup.string().required("Category is required"),
  skills: Yup.string().required("Skills are required"),
  deadline: Yup.string().required("Deadline is required"),
  clientName: Yup.string().required("Client name is required"),
  activities: Yup.array().of(Yup.string().required("Activity cannot be empty")),
});
