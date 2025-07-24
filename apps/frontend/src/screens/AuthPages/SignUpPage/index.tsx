import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { PagesEndponts } from "@enums/pagesEndpoints";
import { Form } from "@forms/Form";
import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { useSignUp } from "@features/AuthPages/SignUpPage/hooks/use-sign-up";
import { useSignUpPopups } from "@features/AuthPages/SignUpPage/hooks/use-sign-up-popups";
import { AuthFormFields } from "@forms/AuthFormFields";
import { useAuthForm } from "@hooks/auth/use-auth-form";
import { AuthPageLayout } from "@layout/AuthPageLayout";
import { useNavigateOnSuccess } from "@hooks/navigation/use-navigate-on-success";
import SignUpIcon from "@icons/sign.svg?react";

export const SignUpPage: FC = () => {
  const { t } = useTranslation(["sign-up"]);

  const {
    isSuccess: signUpSuccess,
    mutate: signUpMutate,
    isError: userSignUpIsError,
  } = useSignUp();

  const { handleChange, handleSubmit, isSubmitDisabled } =
    useAuthForm(signUpMutate);

  useNavigateOnSuccess(signUpSuccess, PagesEndponts.SIGN_IN);
  useSignUpPopups({ userSignUpIsError });

  return (
    <AuthPageLayout title={t("welcomeMessage")} subtitle={t("signUpLabel")}>
      <Form
        handleSubmit={handleSubmit}
        className="flex flex-col max-w-112 w-full"
      >
        <div className="flex flex-col gap-8.75">
          <AuthFormFields handleChange={handleChange} t={t} />
          <ButtonWithIcon
            disabled={isSubmitDisabled}
            className="text-body-paragraph text-white p-3 w-full flex justify-center rounded-4xl bg-primary"
            icon={<SignUpIcon className="fill-white size-6" />}
          >
            {t("button.signUp")}
          </ButtonWithIcon>
          <p className="self-center text-body-paragraph">
            {t("link.message")}&nbsp;
            <Link className="underline font-medium" to={PagesEndponts.SIGN_IN}>
              {t("link.signIn")}
            </Link>
          </p>
        </div>
      </Form>
    </AuthPageLayout>
  );
};
