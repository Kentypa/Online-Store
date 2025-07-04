import { PagesEndponts } from "@enums/pagesEndpoints";
import { Input } from "@forms/Input";
import { PasswordInput } from "@forms/PasswordInput";
import { useForm } from "@hooks/use-form";
import { useNavigateOnSuccess } from "@hooks/use-navigate-on-success";
import { Button } from "@ui/Button";
import { ContinueGoogleButton } from "@ui/ContinueGoogleButton";
import { Divider } from "@ui/Divider";
import { Title } from "@ui/Title";
import { useSignUp } from "@features/SignUpPage/hooks/use-sign-up";
import { useSignUpPopups } from "@features/SignUpPage/hooks/use-sign-up-popups";
import { FC, useMemo } from "react";
import { Link } from "react-router";
import { useIsNotSubmitable } from "@hooks/use-is-not-submitable";

export const SignUpForm: FC = () => {
  const { isSuccess, mutate, isError: userSignUpIsError } = useSignUp();

  const initialState = useMemo(() => ({ email: "", password: "" }), []);
  const { formState, handleChange, handleSubmit } = useForm(
    initialState,
    (formState) => {
      mutate(formState);
    }
  );
  const signUpIsNotSubmitable = useIsNotSubmitable({
    allRequired: true,
    initialState,
    state: formState,
  });

  useNavigateOnSuccess(isSuccess, PagesEndponts.signIn);

  useSignUpPopups({ userSignUpIsError });

  return (
    <main className={`container flex max-w-100 flex-col items-center`}>
      <Title className="text-display-small mb-12 font-normal text-nowrap">
        Welcome to KentClicker
      </Title>
      <p className="text-headline-small mb-8">Sign up</p>
      <form className="container text-subtle-dark mb-6" onSubmit={handleSubmit}>
        <div className={`mb-6 flex flex-col`}>
          <Input
            className="p-2.75 rounded-lg border border-subtle-light"
            type="email"
            name="email"
            id="email"
            autoComplete="on"
            label="Email"
            labelClassName="mb-2"
            handleChange={handleChange}
          />
        </div>
        <PasswordInput
          className="relative flex flex-col mb-8"
          handleChange={handleChange}
        />
        <Button
          type="submit"
          disabled={signUpIsNotSubmitable}
          className="container p-3 bg-primary text-white text-label-large gap-1.5 rounded-2xl mb-6 "
        >
          Sign up
        </Button>
      </form>
      <div className="text-body-large container flex justify-center mb-8">
        <p>
          Don’t have account yet?{" "}
          <Link to={`/sign-in`} className="underline">
            Sign in
          </Link>
        </p>
      </div>
      <Divider className="mb-8 text-body-medium">or</Divider>
      <ContinueGoogleButton />
    </main>
  );
};
