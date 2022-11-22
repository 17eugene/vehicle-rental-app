import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MobileMenu from "../MobileMenu/MobileMenu";

import ThemeContext from "../../context/context";

import "../../styles/Layout/Layout.scss";

interface ILayoutProps {
  setTheme: Dispatch<SetStateAction<string | null>>;
}

const Layout = ({ setTheme }: ILayoutProps) => {
  const theme = useContext(ThemeContext);
  const [activeSandwich, setActiveSandwich] = useState<boolean>(false);
  const [contactsIsOpened, setContactsIsOpened] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setActiveSandwich(!activeSandwich);
  };

  const toggleContactsSection = () => {
    setContactsIsOpened(!contactsIsOpened);
  };
  return (
    <div className={theme === "light" ? "layout" : "layout dark"}>
      <Header
        setTheme={setTheme}
        toggleMobileMenu={toggleMobileMenu}
        activeSandwich={activeSandwich}
        contactsIsOpened={contactsIsOpened}
        toggleContactsSection={toggleContactsSection}
      />
      <MobileMenu
        setTheme={setTheme}
        activeSandwich={activeSandwich}
        toggleContactsSection={toggleContactsSection}
        contactsIsOpened={contactsIsOpened}
      />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
