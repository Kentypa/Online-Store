import { FC } from "react";
import { UserStats } from "../../business/UserStats";
import { ScrollableUpgradeList } from "../../overlays/ScrollableUpgradeList";
import { TapButton } from "../../ui/TapButton";
import { upgradeList } from "./upgradeList.mock";
import { useHomeFeatures } from "@features/HomePage/hooks/use-home-features";
import styles from "./HomeContent.module.css";

export const HomeContent: FC = () => {
  const userStats = useHomeFeatures();

  return (
    <main className="my-10 flex w-full px-30 max-w-[1440px] justify-between">
      <ScrollableUpgradeList upgradesList={upgradeList} />
      <div className="ml-6 flex flex-col w-full">
        <UserStats
          userStats={userStats}
          className="gap-x-0.25"
          itemClassName={`p-6 ${styles.customLetter}`}
          itemMainClassName={styles.customLetter}
        />
        <TapButton
          handleClick={() => {}}
          className="self-center mt-[110px] size-100"
        />
      </div>
    </main>
  );
};
