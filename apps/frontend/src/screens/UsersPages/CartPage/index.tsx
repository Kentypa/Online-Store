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
import { useUpdateQuantity } from "@features/CartPage/hooks/use-update-quantity";
import { Input } from "@forms/Input";
import { Select } from "@forms/Select";
import { Option } from "@forms/Option";
import LockIcon from "@icons/lock.svg?react";

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
  const { mutate: removeFromCartMutate } = useRemoveItemFromCart();
  const handleRemoveItemFromCart = (productId: number) =>
    removeFromCartMutate(productId);

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
                    <div className="ml-auto flex flex-row gap-3">
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

                <div className="flex flex-col gap-4 mt-6">
                  <h3 className="text-display-smallest">
                    {t("labels.checkoutForm")}
                  </h3>

                  <Input
                    type="text"
                    name="name"
                    placeholder={t("form.inputs.name")}
                    className="border-2 border-separator px-4 py-2 rounded-4xl"
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder={t("form.inputs.email")}
                    className="border-2 border-separator px-4 py-2 rounded-4xl"
                  />
                  <Input
                    type="text"
                    name="address"
                    placeholder={t("form.inputs.shippingAddress")}
                    className="border-2 border-separator px-4 py-2 rounded-4xl"
                  />
                  <Select
                    name="deliveryMethod"
                    className="border-2 border-separator px-4 py-2 rounded-4xl"
                  >
                    <Option value="standard">
                      {t("form.inputs.variants.standartDelivery")}
                    </Option>
                    <Option value="express">
                      {t("form.inputs.variants.expressDelivery")}
                    </Option>
                  </Select>
                  <Input
                    type="text"
                    name="cardNumber"
                    placeholder={t("form.inputs.cardNumber")}
                    className="border-2 border-separator px-4 py-2 rounded-4xl"
                  />
                  <div className="flex flex-col gap-4">
                    <Input
                      type="text"
                      name="expiryDate"
                      placeholder={t("form.inputs.cardYear")}
                      className="border-2 border-separator px-4 py-2 rounded-4xl"
                    />
                    <Input
                      type="text"
                      name="cvc"
                      placeholder={t("form.inputs.cvc")}
                      className="border-2 border-separator px-4 py-2 rounded-4xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </MainContentWrapper>
  );
};
