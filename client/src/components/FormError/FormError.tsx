import "../../styles/FormError/FormError.scss";

interface IFormErrorProps {
  errorText: string;
}

const FormError = ({ errorText }: IFormErrorProps) => {
  return <div className="error">{errorText}</div>;
};

export default FormError;
