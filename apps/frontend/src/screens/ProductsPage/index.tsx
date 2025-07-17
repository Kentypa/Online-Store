import { FC } from "react";
import { MainContentWrapper } from "@layout/MainContentWrapper";
import { useTranslation } from "react-i18next";
import { useProducts } from "@hooks/use-products";
import { SortProductsBy } from "@enums/sortProductsBy";
import "swiper/css";
import { convertCurrency } from "@utils/currencyConverter";
import { formatCurrency } from "@utils/formatCurrency";
import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { PaginationButtons } from "@business/PaginationButtons";
import { useSearchParams } from "react-router";
import AddToCartIcon from "@icons/shopping-cart-add.svg?react";

export const ProductsPage: FC = () => {
  const { t, i18n } = useTranslation("products");
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") ?? "1");
  const categoryId = Number(searchParams.get("categoryId") ?? "1");
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const { productsData, total, isFetched } = useProducts({
    langCode: i18n.language,
    limit,
    offset,
    sortBy: SortProductsBy.TOTAL_SOLD_DESC,
    categoryId,
  });

  const totalPages = Math.ceil(total / limit);
  console.log(productsData);

  return (
    <MainContentWrapper>
      <div className="flex flex-col w-full px-25 py-16 gap-30">
        <div className="flex flex-col gap-3 items-center">
          <ul className="grid grid-cols-5 gap-[105px]">
            {isFetched &&
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
                  >
                    {t("buttons.buy")}
                  </ButtonWithIcon>
                </div>
              ))}
          </ul>

          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </MainContentWrapper>
  );
};
