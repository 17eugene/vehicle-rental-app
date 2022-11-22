import { useAppSelector } from "../../redux/hooks/hooks";
import { useTranslation } from "react-i18next";

import NavbarItem from "../NavbarItem/NavbarItem";
import Contacts from "../Contacts/Contacts";

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
}: INavbarList) => {
  const theme = useAppSelector(state => state.theme.theme);
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
