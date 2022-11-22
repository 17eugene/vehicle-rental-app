import { ChangeEvent } from "react";
import {useTranslation} from "react-i18next";

import "../../styles/FormSelect/FormSelect.scss";

interface IOption {
  id: number;
  value: string;
}

interface IFormSelect {
  name: string;
  defaultOption: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: IOption[];
  value: string;
}

const FormSelect = ({
  name,
  defaultOption,
  onChange,
  options,
  value,
}: IFormSelect) => {
  const {t} = useTranslation();
  return (
    <select
      value={value}
      onChange={onChange}
      name={name}
      className="form__select"
    >
      <option disabled value="" className="form__option--default">
        {defaultOption}
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.value} className="form__option">
          {t(option.value)}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
