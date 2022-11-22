import { useState } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MobileMenu from "../MobileMenu/MobileMenu";

import "../../styles/Layout/Layout.scss";

const Layout = () => {
  const theme = useAppSelector(state => state.theme.theme);
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
        toggleMobileMenu={toggleMobileMenu}
        activeSandwich={activeSandwich}
        contactsIsOpened={contactsIsOpened}
        toggleContactsSection={toggleContactsSection}
      />
      <MobileMenu
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
