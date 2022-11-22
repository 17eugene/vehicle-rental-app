import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import "../../styles/FilterBlockBody/FilterBlockBody.scss";

interface IFilterBlockBodyProps {
  children: ReactNode | ReactNode[];
}

const FilterBlockBody = ({ children }: IFilterBlockBodyProps) => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <div
      className={
        theme === "light" ? "filter-block__body" : "filter-block__body dark"
      }
    >
      {children}
    </div>
  );
};

export default FilterBlockBody;
