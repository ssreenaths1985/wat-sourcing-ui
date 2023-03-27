import React from "react";

export const TextField = ({ fieldId, placeholder, value }) => {
  return (
    <input
      key={fieldId}
      type="text"
      className="form-control custom-input-field-1"
      id={fieldId}
      defaultValue={value}
      placeholder={placeholder}
      autoComplete="off"
    ></input>
  );
};
