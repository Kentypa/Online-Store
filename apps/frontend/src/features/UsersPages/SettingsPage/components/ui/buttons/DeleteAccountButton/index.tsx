import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ButtonProps } from "@ui/Button";
import UserDeleteAccountIcon from "@icons/user-delete.svg?react";

export const DeleteAccountButton: FC<ButtonProps> = ({ ...options }) => {
  const { t } = useTranslation("user-settings");

  return (
    <ButtonWithIcon
      {...options}
      className="p-3 bg-attention max-w-125 w-full rounded-4xl flex justify-center"
      icon={<UserDeleteAccountIcon className="size-6 fill-primary" />}
    >
      {t("buttons.deleteAccount")}
    </ButtonWithIcon>
  );
};
