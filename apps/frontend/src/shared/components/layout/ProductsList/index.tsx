import { PagesEndponts } from "@enums/pagesEndpoints";
import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { convertCurrency } from "@utils/currencyConverter";
import { formatCurrency } from "@utils/formatCurrency";
import { FC } from "react";
import { useNavigate } from "react-router";
import { ProductTranslation } from "@shared-types/product-translation";
import { useTranslation } from "react-i18next";
import AddToCartIcon from "@icons/shopping-cart-add.svg?react";

type ProductsListProps = {
  productsData?: ProductTranslation[];
};

export const ProductsList: FC<ProductsListProps> = ({ productsData }) => {
  const { t, i18n } = useTranslation("products");

  const navigate = useNavigate();

  const handleNavigateToProductClick = (productId: number) => {
    const newParams = new URLSearchParams();
    newParams.set("productId", String(productId));

    navigate(`${PagesEndponts.PRODUCT}?${newParams.toString()}`);
  };

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
              src={`http://localhost:3000/public${productData.product.main_image_url}`}
              alt={productData.title}
            />
            <div className="flex flex-col gap-3 mt-3">
              <h5 className="truncate">{productData.title}</h5>
              <p>
                {formatCurrency(
                  convertCurrency(
                    productData.product.price,
                    i18n.language === "uk" ? "UAH" : "USD",
                  ),
                  i18n.language === "uk" ? "UAH" : "USD",
                  i18n.language === "uk" ? "uk-UA" : "en-US",
                )}
              </p>
            </div>
            <ButtonWithIcon
              icon={<AddToCartIcon className="fill-white size-6" />}
              className="bg-primary text-white flex max-w-32 max-h-12 items-center justify-center size-full rounded-4xl mt-auto"
              handleClick={() =>
                handleNavigateToProductClick(productData.product_id)
              }
            >
              {t("buttons.buy")}
            </ButtonWithIcon>
          </div>
        ))}
    </ul>
  );
};
