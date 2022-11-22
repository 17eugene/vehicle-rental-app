interface IOption {
    value: string;
    name: string
}

interface ISortSelectProps {
    options: IOption[];
    defaultOption: string;
    value: string;
    onChange: any
}

const SortSelect = ({
  options,
  defaultOption,
  value,
  onChange,
}: ISortSelectProps) => {
  return (
    <select value={value} onChange={onChange} className="select" name="sort">
      <option disabled value="" className="select__option--default">
        {defaultOption}
      </option>
      {options.map((option) => (
        <option
          value={option.value}
          key={option.name}
          className="select__option"
        >
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default SortSelect;
