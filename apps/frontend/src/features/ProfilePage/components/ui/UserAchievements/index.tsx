import { FeatureInfo } from "@business/FeatureInfo";
import { UserAchievement } from "@shared-types/user-achievement";
import { textFormatter } from "@utils/text-formatter";
import { FC } from "react";
import undefinedIcon from "@icons/undefined.svg";

type UserAchievementProps = {
  achievements: UserAchievement[];
};

export const UserAchievements: FC<UserAchievementProps> = ({
  achievements,
}) => {
  return (
    <div className="flex flex-col max-w-[1200px] w-full">
      <div className="text-title-large pb-6">Achievements</div>
      <ul className="grid grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <FeatureInfo
            className="rounded-lgx border border-subtle-light w-full p-5.75"
            main={textFormatter(achievement.title)}
            mainClassName="text-label-large"
            description={textFormatter(achievement.description)}
            descriptionClassName="text-subtle-dark text-body-large truncate"
            icon={undefinedIcon}
            iconClassName="mr-4"
            key={achievement.title}
          />
        ))}
      </ul>
    </div>
  );
};
