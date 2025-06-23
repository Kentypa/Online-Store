import { Logo } from "@ui/Logo";
import { SignInForm } from "@features/SignInPage/components/forms/SignInForm";
import { FC } from "react";

export const SignInPage: FC = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <Logo className="w-[150px] h-16 mt-20 mb-16" />
      <SignInForm />
    </div>
  );
};
