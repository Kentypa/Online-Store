import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { Form } from "@forms/Form";
import { FormField } from "@forms/FormField";
import SiteLogo from "@icons/logo-website.svg?react";
import RecoveryIcon from "@icons/recovery.svg?react";

export const ForgetPasswordPage: FC = () => {
  const { t } = useTranslation(["forget-password"]);

  return (
    <div className="mt-30 flex flex-col gap-17.5 items-center">
      <SiteLogo className="fill-primary size-30" />
      <h3 className="text-display-smallest">{t("forgetLabel")}</h3>
      <Form className="flex flex-col max-w-112 w-full">
        <div className="flex flex-col gap-8.75">
          <div className="flex flex-col gap-9.5">
            <FormField label={t("email")} name="email" />
          </div>
          <ButtonWithIcon
            className="text-body-paragraph text-white p-3 w-full flex justify-center rounded-4xl bg-primary"
            icon={<RecoveryIcon className="fill-white size-6" />}
          >
            {t("button.requestResetLink")}
          </ButtonWithIcon>
        </div>
      </Form>
    </div>
  );
};
