import { FC } from "react";
import SiteLogo from "@icons/logo-website.svg?react";
import { useTranslation } from "react-i18next";

export const SignInHeader: FC = () => {
  const { t } = useTranslation(["sign-in"]);

  return (
    <>
      <SiteLogo className="fill-primary size-30" />
      <h2 className="text-display-medium">{t("welcomeMessage")}</h2>
      <h3 className="text-display-smallest">{t("signInLabel")}</h3>
    </>
  );
};
