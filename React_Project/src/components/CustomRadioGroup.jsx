import React from "react";
import { RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";

const CustomRadioGroup = ({
  name,
  label,
  options,
  value,
  onChange,
  row = true,
  labelClassName = "",
  radioClassName = "",
}) => {
  return (
    <div className="">
      {label && (
        <FormLabel component="legend" className={`text-gray-600  ${labelClassName}`}>
          {label}
        </FormLabel>
      )}
      <RadioGroup
        row={row}
        name={name}
        value={value}
        onChange={onChange}
        className="flex items-center gap-4"
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
            className={radioClassName}
          />
        ))}
      </RadioGroup>
    </div>
  );
};

export default CustomRadioGroup;
