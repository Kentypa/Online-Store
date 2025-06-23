import { MainContentWrapper } from "@layout/MainContentWrapper";
import { RatingContent } from "@features/RatingPage/components/layout/RatingContent";
import { FC } from "react";

export const RatingPage: FC = () => {
  return (
    <MainContentWrapper>
      <RatingContent />
    </MainContentWrapper>
  );
};
