import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FormField } from "@forms/FormField";
import { useResetPassword } from "@features/AuthPages/RecoveryPages/ResetPasswordPage/hooks/use-reset-password";
import { useResetPasswordPagePopups } from "@features/AuthPages/RecoveryPages/ResetPasswordPage/hooks/use-reset-password-popups";
import { PagesEndponts } from "@enums/pagesEndpoints";
import { useNavigateOnSuccess } from "@hooks/use-navigate-on-success";
import { useSearchParams } from "react-router";
import { useRecoveryForm } from "@hooks/use-recovery-form";
import { RecoveryPageLayout } from "@layout/RecoveryPageLayout";
import RecoveryIcon from "@icons/recovery.svg?react";

export const ResetPasswordPage: FC = () => {
  const { t } = useTranslation(["reset-password"]);
  const { mutate, isSuccess, isError } = useResetPassword();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const initialState = useMemo(() => ({ newPassword: "" }), []);
  const { handleChange, handleSubmit, isSubmitDisabled } = useRecoveryForm(
    initialState,
    ({ newPassword }) => mutate({ resetToken: token, newPassword }),
  );

  useNavigateOnSuccess(isSuccess, PagesEndponts.SIGN_IN);
  useResetPasswordPagePopups({ userResetPasswordIsError: isError });

  return (
    <RecoveryPageLayout
      title={t("resetLabel")}
      handleSubmit={handleSubmit}
      submitDisabled={isSubmitDisabled}
      buttonText={t("button.resetPassword")}
      icon={<RecoveryIcon className="fill-white size-6" />}
    >
      <FormField
        label={t("newPassword")}
        name="newPassword"
        handleChange={handleChange}
        type="password"
      />
    </RecoveryPageLayout>
  );
};
