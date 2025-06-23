import { Label } from "@forms/Label";
import { ChangeEvent, FC } from "react";

type AutoComplete = "on" | "off";

export type InputProps = {
  className?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  id?: string;
  autoComplete?: AutoComplete;
  label?: string;
  labelClassName?: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
};

export const Input: FC<InputProps> = ({
  className,
  type,
  id,
  autoComplete,
  name,
  placeholder,
  label,
  labelClassName,
  handleChange,
  value,
}) => {
  return (
    <>
      {label && (
        <Label className={labelClassName} htmlFor={id}>
          {label}
        </Label>
      )}
      <input
        className={className}
        type={type}
        name={name}
        id={id}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
    </>
  );
};
