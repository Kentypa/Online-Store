import { useProfileNavigation } from "@hooks/use-profile-navigation";
import { MainContentWrapper } from "@layout/MainContentWrapper";
import { ProfileNavigation } from "@layout/ProfileNavigation";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@hooks/redux";
import { userSelector } from "@stores/selectors/userSelector";
import { useProducts } from "@hooks/use-products";
import { Button } from "@ui/Button";
import { ButtonWithIcon } from "@ui/ButtonWithIcon";
import { useRemoveItemFromCart } from "@features/CartPage/hooks/use-remove-cart";
import LockIcon from "@icons/lock.svg?react";
import { useUpdateQuantity } from "@features/CartPage/hooks/use-update-quantity";

export const CartPage: FC = () => {
  const profileNavigation = useProfileNavigation();
  const { cart } = useAppSelector(userSelector);
  const { t, i18n } = useTranslation("user-cart");

  const cartProductsIds = cart?.map((item) => item.product_id) || [];

  const shouldFetchProducts = cartProductsIds.length > 0;

  const { productsData } = useProducts(
    {
      productsId: cartProductsIds,
      langCode: i18n.language,
    },
    shouldFetchProducts,
  );

  const [quantities, setQuantities] = useState<Record<number, number>>({});

  useEffect(() => {
    if (cart) {
      const initialQuantities = Object.fromEntries(
        cart.map((item) => [item.product_id, item.quantity]),
      );
      setQuantities(initialQuantities);
    }
  }, [cart]);

  const { mutate: updateQuantityMutate } = useUpdateQuantity();

  const handleQuantityChange = (productId: number, value: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: value }));

    updateQuantityMutate({ productId, newQuantity: value });
  };

  const calculateTotal = (productId: number, price: number) => {
    const quantity = quantities[productId] ?? 1;
    return price * quantity;
  };

  const totalCartPrice =
    productsData?.reduce((acc, product) => {
      const price = product.product.price;
      const quantity = quantities[product.product_id] ?? 1;
      return acc + price * quantity;
    }, 0) ?? 0;

  const { mutate: removeFromCartMutate } = useRemoveItemFromCart();
  const handleRemoveItemFromCart = (productId: number) =>
    removeFromCartMutate(productId);

  return (
    <MainContentWrapper>
      <div className="flex justify-between max-w-444 max-h-192 size-full my-18 gap-9">
        <ProfileNavigation {...profileNavigation} />
        {cart && (
          <>
            <div className="flex flex-col gap-6 size-full">
              <ul className="flex flex-col gap-6 size-full">
                {productsData?.map((product) => (
                  <li
                    key={product.product_id}
                    className="max-h-37 flex flex-row size-full p-6 border-2 border-separator rounded-4xl"
                  >
                    <img
                      src={`http://localhost:3000/public/${product.product.main_image_url}`}
                      className="size-25 object-cover rounded-4xl"
                    />
                    <div className="flex flex-col justify-between items-start ml-3">
                      <h3>{product.title}</h3>
                      <Button
                        handleClick={() =>
                          handleRemoveItemFromCart(product.product_id)
                        }
                        className="text-body-small hover:text-accent"
                      >
                        {t("buttons.remove")}
                      </Button>
                    </div>
                    <div className="ml-auto flex flex-row gap-6 items-center">
                      <div>
                        <h4>{t("labels.each")}</h4>
                        <p className="font-semibold">{product.product.price}</p>
                      </div>

                      <div>
                        <h4>{t("labels.quantity")}</h4>
                        <select
                          value={quantities[product.product_id] ?? 1}
                          onChange={(e) =>
                            handleQuantityChange(
                              product.product_id,
                              Number(e.target.value),
                            )
                          }
                          className="font-semibold border rounded px-2 py-1"
                        >
                          {Array.from(
                            { length: product.product.stock },
                            (_, i) => i + 1,
                          ).map((qty) => (
                            <option key={qty} value={qty}>
                              {qty}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <h4>{t("labels.total")}</h4>
                        <p className="font-semibold">
                          {calculateTotal(
                            product.product_id,
                            product.product.price,
                          )}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-11 border-2 border-separator max-w-100 w-full rounded-4xl">
              <div className="flex flex-col gap-6">
                <h2 className="text-display-smallest">
                  {t("labels.totalPrice")}: {totalCartPrice}
                </h2>
                <ButtonWithIcon
                  className="flex p-3 w-full justify-center items-center bg-primary rounded-4xl"
                  icon={<LockIcon className="size-6 fill-white" />}
                >
                  <p className="text-white">{t("buttons.checkout")}</p>
                </ButtonWithIcon>
              </div>
            </div>
          </>
        )}
      </div>
    </MainContentWrapper>
  );
};
