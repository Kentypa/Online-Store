import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@forms/Label";
import { Input } from "@forms/Input";
import { Link } from "react-router";
import { PagesEndponts } from "@enums/pagesEndpoints";
import { InputPassword } from "@forms/InputPassword";
import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import SiteLogo from "@icons/logo-website.svg?react";
import SignUpIcon from "@icons/sign.svg?react";

export const SignUpPage: FC = () => {
  const { t } = useTranslation(["sign-up"]);

  return (
    <div className="mt-30 flex flex-col gap-17.5 items-center">
      <SiteLogo className="fill-primary size-30" />
      <h2 className="text-display-medium">{t("welcomeMessage")}</h2>
      <h3 className="text-display-smallest">{t("signUpLabel")}</h3>
      <div className="flex flex-col max-w-112 w-full">
        <div className="flex flex-col gap-8.75">
          <div className="flex flex-col gap-9.5">
            <div className="flex flex-col gap-5">
              <Label className="text-body-small">{t("email")}</Label>
              <Input className="w-full rounded-4xl p-3 border-separator border-2 max-h-12" />
            </div>
            <div className="flex flex-col gap-5">
              <Label className="text-body-small">{t("password")}</Label>
              <InputPassword className="w-full rounded-4xl p-3 border-separator border-2 max-h-12" />
            </div>
          </div>
          <ButtonWithIcon
            className="text-body-paragraph text-white p-3 w-full flex justify-center rounded-4xl bg-primary"
            icon={<SignUpIcon className="fill-white size-6" />}
          >
            {t("button.signUp")}
          </ButtonWithIcon>
          <p className="self-center text-body-paragraph">
            {t("link.message")}&nbsp;
            <Link className="underline font-medium" to={PagesEndponts.signUp}>
              {t("link.signUp")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
