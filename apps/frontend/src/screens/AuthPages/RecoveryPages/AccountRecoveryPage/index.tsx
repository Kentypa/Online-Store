import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AuthFormFields } from "@forms/AuthFormFields";
import { PagesEndponts } from "@enums/pagesEndpoints";
import { useRecoveryAccount } from "@features/RecoveryAccountPage/hooks/use-recovery-account";
import { useRecoveryPagePopups } from "@features/AuthPages/RecoveryPages/AccountRecoveryPage/hooks/use-account-recovery-popups";
import { useNavigateOnSuccess } from "@hooks/use-navigate-on-success";
import { useRecoveryForm } from "@hooks/use-recovery-form";
import { RecoveryPageLayout } from "@layout/RecoveryPageLayout";
import RecoveryIcon from "@icons/recovery.svg?react";

export const AccountRecoveryPage: FC = () => {
  const { t } = useTranslation(["recovery"]);
  const { mutate, isSuccess, isError } = useRecoveryAccount();

  const initialState = useMemo(() => ({ email: "", password: "" }), []);
  const { handleChange, handleSubmit, isSubmitDisabled } = useRecoveryForm(
    initialState,
    mutate,
  );

  useNavigateOnSuccess(isSuccess, PagesEndponts.SIGN_IN);
  useRecoveryPagePopups({ userAccountRecoveryIsError: isError });

  return (
    <RecoveryPageLayout
      title={t("recoveryLabel")}
      handleSubmit={handleSubmit}
      submitDisabled={isSubmitDisabled}
      buttonText={t("button.recovery")}
      icon={<RecoveryIcon className="fill-white size-6" />}
    >
      <AuthFormFields handleChange={handleChange} t={t} />
    </RecoveryPageLayout>
  );
};
