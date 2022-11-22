import { useAppSelector } from "../../redux/hooks/hooks";
import { Navigate } from "react-router-dom";

interface IPrivateRoure {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: IPrivateRoure) => {
  const tokenExist = useAppSelector((state) => state.auth.token);
  if (tokenExist) {
    return children;
  }

  return <Navigate to="/signin" />;
};

export default PrivateRoute;
