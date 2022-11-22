import { MouseEvent, ReactNode } from "react";
import "../../styles/Button/Button.scss";

interface IButtonProps {
  type: "button" | "submit";
  text: string;
  variant?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  disabled?: boolean;
}

const Button = ({
  type,
  text,
  variant,
  onClick,
  children,
  disabled,
}: IButtonProps) => {
  return (
    <button
      className={
        variant === "form"
          ? "button__fullWidth button"
          : variant === "add"
          ? "button__add button"
          : variant === "book"
          ? "button__book button"
          : variant === "theme"
          ? "button__switch button"
          : variant === "login"
          ? "button__login button"
          : "button"
      }
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {text}
    </button>
  );
};

export default Button;
