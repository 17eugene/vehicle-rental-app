import { useRef } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import SocialLinks from "../SocialLinks/SocialLinks";
import PhoneNumber from "../PhoneNumber/PhoneNumber";
import UseOnClickOutside from "../../hooks/UseOnClickOutside/UseOnClickOutside";
import "../../styles/Contacts/Contacts.scss";

interface IContactsProps {
  toggleContactsSection: () => void;
}

const Contacts = ({ toggleContactsSection }: IContactsProps) => {
  const contactsRef = useRef<HTMLDivElement>(null);
  const theme = useAppSelector((state) => state.theme.theme);

  UseOnClickOutside(contactsRef, toggleContactsSection);
  return (
    <div
      ref={contactsRef}
      className={
        theme === "light" ? "contacts-wrapper" : "contacts-wrapper dark"
      }
    >
      <PhoneNumber />
      <SocialLinks width="35" height="35" />
    </div>
  );
};

export default Contacts;
