/**
 * By normally its should by realized with other API, but i'm to lazy so
 * i took current course 1 USD to 42.88 UAH
 *
 * @param value Price in USD.
 * @param to Target currency code.
 */
export const convertCurrency = (value: number, to: string): number => {
  if (to === "USD") return value;

  switch (to) {
    case "UAH":
      return value * 42.88;
    default:
      return value;
  }
};
