import { ReactNode, MouseEvent } from "react";
import "../../styles/Modal/Modal.scss";

interface IModalProps {
  children: ReactNode | ReactNode[];
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const Modal = ({ children, onClick }: IModalProps) => {
  return <div className="modal" onClick={onClick}>{children}</div>;
};

export default Modal;
