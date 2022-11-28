import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder: string;
  name?: string;
  error: boolean;
  onChange?: (value: any) => void;
  value?: any;
}

const SelectList = ({
  options,
  placeholder,
  name,
  error,
  onChange,
  value,
}: SelectProps) => {
  const formik = useFormikContext();
  const [selectedOption, setSelectedOption] = useState(null);
  const [focus, setFocus] = useState(false);
  function handleChange(e: any) {
    setSelectedOption(e?.value);
    name
      ? formik.setFieldValue(name, e?.value)
      : onChange && e
      ? onChange(e.value)
      : onChange("");
  }
  const style = {
    control: () => ({
      display: "flex",
      width: "100%",
    }),
  };

  return (
    <div>
      <Select
        placeholder={placeholder}
        isClearable
        isSearchable
        options={options}
        value={
          value || value === 0 ? options.filter((o) => o.value == value) : null
        }
        defaultValue={selectedOption}
        onChange={handleChange}
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

export default SelectList;
