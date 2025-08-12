import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { FC } from "react";
import { ProductTranslation } from "@shared-types/storeTypes/products/product-translation";
import { useTranslation } from "react-i18next";
import { useNavigateToProduct } from "@hooks/navigation/use-navigate-to-product";
import { calculateCurrency } from "@utils/calculate-currency";
import { BACKEND_URL } from "@config/config";
import AddToCartIcon from "@icons/shopping-cart-add.svg?react";

type ProductsListProps = {
  productsData?: ProductTranslation[];
};

export const ProductsList: FC<ProductsListProps> = ({ productsData }) => {
  const { t } = useTranslation("products");

  const { handleNavigateToProduct } = useNavigateToProduct();

  return (
    <ul className="grid grid-cols-5 gap-[105px]">
      {productsData &&
        productsData.map((productData) => (
          <div
            key={productData.product.id}
            className="h-90 w-60 size-full flex flex-col p-2.5 bg-background border-2 border-separator rounded-2xl"
          >
            <img
              className="w-[240px] h-[135px] rounded-2xl"
              src={`${BACKEND_URL}/public${productData.product.mainImageUrl}`}
              alt={productData.title}
            />
            <div className="flex flex-col gap-3 mt-3">
              <h5 className="truncate">{productData.title}</h5>
              <p>{calculateCurrency(productData.product.price)}</p>
            </div>
            <ButtonWithIcon
              icon={<AddToCartIcon className="fill-white size-6" />}
              className="bg-primary text-white flex max-w-32 max-h-12 items-center justify-center size-full rounded-4xl mt-auto"
              handleClick={() => handleNavigateToProduct(productData.productId)}
            >
              {t("buttons.buy")}
            </ButtonWithIcon>
          </div>
        ))}
    </ul>
  );
};
