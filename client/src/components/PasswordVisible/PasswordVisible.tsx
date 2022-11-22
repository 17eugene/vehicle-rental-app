import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

interface IPasswordVisible {
  onClick: () => void;
  visible: boolean;
}

const PasswordVisible = ({ visible, onClick }: IPasswordVisible) => {
  return (
    <div className="pass-visible" onClick={onClick}>
      {visible ? <AiFillEye size={25} /> : <AiFillEyeInvisible size={25} />}
    </div>
  );
};

export default PasswordVisible;
