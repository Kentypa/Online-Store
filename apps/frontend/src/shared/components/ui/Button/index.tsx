import { ComponentWithChildren } from "@shared-types/component-with-children";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  handleClick?: () => void;
  className?: string;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "className" | "children"
>;

export const Button: ComponentWithChildren<ButtonProps> = ({
  handleClick,
  children,
  className,
  type = "button",
  ...otherOptions
}) => {
  return (
    <button
      className={className}
      onClick={handleClick}
      type={type ?? "button"}
      {...otherOptions}
    >
      {children}
    </button>
  );
};
