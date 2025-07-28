import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { PagesEndponts } from "@enums/pagesEndpoints";
import { useUserData } from "@hooks/user/use-user-data";
import { useUserVerify } from "@hooks/auth/use-user-validate";
import { Form } from "@forms/Form";
import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { useAuthSetup } from "@features/AuthPages/SignInPage/hooks/use-auth-setup";
import { useSignIn } from "@features/AuthPages/SignInPage/hooks/use-sign-in";
import { useSignInPopups } from "@features/AuthPages/SignInPage/hooks/use-sign-up-popups";
import { AuthFormFields } from "@forms/AuthFormFields";
import { useAuthForm } from "@hooks/auth/use-auth-form";
import { AuthPageLayout } from "@layout/AuthPageLayout";
import { useNavigateOnSuccess } from "@hooks/navigation/use-navigate-on-success";
import SignInIcon from "@icons/sign.svg?react";

export const SignInPage: FC = () => {
  const { t } = useTranslation(["sign-in"]);
  const { isError, isSuccess, mutate, isForbiddenError } = useSignIn();

  const { handleChange, handleSubmit, isSubmitDisabled } = useAuthForm(mutate);

  const userVerify = useUserVerify(isSuccess);
  const userData = useUserData(userVerify.isSuccess);

  useNavigateOnSuccess(userData.isSuccess, PagesEndponts.USER_SETTINGS);
  useSignInPopups({ userSignInIsError: isError });
  useAuthSetup(isSuccess);

  return (
    <AuthPageLayout title={t("welcomeMessage")} subtitle={t("signInLabel")}>
      <Form
        handleSubmit={handleSubmit}
        className="flex flex-col max-w-112 w-full"
      >
        <div className="flex flex-col gap-8.75">
          <AuthFormFields handleChange={handleChange} t={t} />
          <Link
            to={PagesEndponts.FORGET_PASSWORD}
            className="text-body-paragraph underline font-medium self-end"
          >
            {t("forgetPassword")}
          </Link>
          {isForbiddenError && (
            <Link
              className="text-body-large underline text-attention self-end"
              to={PagesEndponts.ACCOUNT_RECOVERY}
            >
              {t("link.recovery")}
            </Link>
          )}
          <ButtonWithIcon
            disabled={isSubmitDisabled}
            className="text-body-paragraph text-white p-3 w-full flex justify-center rounded-4xl bg-primary"
            icon={<SignInIcon className="fill-white size-6" />}
            id={"sign-in"}
          >
            {t("button.signIn")}
          </ButtonWithIcon>
          <p className="self-center text-body-paragraph">
            {t("link.message")}&nbsp;
            <Link className="underline font-medium" to={PagesEndponts.SIGN_UP}>
              {t("link.signUp")}
            </Link>
          </p>
        </div>
      </Form>
    </AuthPageLayout>
  );
};
