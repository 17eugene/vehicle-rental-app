import ThemeSelector from "../ThemeSelector/ThemeSelector";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

import "../../styles/HeaderSwitchBlock/HeaderSwitchBlock.scss";

const HeaderSwitchBlock = () => {
  return (
    <div className="switch-block">
      <ThemeSelector />
      <LanguageSwitcher />
    </div>
  );
};

export default HeaderSwitchBlock;
