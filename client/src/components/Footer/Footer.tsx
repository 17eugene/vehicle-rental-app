import { useAppSelector } from "../../redux/hooks/hooks";
import { useTranslation } from "react-i18next";
import Container from "../Container/Container";
import SocialLinks from "../SocialLinks/SocialLinks";
import Logo from "../Logo/Logo";

import "../../styles/Footer/Footer.scss";

const Footer = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();
  return (
    <div className={theme === "light" ? "footer" : "footer dark"}>
      <Container>
        <div className="contact-data">
          <Logo />
          <address className="contact-data__address-wrapper">
            <p className="contact-data__place">{t("footer.address.city")},</p>
            <p className="contact-data__place">{t("footer.address.street")}</p>
            <p className="contact-data__email">info@example.com</p>
            <p className="contact-data__phone">+380-99-123-456-7</p>
          </address>
        </div>

        <div className="join-us">
          <p className="join-us__text">{t("footer.joinUs")}:</p>
          <SocialLinks width="25" height="25" />
        </div>

        <div className="additional-services">
          <ul className="additional-services__list">
            {t("footer.additional.title")}
            <li className="additional-services__item">
              {t("footer.additional.wedding")}
            </li>
            <li className="additional-services__item">
              {t("footer.additional.abroad")}
            </li>
            <li className="additional-services__item">
              {t("footer.additional.withDriver")}
            </li>
            <li className="additional-services__item">
              {t("footer.additional.leasing")}
            </li>
            <li className="additional-services__item">
              {t("footer.additional.hourly")}
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
