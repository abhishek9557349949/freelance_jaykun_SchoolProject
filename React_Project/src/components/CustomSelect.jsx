import React from "react";
import Select from "react-select";
import { useField, useFormikContext } from "formik";

const CustomSelect = ({ label, options, name, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <>
      {/* {label ? <label className="block mb-1 font-semibold text-gray-700">{label}</label> : null} */}
      <Select
        options={options}
        onChange={(option) => setFieldValue(name, option.value)}
        onBlur={field.onBlur}
        value={options.find((option) => option.value === field.value)}
        placeholder={label ? label : "Select an option"}
        styles={{
          control: (provided) => ({
            ...provided,
            borderColor: meta.error ? "red" : "#d1d5db",
            boxShadow: "none",
            backgroundColor: "transparent", // Ensures control background is white
            height: "56px", 
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 9999,
            backgroundColor: "white", // Sets the dropdown menu background to white
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#e5e7eb" : "white", // Highlights focused option
            color: "#111827", // Sets text color
          }),
        }}
        classNamePrefix="custom-select"
        {...props}
      />
      {(meta.touched && meta.error) ? (
        <span className="text-sm text-red-500">{meta.error}</span>
      ) : null}
    </>
  );
};

export default CustomSelect;
