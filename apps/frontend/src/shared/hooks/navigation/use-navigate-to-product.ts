import { PagesEndponts } from "@enums/pagesEndpoints";
import { useNavigate } from "react-router";

export const useNavigateToProduct = () => {
  const navigate = useNavigate();

  const handleNavigateToProduct = (productId: number) => {
    const newParams = new URLSearchParams();
    newParams.set("productId", String(productId));

    navigate(`${PagesEndponts.PRODUCT}?${newParams.toString()}`);
  };

  return { handleNavigateToProduct };
};
