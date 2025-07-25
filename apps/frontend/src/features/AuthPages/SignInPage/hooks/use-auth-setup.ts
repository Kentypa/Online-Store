import { useUpdateLanguage } from "@hooks/core/use-update-language";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useAuthSetup = (authIsSuccess: boolean) => {
  const { i18n } = useTranslation(["sign-in"]);

  const { mutate: languageMutate } = useUpdateLanguage();
  useEffect(() => {
    if (authIsSuccess) {
      languageMutate(i18n.language);
    }
  }, [authIsSuccess, languageMutate, i18n]);
};
