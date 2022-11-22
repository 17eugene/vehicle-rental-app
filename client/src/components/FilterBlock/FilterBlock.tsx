import { ReactNode, MouseEvent, useContext } from "react";
import ThemeContext from "../../context/context";

import "../../styles/FilterBlock/FilterBlock.scss";

interface IFilterBlockProps {
  children: ReactNode | ReactNode[];
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const FilterBlock = ({ children, onClick }: IFilterBlockProps) => {
  const theme = useContext(ThemeContext);
  return (
    <div
      className={theme === "light" ? "filter-block" : "filter-block dark"}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FilterBlock;
