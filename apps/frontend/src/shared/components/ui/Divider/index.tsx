import { ComponentWithChildren } from "@shared-types/component-with-children";
import styles from "./Divider.module.css";

type DividerProps = {
  className?: string;
};

export const Divider: ComponentWithChildren<DividerProps> = ({
  className,
  children,
}) => {
  return (
    <p
      className={`${className} container flex justify-between items-center ${styles.divider} gap-2`}
    >
      {children}
    </p>
  );
};
