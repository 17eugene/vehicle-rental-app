import { useAppSelector } from "../../redux/hooks/hooks";
import "../../styles/Navbar/Navbar.scss";

interface IMobileMenuProps {
  toggleMobileMenu: () => void;
  activeSandwich: boolean;
}

const MobileMenuIcon = ({ toggleMobileMenu, activeSandwich }: IMobileMenuProps) => {
  const theme = useAppSelector(state => state.theme.theme);
  return (
    <div
      onClick={toggleMobileMenu}
      className={
        theme === "light"
          ? activeSandwich
            ? "mobile-menu-icon active"
            : "mobile-menu-icon"
          : activeSandwich
          ? "mobile-menu-icon dark active"
          : "mobile-menu-icon dark"
      }
    >
      <span className="mobile-menu-icon__element"></span>
      <span className="mobile-menu-icon__element"></span>
      <span className="mobile-menu-icon__element"></span>
    </div>
  );
};

export default MobileMenuIcon;
