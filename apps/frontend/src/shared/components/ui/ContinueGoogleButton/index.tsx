import { Button } from "@ui/Button";
import { FC } from "react";
import GoogleIcon from "@icons/google-icon.svg";

export const ContinueGoogleButton: FC = () => {
  return (
    <Button className="container flex justify-center items-center p-3 bg-background text-primary text-label-large rounded-2xl ">
      <div className="flex items-center justify-center size-6 mr-1.5">
        <img className="size-5" src={GoogleIcon} alt="GoogleIcon" />
      </div>
      <p>Continue with Google</p>
    </Button>
  );
};
