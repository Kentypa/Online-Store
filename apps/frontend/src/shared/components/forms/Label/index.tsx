import { ComponentWithChildren } from "@shared-types/component-with-children";
import { LabelHTMLAttributes } from "react";

type LabelProps = {
  className?: string;
} & Omit<LabelHTMLAttributes<HTMLLabelElement>, "className">;

export const Label: ComponentWithChildren<LabelProps> = ({
  className,
  children,
  ...otherOptions
}) => {
  return (
    <label className={className} {...otherOptions}>
      {children}
    </label>
  );
};
