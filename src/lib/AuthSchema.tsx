import * as yup from "yup";

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .min(2, "Full name must be at least 2 characters")
    .required("Required"),
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Invalid email format"
    )
    .required("Required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Required"),
  terms: yup
  .boolean()
  .oneOf([true], "You must accept the terms") // Ensures true value
  .required("You must accept the terms") 
});



export const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Required'),
  userType: yup.string().oneOf(['creator', 'brand']).required()
});