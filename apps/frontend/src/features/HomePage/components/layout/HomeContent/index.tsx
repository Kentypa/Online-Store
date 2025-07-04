import { FC, useState, MouseEvent } from "react";
import { UserStats } from "../../business/UserStats";
import { ScrollableUpgradeList } from "../../overlays/ScrollableUpgradeList";
import { TapButton } from "../../ui/TapButton";
import { upgradeList } from "./upgradeList.mock";
import { useHomeFeatures } from "@features/HomePage/hooks/use-home-features";
import { DisplayCoin } from "../../overlays/DisplayCoin";
import { DisplayCoinProperties } from "@features/HomePage/types/display-coin-properties";
import styles from "./HomeContent.module.css";

export const HomeContent: FC = () => {
  const userStats = useHomeFeatures();
  const [coinSprites, setCoinSprites] = useState<DisplayCoinProperties[]>([]);
  const handleChange = (e: MouseEvent<HTMLButtonElement>) => {
    const { pageX: x, pageY: y } = e;
    const newCoin: DisplayCoinProperties = {
      coordinates: { x, y },
      count: 1,
      duration: 1000,
      id: Date.now().toString() + Math.random(),
    };
    setCoinSprites((prev) => [...prev, newCoin]);

    setTimeout(() => {
      setCoinSprites((prev) => prev.filter((coin) => coin.id !== newCoin.id));
    }, newCoin.duration);
  };

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
          handleClick={handleChange}
          className="self-center mt-[110px] size-100"
        />
        {coinSprites.map((coin) => (
          <DisplayCoin key={coin.id} {...coin} />
        ))}
      </div>
    </main>
  );
};
