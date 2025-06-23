import { ComponentWithChildren } from "@shared-types/component-with-children";

type TitleProps = {
  className?: string;
};

export const Title: ComponentWithChildren<TitleProps> = ({
  className,
  children,
}) => {
  return <h1 className={className}>{children}</h1>;
};
