import { useContext, Dispatch, SetStateAction } from "react";
import ThemeContext from "../../context/context";

import NavbarList from "../NavbarList/NavbarList";
import "../../styles/MobileMenu/MobileMenu.scss";
import ThemeSelector from "../ThemeSelector/ThemeSelector";

interface IMobileMenuProps {
  setTheme: Dispatch<SetStateAction<string | null>>;
  activeSandwich: boolean;
  toggleContactsSection: () => void;
  contactsIsOpened: boolean;
}

const MobileMenu = ({
  setTheme,
  activeSandwich,
  toggleContactsSection,
  contactsIsOpened,
}: IMobileMenuProps) => {
  const theme = useContext(ThemeContext);
  return (
    <div
      className={
        theme === "light"
          ? activeSandwich
            ? "mobile-menu active"
            : "mobile-menu"
          : activeSandwich
          ? "mobile-menu dark active"
          : "mobile-menu dark"
      }
    >
      <ThemeSelector setTheme={setTheme} />
      <NavbarList
        variant="mobile"
        toggleContactsSection={toggleContactsSection}
        contactsIsOpened={contactsIsOpened}
      ></NavbarList>
    </div>
  );
};

export default MobileMenu;
