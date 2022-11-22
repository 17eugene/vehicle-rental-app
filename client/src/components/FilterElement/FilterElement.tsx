import { ChangeEvent } from "react";
import {useTranslation} from "react-i18next";

import "../../styles/FilterElement/FilterElement.scss";

interface IfilterData {
  id: number;
  value: string;
  icon?: string | any;
}

interface IFilterElementProps {
  type: IfilterData;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FilterElement = ({ type, checked, onChange }: IFilterElementProps) => {
  const {t} = useTranslation()
  return (
    <label htmlFor={type.value} className="filter-block__element">
      <input
        id={type.value}
        name={type.value}
        type="checkbox"
        className="filter-block__checkbox"
        checked={checked}
        onChange={onChange}
      />
      {type.icon ? (
        <div
          className="filter-block__icon"
          style={{ backgroundImage: `url(${type.icon})` }}
        ></div>
      ) : null}
      <p className="filter-block__value">{t(type.value)}</p>
    </label>
  );
};

export default FilterElement;
