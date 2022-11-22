import { MouseEvent } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import "../../styles/FilterBlockHeader/FilterBlockHeader.scss";

interface IFilterBlockHeaderProps {
  text: string;
  isOpenedFilter: boolean;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  variant?: string;
}

const FilterBlockHeader = ({
  text,
  isOpenedFilter,
  onClick,
  variant,
}: IFilterBlockHeaderProps) => {
  const theme = useAppSelector((state) => state.theme.theme);
  return (
    <div
      className={
        theme === "light" ? "filter-block__header" : "filter-block__header dark"
      }
    >
      <h3
        className={
          variant ? `filter-block__text-${variant}` : "filter-block__text"
        }
      >
        {text}
      </h3>
      <div className="toggle-icon-wrapper" onClick={onClick}>
        {isOpenedFilter ? (
          <IoIosArrowUp size={20} className="filter-block__arrow-icon" />
        ) : (
          <IoIosArrowDown size={20} className="filter-block__arrow-icon" />
        )}
      </div>
    </div>
  );
};

export default FilterBlockHeader;
