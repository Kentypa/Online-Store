import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { FormField } from "@forms/FormField";
import { Form } from "@forms/Form";
import { useResetPassword } from "@features/AuthPages/RecoveryPages/ResetPasswordPage/hooks/use-reset-password";
import { useResetPasswordPagePopups } from "@features/AuthPages/RecoveryPages/ResetPasswordPage/hooks/use-reset-password-popups";
import { PagesEndponts } from "@enums/pagesEndpoints";
import { useForm } from "@hooks/use-form";
import { useIsNotSubmitable } from "@hooks/use-is-not-submitable";
import { useNavigateOnSuccess } from "@hooks/use-navigate-on-success";
import { useSearchParams } from "react-router";
import SiteLogo from "@icons/logo-website.svg?react";
import RecoveryIcon from "@icons/recovery.svg?react";

export const ResetPasswordPage: FC = () => {
  const { t } = useTranslation(["reset-password"]);

  const {
    isError: userResetPasswordIsError,
    isSuccess: recoveryIsSuccess,
    mutate,
  } = useResetPassword();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const initialState = useMemo(() => ({ newPassword: "" }), []);
  const { formState, handleChange, handleSubmit } = useForm(
    initialState,
    (formState) => {
      mutate({
        resetToken: token,
        newPassword: formState.newPassword,
      });
    }
  );

  const isSubmitDisabled = useIsNotSubmitable({
    allRequired: true,
    initialState,
    state: formState,
  });

  useNavigateOnSuccess(recoveryIsSuccess, PagesEndponts.SIGN_IN);
  useResetPasswordPagePopups({ userResetPasswordIsError });

  return (
    <div className="mt-30 flex flex-col gap-17.5 items-center">
      <SiteLogo className="fill-primary size-30" />
      <h3 className="text-display-smallest">{t("resetLabel")}</h3>
      <Form
        handleSubmit={handleSubmit}
        className="flex flex-col max-w-112 w-full"
      >
        <div className="flex flex-col gap-8.75">
          <div className="flex flex-col gap-9.5">
            <FormField
              label={t("newPassword")}
              name="newPassword"
              handleChange={handleChange}
              type="password"
            />
          </div>
          <ButtonWithIcon
            className="text-body-paragraph text-white p-3 w-full flex justify-center rounded-4xl bg-primary"
            icon={<RecoveryIcon className="fill-white size-6" />}
            disabled={isSubmitDisabled}
          >
            {t("button.resetPassword")}
          </ButtonWithIcon>
        </div>
      </Form>
    </div>
  );
};
