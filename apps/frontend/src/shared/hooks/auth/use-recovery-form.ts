import { useForm } from "@hooks/form/use-form";
import { useIsNotSubmitable } from "@hooks/form/use-is-not-submitable";

export const useRecoveryForm = <T extends Record<string, unknown>>(
  initialState: T,
  onSubmit: (formState: T) => void,
) => {
  const { formState, handleChange, handleSubmit } = useForm(
    initialState,
    onSubmit,
  );

  const isSubmitDisabled = useIsNotSubmitable({
    allRequired: true,
    initialState: initialState,
    state: formState,
  });

  return { formState, handleChange, handleSubmit, isSubmitDisabled };
};
