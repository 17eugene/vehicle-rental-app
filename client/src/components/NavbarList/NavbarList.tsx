import { useContext } from "react";
import { useTranslation } from "react-i18next";

import NavbarItem from "../NavbarItem/NavbarItem";
import Contacts from "../Contacts/Contacts";

import ThemeContext from "../../context/context";

import "../../styles/NavbarList/NavbarList.scss";
import "../../styles/NavbarItem/NavbarItem.scss";

interface INavbarList {
  toggleContactsSection: () => void;
  contactsIsOpened?: boolean;
  variant?: string
}

const NavbarList = ({
  toggleContactsSection,
  contactsIsOpened,
  variant
}: INavbarList) => {
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();
  return (
    <>
      <ul className="navigation__list">
        <li
          className={
            theme === "light" ? "navigation__item" : "navigation__item dark"
          }
        >
          <NavbarItem menuItem={t("header.navigation.conditions")} />
        </li>
        <li
          className={
            theme === "light" ? "navigation__item" : "navigation__item dark"
          }
        >
          <NavbarItem menuItem={t("header.navigation.feedbacks")} />
        </li>
        <li
          className={
            theme === "light" ? "navigation__item" : "navigation__item dark"
          }
          onClick={toggleContactsSection}
        >
          <NavbarItem menuItem={t("header.navigation.contacts")} />
          {contactsIsOpened && <Contacts toggleContactsSection={toggleContactsSection}/>}
        </li>
      </ul>
    </>
  );
};

export default NavbarList;
