import { FC } from "react";
import { MainContentWrapper } from "@layout/MainContentWrapper";
import { useTranslation } from "react-i18next";
import { useProducts } from "@hooks/use-products";
import "swiper/css";
import { useSearchParams } from "react-router";

export const ProductPage: FC = () => {
  const { t, i18n } = useTranslation("products");
  const [searchParams, setSearchParams] = useSearchParams();
  const productId = Number(searchParams.get("productId"));

  const { productsData, total, isFetched } = useProducts({
    langCode: i18n.language,
  });

  return (
    <MainContentWrapper>
      <div></div>
    </MainContentWrapper>
  );
};
