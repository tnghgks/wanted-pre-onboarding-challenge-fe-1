import { useState } from "react";

export const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    let checkedValue = true;
    if (typeof validator === "function") {
      checkedValue = validator(value);
    }
    if (checkedValue) {
      setValue(value);
    }
  };

  return [value, onChange];
};
