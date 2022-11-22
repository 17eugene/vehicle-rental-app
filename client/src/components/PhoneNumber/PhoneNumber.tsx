import { useContext } from "react";
import { MdLocalPhone } from "react-icons/md";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../context/context";
import "../../styles/PhoneNumber/PhoneNumber.scss";

const PhoneNumber = () => {
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();
  return (
    <div className="phone-wrapper">
      <div className="phone">
        <MdLocalPhone
          className={theme === "light" ? "phone__icon" : "phone__icon dark"}
          size={32}
        />
        <p
          className={theme === "light" ? "phone__number" : "phone__number dark"}
        >
          +380-99-123-456-7
        </p>
      </div>
      <p className="phone__text">{t("contactsTextPrimary")}</p>
      <span>{t("contactsTextSecondary")}</span>
    </div>
  );
};

export default PhoneNumber;
