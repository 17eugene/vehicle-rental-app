import NavbarList from "../NavbarList/NavbarList";
import MobileMenuIcon from "../MobileMenuIcon/MobileMenuIcon";
import "../../styles/Navbar/Navbar.scss";

interface INavbarProps {
  toggleMobileMenu: () => void;
  activeSandwich: boolean;
  toggleContactsSection: () => void;
  contactsIsOpened: boolean;
}

const Navbar = ({
  toggleMobileMenu,
  activeSandwich,
  toggleContactsSection,
  contactsIsOpened,
}: INavbarProps) => {

  return (
    <>
      <div>
        <MobileMenuIcon
          toggleMobileMenu={toggleMobileMenu}
          activeSandwich={activeSandwich}
        />
      </div>
      <nav className="navigation">
        <NavbarList
          toggleContactsSection={toggleContactsSection}
          contactsIsOpened={contactsIsOpened}
        />
      </nav>
    </>
  );
};

export default Navbar;
