import { useTranslation } from "react-i18next";

export const EmptyCartMessage = () => {
  const { t } = useTranslation("user-cart");

  return (
    <div className="flex items-center justify-center w-full">
      <p className="text-display-small">{t("messages.emptyCart")}</p>
    </div>
  );
};
