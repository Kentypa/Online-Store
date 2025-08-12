import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FormField } from "@forms/FormField";
import { useForgetPassword } from "@features/AuthPages/RecoveryPages/ForgetPasswordPage/hooks/use-forget-password";
import { PagesEndponts } from "@enums/pagesEndpoints";
import { useForgetPasswordPagePopups } from "@features/AuthPages/RecoveryPages/ForgetPasswordPage/hooks/use-forget-password-popups";
import { useRecoveryForm } from "@hooks/auth/use-recovery-form";
import { RecoveryPageLayout } from "@layout/RecoveryPageLayout";
import { useNavigateOnSuccess } from "@hooks/navigation/use-navigate-on-success";
import RecoveryIcon from "@icons/recovery.svg?react";

export const ForgetPasswordPage: FC = () => {
  const { t } = useTranslation(["forget-password"]);
  const { mutate, isSuccess, isError } = useForgetPassword();

  const initialState = useMemo(
    () => ({
      email: "",
    }),
    []
  );
  const { handleChange, handleSubmit, isSubmitDisabled } = useRecoveryForm(
    initialState,
    mutate
  );

  useNavigateOnSuccess(isSuccess, PagesEndponts.SIGN_IN);
  useForgetPasswordPagePopups({ userForgetPasswordIsError: isError });

  return (
    <RecoveryPageLayout
      title={t("forgetLabel")}
      handleSubmit={handleSubmit}
      submitDisabled={isSubmitDisabled}
      buttonText={t("button.requestResetLink")}
      icon={<RecoveryIcon className="fill-white size-6" />}
    >
      <FormField label={t("email")} name="email" handleChange={handleChange} />
    </RecoveryPageLayout>
  );
};
