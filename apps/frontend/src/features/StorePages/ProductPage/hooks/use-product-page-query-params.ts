import { useSearchParams } from "react-router";

export const useProductPageQueryParams = () => {
  const [searchParams] = useSearchParams();
  const productId = Number(searchParams.get("productId"));

  return { productId };
};
