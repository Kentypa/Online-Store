import { ProfileNavigationProps } from "@layout/ProfileNavigation";
import { useTranslation } from "react-i18next";

export const useProfileNavigation = () => {
  const { t } = useTranslation();

  return {
    title: t("profileNavigation.section"),
    links: [
      { address: "/user/orders", label: t("profileNavigation.orders") },
      { address: "/user/settings", label: t("profileNavigation.userSettings") },
      { address: "/user/cart", label: t("profileNavigation.userCart") },
    ],
  } as ProfileNavigationProps;
};
