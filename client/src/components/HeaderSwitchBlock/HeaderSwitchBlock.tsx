import { Dispatch, SetStateAction } from "react";

import ThemeSelector from "../ThemeSelector/ThemeSelector";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

import "../../styles/HeaderSwitchBlock/HeaderSwitchBlock.scss";

interface IHeaderSwitchBlockProps {
  setTheme: Dispatch<SetStateAction<string | null>>;
}

const HeaderSwitchBlock = ({ setTheme }: IHeaderSwitchBlockProps) => {
  return (
    <div className="switch-block">
      <ThemeSelector setTheme={setTheme} />
      <LanguageSwitcher />
    </div>
  );
};

export default HeaderSwitchBlock;
