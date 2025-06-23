import { FeatureInfo } from "@business/FeatureInfo";
import { FeatureItem } from "@shared-types/feature-item";
import { textFormatter } from "@utils/text-formatter";
import { FC } from "react";

type UserStatsProps = {
  userStats: FeatureItem[];
  className?: string;
  itemClassName?: string;
  itemMainClassName?: string;
  itemDescriptionClassName?: string;
  itemIconClassName?: string;
};

export const UserStats: FC<UserStatsProps> = ({
  userStats,
  className,
  itemClassName,
  itemMainClassName,
  itemDescriptionClassName,
  itemIconClassName,
}) => {
  return (
    <ul className={`flex justify-between w-full ${className}`}>
      {userStats.map((feature) => {
        return (
          <FeatureInfo
            main={textFormatter(feature.name)}
            description={textFormatter(feature.description)}
            icon={feature.img}
            key={feature.description}
            className={`gap-3 first:rounded-l-[10px] last:rounded-r-[10px] w-full bg-background-dark ${itemClassName}`}
            mainClassName={`text-white text-headline-small ${itemMainClassName}`}
            iconClassName={`${itemIconClassName}`}
            descriptionClassName={`text-background text-body-large ${itemDescriptionClassName}`}
          />
        );
      })}
    </ul>
  );
};
