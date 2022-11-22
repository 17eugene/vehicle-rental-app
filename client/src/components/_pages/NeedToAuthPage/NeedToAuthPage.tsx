import { useCallback, MouseEvent } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";

import Backdrop from "../../Backdrop/Backdrop";
import Modal from "../../Modal/Modal";
import Button from "../../Button/Button";

import "../../../styles/NeedToAuthPage/NeedToAuthPage.scss";

const NeedToAuthPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { state } = useLocation();

  const clickToClose = useCallback(() => {
    if (!state || !state.from) {
      navigate("/", { replace: true });
    } else {
      navigate(`/${state?.from}`);
    }
  }, [navigate, state]);
  return (
    <Backdrop onClick={clickToClose}>
      <Modal onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <div className="need-auth-wrapper">
          <div className="need-auth">
            <p>
              {t("booking.needTo")}{" "}
              <Link to="/signin">{t("authForm.loginTitle")}</Link>{" "}
              {t("booking.toBookCar")}
            </p>
            <Button
              type="button"
              text={t("booking.btnClose")}
              onClick={clickToClose}
            />
          </div>
        </div>
      </Modal>
    </Backdrop>
  );
};

export default NeedToAuthPage;
