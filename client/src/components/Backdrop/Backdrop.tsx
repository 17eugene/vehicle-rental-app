import { ReactNode } from "react";
import "../../styles/Backdrop/Backdrop.scss";

interface IBackdropProps {
  children: ReactNode | ReactNode[];
  onClick?: () => void;
}

const Backdrop = ({ children, onClick }: IBackdropProps) => {
  return <div className="backdrop" onClick={onClick}>{children}</div>;
};

export default Backdrop;
