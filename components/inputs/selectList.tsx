import { useFormikContext } from "formik";
import React, { useState } from "react";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder: string;
  name: string;
  error: boolean;
}

const SelectList = ({ options, placeholder, name, error }: SelectProps) => {
  const { setFieldValue } = useFormikContext();
  const [selectedOption, setSelectedOption] = useState(null);
  const [focus, setFocus] = useState(false);
  function handleChange(e: any) {
    setSelectedOption(e?.value);
    setFieldValue(name, e?.value);
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
        defaultValue={selectedOption}
        onChange={handleChange}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        styles={style}
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
