import { FC, useRef, useState } from "react";
import { GradientScrollButton } from "@ui/GradientScrollButton";
import { ClickerUpgrade } from "@features/HomePage/types/clicker-upgrade";
import { UpgradesList } from "../../forms/UpgradesList";
import ArrowDown from "@icons/arrow-down.svg";
import ArrowUp from "@icons/arrow-up.svg";

type ScrollableUpgradeListProps = {
  upgradesList: ClickerUpgrade[];
};

enum ScrollPosition {
  TOP,
  MIDDLE,
  BOTTOM,
}

export const ScrollableUpgradeList: FC<ScrollableUpgradeListProps> = ({
  upgradesList,
}) => {
  const BUTTON_SHOW_OFFSET = 10;
  const listRef = useRef<HTMLUListElement>(null);
  const [scrollPositon, setScrollPosition] = useState<ScrollPosition>(
    ScrollPosition.TOP
  );

  const checkScrollPosition = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;

      if (scrollTop <= BUTTON_SHOW_OFFSET) {
        setScrollPosition(ScrollPosition.TOP);
      } else if (
        scrollTop + clientHeight + BUTTON_SHOW_OFFSET >=
        scrollHeight
      ) {
        setScrollPosition(ScrollPosition.BOTTOM);
      } else {
        setScrollPosition(ScrollPosition.MIDDLE);
      }
    }
  };

  const scrollUp = () => {
    listRef.current?.scrollTo({ top: 0 });
  };

  const scrollDown = () => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  };

  return (
    <div className="relative flex flex-col max-w-[384px] w-full justify-center">
      <GradientScrollButton
        arrowIcon={ArrowUp}
        scrollDirection={scrollUp}
        visable={scrollPositon === ScrollPosition.BOTTOM}
        buttonClassName="top-0"
        gradientClassName="bg-gradient-to-t top-0"
      />
      <GradientScrollButton
        arrowIcon={ArrowDown}
        scrollDirection={scrollDown}
        visable={scrollPositon === ScrollPosition.TOP}
        buttonClassName="bottom-0"
        gradientClassName="bg-gradient-to-b bottom-0"
      />
      <UpgradesList
        className="[scrollbar-width:none] scroll-smooth max-w-[384px] w-full flex flex-col gap-3 max-h-[726px] overflow-y-auto"
        upgradesList={upgradesList}
        listRef={listRef}
        onScroll={checkScrollPosition}
      />
    </div>
  );
};
