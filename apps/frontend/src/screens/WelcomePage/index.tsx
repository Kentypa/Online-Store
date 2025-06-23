import { PagesEndponts } from "@enums/pagesEndpoints";
import { MainContentWrapper } from "@layout/MainContentWrapper";
import { Button } from "@ui/Button";
import { FC } from "react";
import { useNavigate } from "react-router";

export const WelcomePage: FC = () => {
  const nav = useNavigate();

  const handleClick = () => {
    nav(PagesEndponts.SIGN_IN);
  };

  return (
    <MainContentWrapper>
      <div className="flex flex-col gap-10 mt-10">
        <div className="flex flex-col gap-2.5">
          <h1 className="text-headline-large">Welcome to Kent Clicker!</h1>
          <h2 className="text-headline-small">To start play game sign in</h2>
        </div>
        <div>
          <Button
            className="p-4 bg-subtle-light rounded-xl"
            handleClick={handleClick}
          >
            Sign in
          </Button>
        </div>
      </div>
    </MainContentWrapper>
  );
};
