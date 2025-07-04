import { ReactNode, useState } from "react";
import { Button } from "@ui/Button";

type ExpandSelectionListProps<K extends ReactNode = ReactNode> = {
  variants?: Record<string, K>;
  onChange?: (value: string) => void;
  selectedClassName?: string;
  selectionClassName?: string;
  variantsListClassName?: string;
  children?: ReactNode;
};

export function ExpandSelectionList<K extends ReactNode = ReactNode>({
  variants,
  onChange,
  selectedClassName = "",
  selectionClassName = "",
  variantsListClassName = "",
  children,
}: ExpandSelectionListProps<K>) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative inline-block">
      <Button
        handleClick={() => setIsExpanded(!isExpanded)}
        className={selectedClassName}
      >
        {children}
      </Button>

      {isExpanded && variants && (
        <ul className={`absolute ${variantsListClassName}`}>
          {Object.entries(variants).map(([key, option]) => (
            <li key={key}>
              <Button
                className={selectionClassName}
                handleClick={() => {
                  onChange?.(key);
                  setIsExpanded(false);
                }}
              >
                {option}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
