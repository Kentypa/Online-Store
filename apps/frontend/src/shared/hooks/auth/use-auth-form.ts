import { useForm } from "@hooks/form/use-form";
import { useIsNotSubmitable } from "@hooks/form/use-is-not-submitable";
import { useMemo } from "react";

export const useAuthForm = (
  onSubmit: (data: { email: string; password: string }) => void,
) => {
  const initialState = useMemo(() => ({ email: "", password: "" }), []);
  const { formState, handleChange, handleSubmit } = useForm(
    initialState,
    onSubmit,
  );

  const isSubmitDisabled = useIsNotSubmitable({
    allRequired: true,
    initialState,
    state: formState,
  });

  return { formState, handleChange, handleSubmit, isSubmitDisabled };
};
