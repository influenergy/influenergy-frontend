import * as yup from "yup";

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed")
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
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one number, and one special character"
    )
    .required("Required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms")
    .required("You must accept the terms"),
});

export const brandRegisterSchema = yup.object({
  fullName: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed")
    .min(2, "Full name must be at least 2 characters")
    .required("Required"),
  // companyEmail: yup
  //   .string()
  //   .matches(
  //     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  //     "Invalid email format"
  //   )
  //   .required("Required"),
  companyName: yup
    .string()
    .min(2, "Company name must be at least 2 characters")
    .nullable()
    .transform((value) => (value === "" ? null : value)),
  companyEmail: yup
    .string()
    .required("Company email is required")
    .test("is-valid-email", "Invalid email format", (value) => {
      if (!value) return false;

      // 1️⃣ check basic structure
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
        throw new yup.ValidationError("Email must be in format name@domain.tld");
      }

      // 2️⃣ check TLD length
      const tld = value.split(".").pop() ?? "";
      if (tld.length < 2) {
        throw new yup.ValidationError("TLD must be at least 2 characters");
      }

      // 3️⃣ (optional) block personal domains
      // const blocked = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
      // if (blocked.includes(value.split("@")[1])) {
      //   throw new yup.ValidationError("Please use your company email, not a personal email");
      // }

      return true;
    }),
  companyWebsite: yup
    .string()
    .matches(
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/i,
      { message: "Please enter a valid website URL, e.g., example.com or https://www.example.com" }
    )
    .nullable()
    .optional()
    .transform((value) => (value === "" ? null : value)),
  // Optional password fields (backend sends separate set-password email for brands)
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one number, and one special character"
    )
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .required(),
  confirmPassword: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .required()
    .when("password", (password, schema) =>
      password ? schema.oneOf([yup.ref("password")], "Passwords must match") : schema
    ),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms")
    .required("You must accept the terms"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .test("is-valid-email", "Invalid email format", (value) => {
      if (!value) return false;

      // 1️⃣ check basic structure - must have @ and domain with TLD
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
        return false;
      }

      // 2️⃣ check TLD length - must be at least 2 characters
      const tld = value.split(".").pop() ?? "";
      if (tld.length < 2) {
        return false;
      }

      // 3️⃣ check for valid email pattern
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        return false;
      }

      return true;
    }),
  password: yup.string().min(6, "Minimum 6 characters").required("Required"),
  userType: yup.string().oneOf(["creator", "brand"]).required(),
});
