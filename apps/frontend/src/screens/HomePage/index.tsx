import { MainContentWrapper } from "@layout/MainContentWrapper";
import { HomeContent } from "@features/HomePage/components/layout/HomeContent";
import { FC } from "react";

export const HomePage: FC = () => {
  return (
    <MainContentWrapper>
      <HomeContent />
    </MainContentWrapper>
  );
};
