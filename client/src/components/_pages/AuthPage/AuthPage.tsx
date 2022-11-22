import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";

import FormRegistration from "../../FormRegistration/FormRegistration";

import "../../../styles/AuthPage/AuthPage.scss";
import FormLogin from "../../FormLogin/FormLogin";

const AuthPage = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { pathname } = useLocation();

  const togglePasswordVisibility = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <div
      className={pathname.includes("signup") ? "auth-page" : "auth-page login"}
    >
      {pathname.includes("signup") ? (
        <FormRegistration
          togglePasswordVisibility={togglePasswordVisibility}
          visible={visible}
        />
      ) : (
        <FormLogin
          togglePasswordVisibility={togglePasswordVisibility}
          visible={visible}
        />
      )}
    </div>
  );
};

export default AuthPage;
