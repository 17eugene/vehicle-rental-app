import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { selectTheme } from "../../redux/theme/theme-slice";
import { useTranslation } from "react-i18next";

import Button from "../Button/Button";

import { BsFillMoonFill, BsSun } from "react-icons/bs";

import "../../styles/ThemeSelector/ThemeSelector.scss";


const ThemeSelector = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const toggleThemeHandler = useCallback(() => {
    if (theme === "light") {
      dispatch(selectTheme({ theme: "dark" }));
    } else {
      dispatch(selectTheme({ theme: "light" }));
    }
  }, [dispatch, theme]);

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
