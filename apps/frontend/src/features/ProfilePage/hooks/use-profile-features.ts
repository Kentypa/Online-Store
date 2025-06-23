import { useAppSelector } from "@hooks/redux";
import { FeatureItem } from "@shared-types/feature-item";
import { userSelector } from "@selectors/userSelector";
import undefinedIcon from "@icons/undefined.svg";

export const useProfileFeatures = () => {
  const {
    userStats: { totalClickCoins, totalClicks },
  } = useAppSelector(userSelector);

  return [
    {
      description: "Total ClickCoins",
      img: undefinedIcon,
      name: totalClickCoins,
    },
    {
      description: "Total Clicks",
      img: undefinedIcon,
      name: totalClicks,
    },
  ] as FeatureItem[];
};
