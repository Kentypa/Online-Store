import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { PagesEndponts } from "@enums/pagesEndpoints";
import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { FormField } from "@forms/FormField";
import { useIsNotSubmitable } from "@hooks/use-is-not-submitable";
import { useSignIn } from "@features/AuthPages/SignInPage/hooks/use-sign-in";
import { useSignInPopups } from "@features/AuthPages/SignInPage/hooks/use-sign-up-popups";
import { useForm } from "@hooks/use-form";
import { useNavigateOnSuccess } from "@hooks/use-navigate-on-success";
import { useUserData } from "@hooks/use-user-data";
import { useUserVerify } from "@hooks/use-user-validate";
import { Form } from "@forms/Form";
import { useAuthSetup } from "@features/AuthPages/SignInPage/hooks/use-auth-setup";
import SiteLogo from "@icons/logo-website.svg?react";
import SignInIcon from "@icons/sign.svg?react";

export const SignInPage: FC = () => {
  const { t } = useTranslation(["sign-in"]);

  const {
    isError: userSignInIsError,
    isSuccess: authIsSuccess,
    mutate,
    isForbiddenError,
  } = useSignIn();

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

  const { isSuccess: userVerifyIsSuccess } = useUserVerify(authIsSuccess);
  const { isSuccess: userDataFetchedSuccess } =
    useUserData(userVerifyIsSuccess);

  useNavigateOnSuccess(userDataFetchedSuccess, PagesEndponts.USER_SETTINGS);
  useSignInPopups({ userSignInIsError });
  useAuthSetup(authIsSuccess);

  return (
    <div className="mt-30 flex flex-col gap-17.5 items-center">
      <SiteLogo className="fill-primary size-30" />
      <h2 className="text-display-medium">{t("welcomeMessage")}</h2>
      <h3 className="text-display-smallest">{t("signInLabel")}</h3>
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
          <Link
            to={PagesEndponts.FORGET_PASSWORD}
            className="text-body-paragraph underline font-medium self-end"
          >
            {t("forgetPassword")}
          </Link>
          {isForbiddenError && (
            <Link
              className="text-body-large underline text-dangerous"
              to={PagesEndponts.ACCOUNT_RECOVERY}
            >
              Wanna recovery your account?
            </Link>
          )}
          <ButtonWithIcon
            disabled={isSubmitDisabled}
            className="text-body-paragraph text-white p-3 w-full flex justify-center rounded-4xl bg-primary"
            icon={<SignInIcon className="fill-white size-6" />}
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
    </div>
  );
};
