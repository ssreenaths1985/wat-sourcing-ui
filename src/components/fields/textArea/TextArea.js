import React from "react";

export const TextArea = ({ fieldId, placeholder, value }) => {
  return (
    <textarea
      id={fieldId}
      className="custom-input-field-1"
      placeholder={placeholder}
      defaultValue={value}
      style={{ width: "100%" }}
      autoComplete="off"
    />
  );
};
