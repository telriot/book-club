const Yup = require("yup")

const validators = {
  username: Yup.string()
    .min(5, "5 characters or more")
    .max(20, "20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "6 characters or more")
    .max(20, "20 characters or less")
    .required("Required"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),

  stringRequired: Yup.string().required("Required"),
  string: Yup.string(),
}

export default validators
