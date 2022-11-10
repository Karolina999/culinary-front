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
}

const SelectList = ({ options, placeholder, name }: SelectProps) => {
  const { setFieldValue } = useFormikContext();
  const [selectedOption, setSelectedOption] = useState(null);
  function handleChange(e: any) {
    setSelectedOption(e?.value);
    setFieldValue(name, e?.value);
  }
  return (
    <div>
      <Select
        placeholder={placeholder}
        isClearable
        isSearchable
        options={options}
        defaultValue={selectedOption}
        onChange={handleChange}
      />
    </div>
  );
};

export default SelectList;
