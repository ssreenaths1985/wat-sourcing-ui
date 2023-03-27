import React from "react";

export const EmailField = ({ fieldId, placeholder, value }) => {
  return <input type="email" className="form-control custom-input-field-1" id={fieldId} placeholder={placeholder} defaultValue={value} autoComplete="off"/>;
};
