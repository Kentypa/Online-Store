import { useProfileNavigation } from "@hooks/user/use-profile-navigation";
import { MainContentWrapper } from "@layout/MainContentWrapper";
import { ProfileNavigation } from "@layout/ProfileNavigation";
import { FC } from "react";
import { useCartProducts } from "@features/UsersPages/CartPage/hooks/use-cart-products";
import { useCartQuantities } from "@features/UsersPages/CartPage/hooks/use-cart-quantities";
import { CartItem } from "@features/UsersPages/CartPage/components/layout/CartItem";
import { CartSummary } from "@features/UsersPages/CartPage/components/layout/CartSummary";
import { useCartCalculations } from "@features/UsersPages/CartPage/hooks/use-cart-calculation";
import { useRemoveItemFromCart } from "@features/UsersPages/CartPage/hooks/use-remove-cart";
import { EmptyCartMessage } from "@features/UsersPages/CartPage/components/ui/EmptyCartMessage";

export const CartPage: FC = () => {
  const profileNavigation = useProfileNavigation();
  const { cart, productsData, isEmpty } = useCartProducts();
  const { quantities, handleQuantityChange } = useCartQuantities(cart);
  const { calculateProductTotal, totalCartPrice } = useCartCalculations(
    productsData,
    quantities,
  );
  const { mutate: removeFromCartMutate } = useRemoveItemFromCart();

  const handleRemoveItem = (productId: number) =>
    removeFromCartMutate(productId);

  return (
    <MainContentWrapper>
      <div className="flex justify-between max-w-444 max-h-192 size-full my-18 gap-9">
        <ProfileNavigation {...profileNavigation} />

        {isEmpty ? (
          <EmptyCartMessage />
        ) : (
          <>
            <div className="flex flex-col gap-6 size-full">
              <ul className="flex flex-col gap-6 size-full">
                {productsData?.map((product) => (
                  <CartItem
                    key={product.product_id}
                    product={product}
                    quantity={quantities[product.product_id] ?? 1}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                    calculateTotal={calculateProductTotal}
                  />
                ))}
              </ul>
            </div>

            <CartSummary totalCartPrice={totalCartPrice} />
          </>
        )}
      </div>
    </MainContentWrapper>
  );
};
