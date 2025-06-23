import { ComponentWithChildren } from "shared/types/component-with-children";

type LabelProps = {
  className?: string;
  htmlFor?: string;
};

export const Label: ComponentWithChildren<LabelProps> = ({
  className,
  htmlFor,
  children,
}) => {
  return (
    <label className={className} htmlFor={htmlFor}>
      {children}
    </label>
  );
};
