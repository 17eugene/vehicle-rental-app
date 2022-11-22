import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/hooks";

interface IPublicRouteProps {
  children: JSX.Element;
  restricted: boolean;
}

const PublicRoute = ({ children, restricted = false }: IPublicRouteProps) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn && restricted) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PublicRoute;
