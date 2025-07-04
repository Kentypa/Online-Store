import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ButtonProps } from "@ui/Button";
import PencilIcon from "@icons/pencil.svg?react";

export const ChangePasswordButton: FC<ButtonProps> = ({ ...options }) => {
  const { t } = useTranslation("user-settings");

  return (
    <ButtonWithIcon
      {...options}
      className="p-3 bg-primary max-w-125 w-full text-white rounded-4xl flex justify-center"
      icon={<PencilIcon className="size-6 fill-white" />}
    >
      {t("buttons.changePassword")}
    </ButtonWithIcon>
  );
};
