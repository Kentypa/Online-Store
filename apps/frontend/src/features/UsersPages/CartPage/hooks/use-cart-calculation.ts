import { ProductTranslation } from "@shared-types/storeTypes/products/product-translation";

export const useCartCalculations = (
  productsData?: ProductTranslation[],
  quantities?: Record<number, number>
) => {
  const calculateProductTotal = (productId: number, price: number) => {
    const quantity = quantities?.[productId] ?? 1;
    return price * quantity;
  };

  const totalCartPrice =
    productsData?.reduce((acc, product) => {
      const price = product.product.price;
      const quantity = quantities?.[product.productId] ?? 1;
      return acc + price * quantity;
    }, 0) ?? 0;

  return { calculateProductTotal, totalCartPrice };
};
