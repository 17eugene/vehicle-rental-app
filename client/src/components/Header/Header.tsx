import { Dispatch, SetStateAction, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/hooks";

import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";
import Button from "../Button/Button";
import HeaderSwitchBlock from "../HeaderSwitchBlock/HeaderSwitchBlock";
import Account from "../Account/Account";

import { useTranslation } from "react-i18next";
import ThemeContext from "../../context/context";

import "../../styles/Header/Header.scss";
import Loader from "../Loader/Loader";

interface IHeaderProps {
  setTheme: Dispatch<SetStateAction<string | null>>;
  toggleMobileMenu: () => void;
  activeSandwich: boolean;
  toggleContactsSection: () => void;
  contactsIsOpened: boolean;
}

const Header = ({
  setTheme,
  toggleMobileMenu,
  activeSandwich,
  toggleContactsSection,
  contactsIsOpened,
}: IHeaderProps) => {
  const theme = useContext(ThemeContext);
  const isLoggenInStatus = useAppSelector((state) => state.auth.isLoggedIn);
  const isRefreshing = useAppSelector((state) => state.auth.refreshing);
  const navigate = useNavigate();

  const { t } = useTranslation();

  const authPageNavigate = () => {
    navigate("/signin");
  };

  return (
    <header className={theme === "light" ? "header" : "header dark"}>
      <Container>
        <div className="header-container">
          <Logo />
          <Navbar
            toggleMobileMenu={toggleMobileMenu}
            activeSandwich={activeSandwich}
            toggleContactsSection={toggleContactsSection}
            contactsIsOpened={contactsIsOpened}
          />
          <HeaderSwitchBlock setTheme={setTheme} />
          {isRefreshing ? (
            <Loader />
          ) : (
            <>
              {!isLoggenInStatus ? (
                <Button
                  onClick={authPageNavigate}
                  type="button"
                  text={t("header.login")}
                  variant="login"
                />
              ) : (
                <Account />
              )}
            </>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
