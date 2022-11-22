import { useContext } from "react";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../context/context";
import "../../styles/LanguageSwitcher/LanguageSwitcher.scss";

const LanguageSwitcher = () => {
  const theme = useContext(ThemeContext);
  const { i18n } = useTranslation();

  const changeLanguageHandler = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const currentLanguage = window.localStorage.getItem("i18nextLng");

  return (
    <div
      className={
        theme === "light" ? "language-switcher" : "language-switcher dark"
      }
    >
      <span className="language-switcher__current-language">
        {currentLanguage}
      </span>
      <div className={theme === "light" ? "tooltip" : "tooltip dark"}>
        <span
          className={theme === "light" ? "lang" : "lang dark"}
          onClick={() => changeLanguageHandler("en")}
        >
          EN
        </span>
        <span
          className={theme === "light" ? "lang" : "lang dark"}
          onClick={() => changeLanguageHandler("ua")}
        >
          UA
        </span>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
