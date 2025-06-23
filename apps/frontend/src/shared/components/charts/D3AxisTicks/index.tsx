import { FC } from "react";

type D3AxisTicksProps = {
  name: string;
  className?: string;
  labels: string[];
};

export const D3AxisTicks: FC<D3AxisTicksProps> = ({
  className,
  labels,
  name,
}) => {
  return (
    <div className={className}>
      <ul className="flex w-full justify-between px-6 text-subtle-dark text-body-small opacity-60 mb-2">
        {labels.map((label) => {
          return <li key={label}>{label}</li>;
        })}
      </ul>
      <div className="flex justify-center items-center">
        <h3 className="text-body-large">{name}</h3>
      </div>
    </div>
  );
};
