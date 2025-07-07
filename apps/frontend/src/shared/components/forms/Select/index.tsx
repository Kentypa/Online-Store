import { ChangeEvent, FC, SelectHTMLAttributes } from "react";

export type SelectProps = {
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "className">;

export const Select: FC<SelectProps> = ({
  handleChange,
  className = "",
  ...otherOptions
}) => {
  return (
    <select className={className} onChange={handleChange} {...otherOptions} />
  );
};
