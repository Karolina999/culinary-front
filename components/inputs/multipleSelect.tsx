import React, { useState } from "react";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

interface MultipleSelectProps {
  options: Option[];
  placeholder: string;
  error?: boolean;
  handleChange?: (value: string[]) => void;
}

const MultipleSelect = ({
  options,
  placeholder,
  error,
  handleChange,
}: MultipleSelectProps) => {
  const [focus, setFocus] = useState(false);
  const style = {
    control: () => ({
      display: "flex",
      width: "100%",
    }),
  };
  return (
    <div>
      <Select
        isMulti
        placeholder={placeholder}
        isClearable
        isSearchable
        options={options}
        onChange={(e) =>
          handleChange &&
          handleChange(
            e.map((e) => {
              return e.value;
            })
          )
        }
        //   value={value || value === 0 ? options.filter((o) => o.value == value) : null}
        //   defaultValue={selectedOption}
        //   onChange={handleChange}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        styles={style}
        noOptionsMessage={({ inputValue }) =>
          inputValue ? "Nie znaleziono: " + inputValue : "Nie znaleziono"
        }
        className={
          error
            ? focus
              ? "errorStyleFocus errorStyle"
              : "errorStyle"
            : focus
            ? "selectStyleFocus selectStyle"
            : "selectStyle"
        }
      />
    </div>
  );
};

export default MultipleSelect;
