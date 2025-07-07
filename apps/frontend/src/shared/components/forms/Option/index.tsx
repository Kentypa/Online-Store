import { ChangeEvent, FC, OptionHTMLAttributes } from "react";

export type OptionProps = {
  handleChange?: (event: ChangeEvent<HTMLOptionElement>) => void;
  className?: string;
} & Omit<OptionHTMLAttributes<HTMLOptionElement>, "onChange" | "className">;

export const Option: FC<OptionProps> = ({
  handleChange,
  className = "",
  ...otherOptions
}) => {
  return (
    <option className={className} onChange={handleChange} {...otherOptions} />
  );
};
