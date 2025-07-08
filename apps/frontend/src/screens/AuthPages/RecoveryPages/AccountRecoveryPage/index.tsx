import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { Form } from "@forms/Form";
import { FormField } from "@forms/FormField";
import { PagesEndponts } from "@enums/pagesEndpoints";
import { useRecoveryAccount } from "@features/RecoveryAccountPage/hooks/use-recovery-account";
import { useForm } from "@hooks/use-form";
import { useIsNotSubmitable } from "@hooks/use-is-not-submitable";
import { useNavigateOnSuccess } from "@hooks/use-navigate-on-success";
import { useRecoveryPagePopups } from "@features/AuthPages/RecoveryPages/AccountRecoveryPage/hooks/use-account-recovery-popups";
import SiteLogo from "@icons/logo-website.svg?react";
import RecoveryIcon from "@icons/recovery.svg?react";

export const AccountRecoveryPage: FC = () => {
  const { t } = useTranslation(["recovery"]);

  const {
    isError: userAccountRecoveryIsError,
    isSuccess: recoveryIsSuccess,
    mutate,
  } = useRecoveryAccount();

  const initialState = useMemo(() => ({ email: "", password: "" }), []);
  const { formState, handleChange, handleSubmit } = useForm(
    initialState,
    (formState) => {
      mutate(formState);
    }
  );

  const isSubmitDisabled = useIsNotSubmitable({
    allRequired: true,
    initialState,
    state: formState,
  });

  useNavigateOnSuccess(recoveryIsSuccess, PagesEndponts.SIGN_IN);
  useRecoveryPagePopups({ userAccountRecoveryIsError });

  return (
    <div className="mt-30 flex flex-col gap-17.5 items-center">
      <SiteLogo className="fill-primary size-30" />
      <h3 className="text-display-smallest">{t("recoveryLabel")}</h3>
      <Form
        handleSubmit={handleSubmit}
        className="flex flex-col max-w-112 w-full"
      >
        <div className="flex flex-col gap-8.75">
          <div className="flex flex-col gap-9.5">
            <FormField
              label={t("email")}
              name="email"
              handleChange={handleChange}
            />
            <FormField
              label={t("password")}
              name="password"
              type="password"
              handleChange={handleChange}
            />
          </div>
          <ButtonWithIcon
            className="text-body-paragraph text-white p-3 w-full flex justify-center rounded-4xl bg-primary"
            icon={<RecoveryIcon className="fill-white size-6" />}
            disabled={isSubmitDisabled}
          >
            {t("button.recovery")}
          </ButtonWithIcon>
        </div>
      </Form>
    </div>
  );
};
