import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { FormField } from "@forms/FormField";
import { Form } from "@forms/Form";
import SiteLogo from "@icons/logo-website.svg?react";
import RecoveryIcon from "@icons/recovery.svg?react";

export const ResetPasswordPage: FC = () => {
  const { t } = useTranslation(["reset-password"]);

  return (
    <div className="mt-30 flex flex-col gap-17.5 items-center">
      <SiteLogo className="fill-primary size-30" />
      <h3 className="text-display-smallest">{t("resetLabel")}</h3>
      <Form className="flex flex-col max-w-112 w-full">
        <div className="flex flex-col gap-8.75">
          <div className="flex flex-col gap-9.5">
            <FormField
              label={t("newPassword")}
              name="newPassword"
              // handleChange={handleChange}
              type="password"
            />
            <FormField
              label={t("confirmPassword")}
              name="confirmPassword"
              // handleChange={handleChange}
              type="password"
            />
          </div>
          <ButtonWithIcon
            className="text-body-paragraph text-white p-3 w-full flex justify-center rounded-4xl bg-primary"
            icon={<RecoveryIcon className="fill-white size-6" />}
          >
            {t("button.resetPassword")}
          </ButtonWithIcon>
        </div>
      </Form>
    </div>
  );
};
