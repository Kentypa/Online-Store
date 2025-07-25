import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { Stars } from "@ui/Stars";
import { calculateCurrency } from "@utils/calculate-currency";
import { useTranslation } from "react-i18next";
import { ProductTranslation } from "@shared-types/storeTypes/products/product-translation";
import ShoppingCart from "@icons/shopping-cart.svg?react";
import ShoppingCartAdd from "@icons/shopping-cart-add.svg?react";

type ProductInfoProps = {
  productData: ProductTranslation;
  averageRating?: number;
  isAlreadyInCart?: boolean;
  addToCart: () => void;
};

export const ProductInfo = ({
  productData,
  averageRating,
  isAlreadyInCart,
  addToCart,
}: ProductInfoProps) => {
  const { t } = useTranslation("product");

  return (
    <div className="flex flex-col p-14.5 rounded-4xl border-2 border-separator size-full">
      <div className="flex flex-col gap-38.5">
        <div className="flex flex-col gap-12">
          <div>
            <div className="max-h-15 mb-6">
              <h2 className="text-display-smallest">{productData.title}</h2>
            </div>
            <Stars
              gap={12}
              rating={averageRating ?? 0}
              starSize={24}
              className="fill-primary flex"
            />
          </div>
          <div className="flex size-full max-h-60">
            {productData.description}
          </div>
        </div>
        <div className="flex w-full justify-between items-center">
          <p className="text-display-small">
            {t("labels.price")}&nbsp;
            {calculateCurrency(productData.product.price)}
          </p>
          <div className="flex gap-9">
            <ButtonWithIcon
              icon={<ShoppingCartAdd className="size-6 fill-white" />}
              className="p-3 rounded-4xl bg-primary text-white"
              handleClick={addToCart}
              disabled={isAlreadyInCart}
            >
              {t("buttons.addToCart")}
            </ButtonWithIcon>
            <ButtonWithIcon
              icon={<ShoppingCart className="size-6 fill-white" />}
              className="p-3 rounded-4xl bg-primary text-white"
              disabled={true}
            >
              {t("buttons.buyNow")}
            </ButtonWithIcon>
          </div>
        </div>
      </div>
    </div>
  );
};
