import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ButtonProps } from "@ui/Button";
import UserLogoutIcon from "@icons/user-logout.svg?react";

export const LogoutButton: FC<ButtonProps> = ({ ...options }) => {
  const { t } = useTranslation("user-settings");

  return (
    <ButtonWithIcon
      {...options}
      className="p-3 bg-primary max-w-125 w-full text-white rounded-4xl flex justify-center"
      icon={<UserLogoutIcon className="size-6 fill-white" />}
    >
      {t("buttons.logout")}
    </ButtonWithIcon>
  );
};
