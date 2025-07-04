import { ComponentWithChildren } from "@shared-types/component-with-children";
import { FormHTMLAttributes, FormEvent } from "react";

export type FormProps = {
  handleSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
} & Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit" | "className">;

export const Form: ComponentWithChildren<FormProps> = ({
  handleSubmit,
  className,
  children,
  ...otherOptions
}) => {
  return (
    <form onSubmit={handleSubmit} className={className} {...otherOptions}>
      {children}
    </form>
  );
};
