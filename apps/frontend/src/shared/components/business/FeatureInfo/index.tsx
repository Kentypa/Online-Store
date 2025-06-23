import { FC } from "react";

type FeatureInfoProps = {
  icon: string;
  iconClassName?: string;
  description: string;
  descriptionClassName?: string;
  main: string;
  mainClassName?: string;
  className?: string;
};

export const FeatureInfo: FC<FeatureInfoProps> = ({
  icon,
  iconClassName,
  description,
  descriptionClassName,
  main,
  mainClassName,
  className,
}) => {
  return (
    <li className={`flex justify-between items-center w-full ${className}`}>
      <img className={`size-14 ${iconClassName}`} src={icon} alt="stat-icon" />
      <div className="grid gap-0.5 w-full h-full">
        <p className={`${mainClassName}`}>{main}</p>
        <p className={descriptionClassName}>{description}</p>
      </div>
    </li>
  );
};
