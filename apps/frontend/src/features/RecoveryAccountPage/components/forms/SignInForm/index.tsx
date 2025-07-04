import { PagesEndponts } from "@enums/pagesEndpoints";
import { Input } from "@forms/Input";
import { PasswordInput } from "@forms/PasswordInput";
import { useForm } from "@hooks/use-form";
import { useNavigateOnSuccess } from "@hooks/use-navigate-on-success";
import { Button } from "@ui/Button";
import { Title } from "@ui/Title";
import { FC, useMemo } from "react";
import { useIsNotSubmitable } from "@hooks/use-is-not-submitable";
import { useRecoveryAccount } from "@features/RecoveryAccountPage/hooks/use-recovery-account";
import { useRecoveryAccountPopups } from "@features/RecoveryAccountPage/hooks/use-sign-up-popups";

export const RecoveryAccountForm: FC = () => {
  const { isError, isSuccess, mutate } = useRecoveryAccount();

  const initialState = useMemo(() => ({ email: "", password: "" }), []);
  const { formState, handleChange, handleSubmit } = useForm(
    initialState,
    (formState) => {
      mutate(formState);
    }
  );

  const signInIsNotSubmitable = useIsNotSubmitable({
    allRequired: true,
    initialState,
    state: formState,
  });

  useNavigateOnSuccess(isSuccess, PagesEndponts.signIn);

  useRecoveryAccountPopups({ isError });

  return (
    <main className="container flex max-w-100 flex-col items-center">
      <Title className="text-display-small mb-12 text-nowrap">
        Account Recovery
      </Title>
      <form className="container text-subtle-dark" onSubmit={handleSubmit}>
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
          disabled={signInIsNotSubmitable}
          className="container p-3 bg-primary text-white text-label-large gap-1.5 rounded-2xl mb-6 "
        >
          Recovery
        </Button>
      </form>
    </main>
  );
};
