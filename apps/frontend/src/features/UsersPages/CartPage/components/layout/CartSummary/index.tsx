import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { CheckoutForm } from "../../forms/CheckoutForm";
import { calculateCurrency } from "@utils/calculate-currency";
import { useNavigate } from "react-router";
import { PagesEndponts } from "@enums/pagesEndpoints";
import LockIcon from "@icons/lock.svg?react";

type CartSummaryProps = {
  totalCartPrice: number;
};

export const CartSummary: FC<CartSummaryProps> = ({ totalCartPrice }) => {
  const { t } = useTranslation("user-cart");
  const navigate = useNavigate();

  return (
    <div className="p-11 border-2 border-separator max-w-100 w-full rounded-4xl">
      <div className="flex flex-col gap-6">
        <h2 className="text-display-smallest">
          {t("labels.totalPrice")}: {calculateCurrency(totalCartPrice)}
        </h2>
        <ButtonWithIcon
          className="flex p-3 w-full justify-center items-center bg-primary rounded-4xl"
          icon={<LockIcon className="size-6 fill-white" />}
          handleClick={() => navigate(PagesEndponts.CHECKOUT)}
        >
          <p className="text-white">{t("buttons.checkout")}</p>
        </ButtonWithIcon>
        <CheckoutForm />
      </div>
    </div>
  );
};
