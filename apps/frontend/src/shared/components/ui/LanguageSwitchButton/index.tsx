import { supportedLanguages } from "@config/supportedLanguages";
import { ExpandSelectionList } from "@ui/ExpandSelectionList";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useUpdateLanguage } from "@hooks/use-update-language";
import LanguageSwitchIcon from "@icons/language-change.svg?react";

export const LanguageSwitchButton: FC = () => {
  const { i18n } = useTranslation();
  const currentLanguage =
    supportedLanguages[i18n.language as keyof typeof supportedLanguages];

  const { mutate } = useUpdateLanguage();

  return (
    <ExpandSelectionList
      variants={supportedLanguages}
      selectedClassName="flex flex-row-reverse gap-3 text-white hover:text-accent hover:fill-accent"
      selectionClassName="text-white hover:bg-accent p-2 rounded-md"
      variantsListClassName="left-1/2 top-full -translate-x-1/2 mt-3 bg-primary border border-separator rounded-md z-50"
      onChange={(lang) => {
        i18n.changeLanguage(lang);
        mutate(lang);
      }}
    >
      <LanguageSwitchIcon className="size-6" />
      <p>{currentLanguage}</p>
    </ExpandSelectionList>
  );
};
