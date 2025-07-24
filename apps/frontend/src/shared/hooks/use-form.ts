import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

export function useForm<T extends Record<string, unknown>>(
  initialState: T,
  onSubmit?: (formState: T) => void,
) {
  const [formState, setFormState] = useState<T>(initialState);

  useEffect(() => {
    setFormState(initialState);
  }, [initialState]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit?.(formState);
    },
    [formState, onSubmit],
  );

  const handleChangeByValue = useCallback(
    <K extends keyof T>(name: K, value: T[K]) => {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [],
  );

  return { formState, handleChange, handleChangeByValue, handleSubmit };
}
