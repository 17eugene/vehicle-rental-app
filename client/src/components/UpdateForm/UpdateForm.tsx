import { useContext, useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

import { useFormik } from "formik";
import { modalValidationSchema } from "../../utils/modalValidationSchema";

import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import FormInput from "../FormInput/FormInput";
import FormSelect from "../FormSelect/FormSelect";
import FormError from "../FormError/FormError";
import Button from "../Button/Button";
import CloseIcon from "../CloseIcon/CloseIcon";

import carsOperations from "../../redux/cars/cars-operations";

import ThemeContext from "../../context/context";
import { filterData } from "../../filterData";

import { t } from "i18next";

import "../../styles/UpdateForm/UpdateForm.scss";
import Loader from "../Loader/Loader";

interface IUpdateFormProps {
  toggleUpdateForm: () => void;
}

const UpdateForm = ({ toggleUpdateForm }: IUpdateFormProps) => {
  const [updError, setUpdError] = useState<string>("");
  const theme = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const selectedCar = useAppSelector((state) => state.cars.selectedCar);
  const isLoading = useAppSelector((state) => state.cars.loading);

  const updFormRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (updFormRef.current) {
      updFormRef.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const updateFormik = useFormik({
    initialValues: {
      id: selectedCar?._id || "",
      brand: selectedCar?.brand || "",
      model: selectedCar?.model || "",
      year: selectedCar?.year || "",
      engineDisplacement: selectedCar?.engineDisplacement || "",
      transmission: selectedCar?.transmission || "",
      fuel: selectedCar?.fuel || "",
      vehicleClass: selectedCar?.vehicleClass || "",
      bodyType: selectedCar?.bodyType || "",
      price: selectedCar?.price || "",
      imageURL: selectedCar?.imageURL || "",
    },

    validationSchema: modalValidationSchema,

    onSubmit: (values) => {
      dispatch(carsOperations.updateCar(values)).then((response) => {
        if (response.payload?.message) {
          setUpdError("Error occured!");
        } else {
          setUpdError("");
          toggleUpdateForm();
        }
      });
    },
  });
  return (
    <Modal>
      <div
        ref={updFormRef}
        className={
          theme === "light" ? "update-form-wrapper" : "update-form-wrapper dark"
        }
      >
        <CloseIcon onClick={toggleUpdateForm} />
        <Form onSubmit={updateFormik.handleSubmit} variant="upd">
          {updError && <div className="car-form-error">{updError}</div>}
          <label className="form__label">
            <span className="form__label-sign">{t("carForm.brand")}</span>
            <FormInput
              name="brand"
              type="text"
              value={updateFormik.values.brand}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              ref={inputRef}
            />
            {updateFormik.errors.brand && updateFormik.touched.brand && (
              <FormError errorText={updateFormik.errors.brand} />
            )}
          </label>

          <label className="form__label">
            <span className="form__label-sign">{t("carForm.model")}</span>
            <FormInput
              name="model"
              type="text"
              value={updateFormik.values.model}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
            />
            {updateFormik.errors.model && updateFormik.touched.model && (
              <FormError errorText={updateFormik.errors.model} />
            )}
          </label>

          <label className="form__label">
            <span className="form__label-sign">{t("carForm.year")}</span>
            <FormInput
              name="year"
              type="text"
              value={updateFormik.values.year}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
            />
            {updateFormik.errors.year && updateFormik.touched.year && (
              <FormError errorText={updateFormik.errors.year} />
            )}
          </label>

          <label className="form__label">
            <span className="form__label-sign">{t("carForm.engine")}</span>
            <FormInput
              name="engineDisplacement"
              type="text"
              value={updateFormik.values.engineDisplacement}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
            />
            {updateFormik.errors.engineDisplacement &&
              updateFormik.touched.engineDisplacement && (
                <FormError errorText={updateFormik.errors.engineDisplacement} />
              )}
          </label>

          <label className="form__label">
            <span className="form__label-sign">
              {t("carForm.transmission")}
            </span>
            <FormSelect
              name="transmission"
              defaultOption={t("carForm.transmission")}
              options={filterData.transmissionType}
              value={updateFormik.values.transmission}
              onChange={updateFormik.handleChange}
            />
            {updateFormik.errors.transmission &&
              updateFormik.touched.transmission && (
                <FormError errorText={updateFormik.errors.transmission} />
              )}
          </label>

          <label className="form__label">
            <span className="form__label-sign">{t("carForm.fuel")}</span>
            <FormSelect
              name="fuel"
              defaultOption={t("carForm.fuel")}
              options={filterData.fuelType}
              value={updateFormik.values.fuel}
              onChange={updateFormik.handleChange}
            />
            {updateFormik.errors.fuel && updateFormik.touched.fuel && (
              <FormError errorText={updateFormik.errors.fuel} />
            )}
          </label>

          <label className="form__label">
            <span className="form__label-sign">{t("carForm.class")}</span>
            <FormSelect
              name="vehicleClass"
              defaultOption={t("carForm.class")}
              options={filterData.classType}
              value={updateFormik.values.vehicleClass}
              onChange={updateFormik.handleChange}
            />
            {updateFormik.errors.vehicleClass &&
              updateFormik.touched.vehicleClass && (
                <FormError errorText={updateFormik.errors.vehicleClass} />
              )}
          </label>

          <label className="form__label">
            <span className="form__label-sign">{t("carForm.body")}</span>
            <FormSelect
              name="bodyType"
              defaultOption={t("carForm.body")}
              options={filterData.bodyType}
              value={updateFormik.values.bodyType}
              onChange={updateFormik.handleChange}
            />
            {updateFormik.errors.bodyType && updateFormik.touched.bodyType && (
              <FormError errorText={updateFormik.errors.bodyType} />
            )}
          </label>

          <label className="form__label">
            <span className="form__label-sign">{t("carForm.price")}</span>
            <FormInput
              name="price"
              type="text"
              value={updateFormik.values.price}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
            />
            {updateFormik.errors.price && updateFormik.touched.price && (
              <FormError errorText={updateFormik.errors.price} />
            )}
          </label>

          <label className="form__label">
            <span className="form__label-sign">{t("carForm.image")}</span>
            <FormInput
              name="imageURL"
              type="text"
              value={updateFormik.values.imageURL}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
            />
            {updateFormik.errors.imageURL && updateFormik.touched.imageURL && (
              <FormError errorText={updateFormik.errors.imageURL} />
            )}
          </label>
          {isLoading ? (
            <Loader />
          ) : (
            <Button type="submit" text={t("submit")} variant="form" />
          )}
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateForm;
