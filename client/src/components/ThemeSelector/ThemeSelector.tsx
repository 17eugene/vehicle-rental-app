import {
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { useTranslation } from "react-i18next";

import Button from "../Button/Button";

import ThemeContext from "../../context/context";

import { BsFillMoonFill, BsSun } from "react-icons/bs";

import "../../styles/ThemeSelector/ThemeSelector.scss";

interface IThemeSelectorProps {
  setTheme: Dispatch<SetStateAction<string | null>>;
}

const ThemeSelector = ({ setTheme }: IThemeSelectorProps) => {
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();

  useEffect(() => {
    const currTheme: string | null = window.localStorage.getItem("theme");

    if (!currTheme) {
      window.localStorage.setItem("theme", "light");
    } else {
      const parsedThemeValue = JSON.parse(currTheme);
      setTheme(parsedThemeValue);
    }
  }, [setTheme]);

  useEffect(() => {
    if (theme) {
      window.localStorage.setItem("theme", JSON.stringify(theme));
    }
  }, [theme]);

  const toggleThemeHandler = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, [setTheme]);

  return (
    <div className="theme-selector">
      <Button
        type="button"
        text={theme === "light" ? t("themeDark") : t("themeLight")}
        onClick={toggleThemeHandler}
        variant="theme"
      >
        <div className="theme-icon">
          {theme === "light" ? (
            <BsFillMoonFill size={17} />
          ) : (
            <BsSun size={17} />
          )}
        </div>
      </Button>
    </div>
  );
};

export default ThemeSelector;
