import * as Yup from "yup";

export const modalValidationSchema = Yup.object({
  brand: Yup.string()
    .required("Brand name is required")
    .matches(/^[A-Za-z]+$/, "Only letters are allowed!"),
  model: Yup.string().required("Model is required!"),
  year: Yup.string()
    .required("Year of production is required!")
    .matches(/^[0-9]+$/, "Only numbers are allowed!"),
  engineDisplacement: Yup.string()
    .matches(/^[.0-9]*$/, "Only numbers and dots are allowed!")
    .max(5, "5 characters maximum!"),
  transmission: Yup.string()
    .required("Type of transmission is required!")
    .matches(/^[A-Za-z]+$/, "The numbers are unacceptable"),
  fuel: Yup.string()
    .required("Type of fuel is required!")
    .matches(/^[A-Za-z]+$/, "The numbers are unacceptable"),
  vehicleClass: Yup.string().required("Vehicle class is required!"),
  bodyType: Yup.string()
    .required("Body type is required!")
    .matches(/^[A-Za-z]+$/, "Only letters are allowed!"),
  price: Yup.string()
    .matches(/^[0-9]+$/, "Only numbers are allowed!")
    .required("Price is required!"),
  imageURL: Yup.string().required("URL is required!"),
});
