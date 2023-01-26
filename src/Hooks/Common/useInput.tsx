import { useState } from "react";

export const useInput = (initialValue: string, validator: (value: string) => boolean) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    let checkedValue = true;
    if (typeof validator === "function") {
      checkedValue = validator(value);
    }
    if (checkedValue) {
      setValue(value);
    }
  };

  return { value, onChange };
};
