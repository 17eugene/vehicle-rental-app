import { ChangeEvent, FocusEvent, ForwardedRef, forwardRef } from "react";
import "../../styles/FormInput/FormInput.scss";

interface IFormInputProps {
  name: string;
  type: "text" | "checkbox" | "email" | "password" | "date";
  placeholder?: string;
  value: string | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  variant?: string;
  readonly?: boolean;
  disabled?: boolean;
  maxLength?: number;
}

const FormInput = forwardRef(
  (
    {
      name,
      type,
      placeholder,
      value,
      onChange,
      onBlur,
      variant,
      readonly,
      disabled,
      maxLength,
    }: IFormInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
        autoCorrect="off"
        className={
          variant === "authorization" ? "auth-form__input" : "form__input"
        }
        readOnly={readonly}
        disabled={disabled}
        maxLength={maxLength}
        ref={ref}
      />
    );
  }
);

export default FormInput;
