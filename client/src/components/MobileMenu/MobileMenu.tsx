import { useAppSelector } from "../../redux/hooks/hooks";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import NavbarList from "../NavbarList/NavbarList";
import "../../styles/MobileMenu/MobileMenu.scss";

interface IMobileMenuProps {
  activeSandwich: boolean;
  toggleContactsSection: () => void;
  contactsIsOpened: boolean;
}

const MobileMenu = ({
  activeSandwich,
  toggleContactsSection,
  contactsIsOpened,
}: IMobileMenuProps) => {
  const theme = useAppSelector((state) => state.theme.theme);
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
      <ThemeSelector />
      <NavbarList
        variant="mobile"
        toggleContactsSection={toggleContactsSection}
        contactsIsOpened={contactsIsOpened}
      ></NavbarList>
    </div>
  );
};

export default MobileMenu;
