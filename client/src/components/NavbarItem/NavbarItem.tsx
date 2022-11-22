import React from "react";


interface INavbarProps {
  menuItem: string;
}

const NavbarItem = ({ menuItem }: INavbarProps) => {
  return <p className="nav-text">{menuItem}</p>;
};

export default NavbarItem;
