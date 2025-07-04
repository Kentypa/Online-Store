import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import UserChangeIcon from "@icons/user-change.svg?react";
import { ButtonProps } from "@ui/Button";

export const SaveChangesButton: FC<ButtonProps> = ({ ...options }) => {
  const { t } = useTranslation("user-settings");

  return (
    <ButtonWithIcon
      {...options}
      className="p-3 bg-primary max-w-125 w-full text-white rounded-4xl flex justify-center max-h-12 self-end"
      icon={<UserChangeIcon className="size-6 fill-white" />}
    >
      {t("buttons.saveChanges")}
    </ButtonWithIcon>
  );
};
