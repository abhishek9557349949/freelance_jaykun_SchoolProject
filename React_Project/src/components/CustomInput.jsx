import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CustomInput = ({
  label,
  type = "text",
  placeholder,
  fullWidth = true,
  margin = "normal",
  sx = {},
  toggleVisibility = false,
  ...props
}) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle DatePicker integration
  if (type === "date") {
    return (
      <DesktopDatePicker
        label={label}
        inputFormat="MM/dd/yyyy"
        value={field.value || null}
        onChange={(newValue) => setFieldValue(props.name, newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth={fullWidth}
            margin={margin}
            sx={{ borderRadius: "8px", ...sx }}
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
          />
        )}
      />
    );
  }

  // Default TextField with optional password toggle
  return (
    <TextField
      {...field}
      type={toggleVisibility && showPassword ? "text" : type}
      label={label}
      variant="outlined"
      fullWidth={fullWidth}
      margin={margin}
      placeholder={placeholder}
      sx={{ borderRadius: "8px", ...sx }}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched && meta.error}
      InputProps={{
        endAdornment: toggleVisibility ? (
          <InputAdornment position="end">
            <IconButton onClick={handleToggleVisibility} edge="end">
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};

export default CustomInput;
