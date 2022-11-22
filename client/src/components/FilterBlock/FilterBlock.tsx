import { ReactNode, MouseEvent } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";

import "../../styles/FilterBlock/FilterBlock.scss";

interface IFilterBlockProps {
  children: ReactNode | ReactNode[];
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const FilterBlock = ({ children, onClick }: IFilterBlockProps) => {
  const theme = useAppSelector((state) => state.theme.theme);
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
