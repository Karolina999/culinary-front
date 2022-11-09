import React, { useState } from "react";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder: string;
}

const SelectList = ({ options, placeholder }: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState(null);
  function handleChange(e: any) {
    setSelectedOption(e?.value);
    console.log(e?.value);
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
