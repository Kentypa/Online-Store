import { ChangeEvent, FC, InputHTMLAttributes } from "react";

export type InputProps = {
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "className">;

export const Input: FC<InputProps> = ({
  handleChange,
  className = "",
  ...otherOptions
}) => {
  return (
    <input className={className} onChange={handleChange} {...otherOptions} />
  );
};
