import * as Yup from "yup";

const EMAIL_RE =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Enter valid e-mail format")
    .required("E-mail is required!")
    .matches(EMAIL_RE, "E-mail address not valid!"),
  password: Yup.string()
    .required("Password is required!")
    .min(6, "Mininum length 6 characters")
    .max(24, "Maximum lenght 24 characters")
    .matches(new RegExp("^[a-zA-Z0-9]{6,24}$")),
});
