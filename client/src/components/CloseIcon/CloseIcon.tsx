import { useAppSelector } from "../../redux/hooks/hooks";
import { GrFormClose } from "react-icons/gr";

import "../../styles/CloseIcon/CloseIcon.scss";

interface ICloseIconProps {
  onClick?: () => void;
}

const CloseIcon = ({ onClick }: ICloseIconProps) => {
  const theme = useAppSelector((state) => state.theme.theme);
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
