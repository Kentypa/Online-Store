import { PagesEndponts } from "@enums/pagesEndpoints";
import { useNavigate } from "react-router";

export const useNavigateToProducts = () => {
  const navigate = useNavigate();

  const handleNavigateToProducts = (query: string) => {
    const newParams = new URLSearchParams();
    newParams.set("query", String(query));

    navigate(`${PagesEndponts.PRODUCTS}?${newParams.toString()}`);
  };

  return { handleNavigateToProducts };
};
