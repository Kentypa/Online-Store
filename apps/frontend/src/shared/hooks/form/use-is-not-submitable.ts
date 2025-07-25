import { useCallback, useEffect, useState } from "react";

export type UseIsNotSubmitableArgs = {
  state: Record<string, unknown>;
  initialState: Record<string, unknown>;
  allRequired?: boolean;
};

const normalize = (value: unknown): unknown => {
  if (value === undefined || value === null) return "";
  return value;
};

export const useIsNotSubmitable = ({
  allRequired = false,
  initialState,
  state,
}: UseIsNotSubmitableArgs): boolean => {
  const [isNotSubmitable, setIsNotSubmitable] = useState<boolean>(true);

  const checkSubmitability = useCallback(() => {
    const keys = Object.keys(initialState);

    const isUnchanged = keys.every(
      (key) => normalize(initialState[key]) === normalize(state[key]),
    );
    if (isUnchanged) return true;

    const allFieldsEmpty = keys.every((key) => normalize(state[key]) === "");
    if (allFieldsEmpty) return true;

    if (allRequired) {
      const hasEmptyRequiredField = keys.some(
        (key) => normalize(state[key]) === "",
      );
      if (hasEmptyRequiredField) return true;
    }

    return false;
  }, [allRequired, initialState, state]);

  useEffect(() => {
    setIsNotSubmitable(checkSubmitability());
  }, [checkSubmitability]);

  return isNotSubmitable;
};
