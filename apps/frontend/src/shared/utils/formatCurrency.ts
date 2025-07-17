/**
 * Formats number as currency for given locale.
 */
export const formatCurrency = (
  value: number,
  currency: string,
  locale: string,
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};
