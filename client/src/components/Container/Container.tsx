import { ReactNode } from "react";
import "../../styles/Container/Container.scss";

interface IContainerProps {
  children: ReactNode | ReactNode[];
}

const Container = ({ children }: IContainerProps) => {
  return <div className="container">{children}</div>;
};

export default Container;
