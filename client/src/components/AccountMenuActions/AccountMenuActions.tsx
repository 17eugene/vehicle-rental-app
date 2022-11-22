import { useContext } from "react";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../context/context";
import { MdLogout } from "react-icons/md";

interface IAccountMenuActionsProps {
  logoutHandler: () => void;
  orderDetailsToggle: () => void;
  email: string | null;
}

const AccountMenuActions = ({
  logoutHandler,
  orderDetailsToggle,
  email,
}: IAccountMenuActionsProps) => {
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();
  return (
    <div
      className={
        theme === "light" ? "account-menu__list" : "account-menu__list dark"
      }
    >
      <p
        className={
          theme === "light" ? "account-menu__email" : "account-menu__email dark"
        }
      >
        {email}
      </p>
      <p className="account-menu__item" onClick={orderDetailsToggle}>
        {t("orderDetails")}
      </p>
      <p className="account-menu__item">{t("updateProfile")}</p>
      <div className="sign-out" onClick={logoutHandler}>
        <p className="account-menu__item">{t("signOut")}</p>
        <MdLogout size={20} />
      </div>
    </div>
  );
};

export default AccountMenuActions;
