import { ComponentWithChildren } from "@shared-types/components/component-with-children";
import { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  handleClick?: () => void;
  className?: string;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "className" | "children"
>;

export const Button: ComponentWithChildren<ButtonProps> = ({
  handleClick,
  children,
  className = "",
  ...otherOptions
}) => {
  return (
    <button className={className} onClick={handleClick} {...otherOptions}>
      {children}
    </button>
  );
};
