import { useContext } from "react";
import ThemeContext from "../../context/context";
import { GrFormClose } from "react-icons/gr";

import "../../styles/CloseIcon/CloseIcon.scss";

interface ICloseIconProps {
  onClick?: () => void;
}

const CloseIcon = ({ onClick }: ICloseIconProps) => {
  const theme = useContext(ThemeContext);
  return (
    <div
      className={theme === "light" ? "close-icon" : "close-icon dark"}
      onClick={onClick}
    >
      <GrFormClose className="close" size={20} />
    </div>
  );
};

export default CloseIcon;
