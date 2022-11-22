import { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import Form from "../Form/Form";
import FormInput from "../FormInput/FormInput";
import FormError from "../FormError/FormError";
import PasswordVisible from "../PasswordVisible/PasswordVisible";
import Button from "../Button/Button";

import authOperations from "../../redux/users/users-operations";

import { loginValidationSchema } from "../../utils/loginValidationSchema";
import "../../styles/FormRegistration/FormRegistration.scss";

interface IFormLoginProps {
  togglePasswordVisibility: () => void;
  visible: boolean;
}

const FormLogin = ({ togglePasswordVisibility, visible }: IFormLoginProps) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginValidationSchema,

    onSubmit: (values, { resetForm }) => {
      dispatch(authOperations.login(values)).then((response) => {
        if (response.payload?.message) {
          setLoginError(response.payload.message);
        } else {
          setLoginError("");
          navigate("/", { replace: true });
          resetForm();
        }
      });
    },
  });
  return (
    <div
      className={pathname.includes("signup") ? "auth-form" : "auth-form login"}
    >
      <Form onSubmit={loginFormik.handleSubmit}>
        <h3 className="form__title">{t("authForm.loginTitle")}</h3>
        {loginError ? <div className="auth-error">{loginError}</div> : null}

        <div className="auth-form__input-item">
          <FormInput
            name="email"
            type="email"
            placeholder=" "
            value={loginFormik.values.email}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            variant="authorization"
            ref={inputRef}
          />
          <label className="auth-form__input-label">E-mail</label>
          {loginFormik.errors.email && loginFormik.touched.email && (
            <FormError errorText={loginFormik.errors.email} />
          )}
        </div>

        <div className="auth-form__input-item">
          <FormInput
            name="password"
            type={visible ? "text" : "password"}
            placeholder=" "
            value={loginFormik.values.password}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            variant="authorization"
          />
          <label className="auth-form__input-label">
            {t("authForm.password")}
          </label>
          {loginFormik.errors.password && loginFormik.touched.password && (
            <FormError errorText={loginFormik.errors.password} />
          )}
          <PasswordVisible
            visible={visible}
            onClick={togglePasswordVisibility}
          />
        </div>

        <Button type="submit" text={t("authForm.btnLog")} variant="book" />
        <p className="form-link">
          {t("authForm.needAccount")}{" "}
          <Link to="/signup">{t("authForm.registerLink")}</Link>
        </p>
      </Form>
    </div>
  );
};

export default FormLogin;
