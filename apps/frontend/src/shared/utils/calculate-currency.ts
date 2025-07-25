import i18n from "@i18n/i18n";
import { convertCurrency } from "./currency-converter";
import { formatCurrency } from "./format-currency";

export const calculateCurrency = (price: number) => {
  return formatCurrency(
    convertCurrency(price, i18n.language === "uk" ? "UAH" : "USD"),
    i18n.language === "uk" ? "UAH" : "USD",
    i18n.language === "uk" ? "uk-UA" : "en-US",
  );
};
