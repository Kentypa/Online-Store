import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { PagesEndponts } from "@enums/pagesEndpoints";
import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { useSignUp } from "@features/AuthPages/SignUpPage/hooks/use-sign-up";
import { useIsNotSubmitable } from "@hooks/use-is-not-submitable";
import { useForm } from "@hooks/use-form";
import { useSignUpPopups } from "@features/AuthPages/SignUpPage/hooks/use-sign-up-popups";
import { useNavigateOnSuccess } from "@hooks/use-navigate-on-success";
import { Form } from "@forms/Form";
import { FormField } from "@forms/FormField";
import SiteLogo from "@icons/logo-website.svg?react";
import SignUpIcon from "@icons/sign.svg?react";

export const SignUpPage: FC = () => {
  const { t } = useTranslation(["sign-up"]);

  const {
    isSuccess,
    mutate: signUpMutate,
    isError: userSignUpIsError,
  } = useSignUp();

  const initialState = useMemo(() => ({ email: "", password: "" }), []);
  const { formState, handleChange, handleSubmit } = useForm(
    initialState,
    (formState) => {
      signUpMutate(formState);
    }
  );

  const isSubmitDisabled = useIsNotSubmitable({
    allRequired: true,
    initialState,
    state: formState,
  });

  useNavigateOnSuccess(isSuccess, PagesEndponts.SIGN_IN);
  useSignUpPopups({ userSignUpIsError });

  return (
    <div className="mt-30 flex flex-col gap-17.5 items-center">
      <SiteLogo className="fill-primary size-30" />
      <h2 className="text-display-medium">{t("welcomeMessage")}</h2>
      <h3 className="text-display-smallest">{t("signUpLabel")}</h3>
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
              handleChange={handleChange}
              type="password"
            />
          </div>
          <ButtonWithIcon
            className="text-body-paragraph text-white p-3 w-full flex justify-center rounded-4xl bg-primary"
            icon={<SignUpIcon className="fill-white size-6" />}
            disabled={isSubmitDisabled}
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
    </div>
  );
};
