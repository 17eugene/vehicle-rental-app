import {useRef, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import Form from "../Form/Form";
import FormInput from "../FormInput/FormInput";
import FormError from "../FormError/FormError";
import PasswordVisible from "../PasswordVisible/PasswordVisible";
import Button from "../Button/Button";

import authOperations from "../../redux/users/users-operations";

import { registerValidationSchema } from "../../utils/registerValidationSchema";
import "../../styles/FormRegistration/FormRegistration.scss";

interface IFormRegistrationProps {
  togglePasswordVisibility: () => void;
  visible: boolean;
}

const FormRegistration = ({
  togglePasswordVisibility,
  visible,
}: IFormRegistrationProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(inputRef.current) {
      inputRef.current.focus();
    }
  }, [])

  const registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },

    validationSchema: registerValidationSchema,

    onSubmit: (values, { resetForm }) => {
      if (values.password !== values.passwordRepeat) return;
      dispatch(authOperations.register(values));
      navigate("/", { replace: true });
      resetForm();
    },
  });
  return (
    <div className="auth-form">
      <Form onSubmit={registerFormik.handleSubmit}>
        <h3 className="form__title">{t("authForm.registrationTitle")}</h3>
        <div className="auth-form__input-item">
          <FormInput
            name="name"
            type="text"
            placeholder=" "
            value={registerFormik.values.name}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            variant="authorization"
            ref={inputRef}
          />
          <label className="auth-form__input-label">{t("authForm.name")}</label>
          {registerFormik.errors.name && registerFormik.touched.name && (
            <FormError errorText={registerFormik.errors.name} />
          )}
        </div>
        <div className="auth-form__input-item">
          <FormInput
            name="email"
            type="email"
            placeholder=" "
            value={registerFormik.values.email}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            variant="authorization"
          />
          <label className="auth-form__input-label">E-mail</label>
          {registerFormik.errors.email && registerFormik.touched.email && (
            <FormError errorText={registerFormik.errors.email} />
          )}
        </div>
        <div className="auth-form__input-item">
          <FormInput
            name="password"
            type={visible ? "text" : "password"}
            placeholder=" "
            value={registerFormik.values.password}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            variant="authorization"
          />
          <label className="auth-form__input-label">
            {t("authForm.password")}
          </label>
          {registerFormik.errors.password &&
            registerFormik.touched.password && (
              <FormError errorText={registerFormik.errors.password} />
            )}
          <PasswordVisible
            visible={visible}
            onClick={togglePasswordVisibility}
          />
        </div>
        <div className="auth-form__input-item">
          <FormInput
            name="passwordRepeat"
            type={visible ? "text" : "password"}
            placeholder=" "
            value={registerFormik.values.passwordRepeat}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            variant="authorization"
          />
          <label className="auth-form__input-label">
            {t("authForm.passwordConfirm")}
          </label>
          {registerFormik.values.passwordRepeat !==
            registerFormik.values.password &&
            registerFormik.touched.passwordRepeat && (
              <FormError errorText="Password do not match" />
            )}
        </div>
        <Button type="submit" text={t("authForm.btnReg")} variant="book" />
        <p className="form-link">
          {t("authForm.haveAccount")}{" "}
          <Link to="/signin">{t("authForm.loginTitle")}</Link>
        </p>
      </Form>
    </div>
  );
};

export default FormRegistration;
