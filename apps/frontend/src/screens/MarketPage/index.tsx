import { MainContentWrapper } from "@layout/MainContentWrapper";
import { MarketContent } from "@features/MarketPage/components/layout/MarketContent";
import { FC } from "react";

export const MarketPage: FC = () => {
  return (
    <MainContentWrapper>
      <MarketContent />
    </MainContentWrapper>
  );
};
