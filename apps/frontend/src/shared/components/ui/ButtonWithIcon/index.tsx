import { ReactNode } from "react";
import { Button, ButtonProps } from "@ui/Button";
import { ComponentWithChildren } from "@shared-types/components/component-with-children";

type ButtonWithIconProps = ButtonProps & {
  icon: ReactNode;
};

export const ButtonWithIcon: ComponentWithChildren<ButtonWithIconProps> = ({
  handleClick,
  children,
  className = "",
  icon,
  ...otherOptions
}) => {
  return (
    <Button handleClick={handleClick} className={className} {...otherOptions}>
      <span className="flex gap-4">
        {icon}
        {children}
      </span>
    </Button>
  );
};
