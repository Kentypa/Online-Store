import { ProductTranslation } from "@shared-types/storeTypes/products/product-translation";
import { Button } from "@ui/Button";
import { calculateCurrency } from "@utils/calculate-currency";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type CartItemProps = {
  product: ProductTranslation;
  quantity: number;
  onQuantityChange: (productId: number, value: number) => void;
  onRemove: (productId: number) => void;
  calculateTotal: (productId: number, price: number) => number;
};

export const CartItem: FC<CartItemProps> = ({
  product,
  quantity,
  onQuantityChange,
  onRemove,
  calculateTotal,
}) => {
  const { t } = useTranslation("user-cart");

  return (
    <li className="max-h-37 flex flex-row size-full p-6 border-2 border-separator rounded-4xl">
      <img
        src={`http://localhost:3000/public/${product.product.main_image_url}`}
        className="size-25 object-cover rounded-4xl"
        alt={product.title}
      />
      <div className="flex flex-col justify-between items-start ml-3">
        <h3>{product.title}</h3>
        <Button
          handleClick={() => onRemove(product.product_id)}
          className="text-body-small hover:text-accent"
        >
          {t("buttons.remove")}
        </Button>
      </div>
      <div className="ml-auto flex flex-row gap-3">
        <div>
          <h4>{t("labels.each")}</h4>
          <p className="font-semibold">
            {calculateCurrency(product.product.price)}
          </p>
        </div>

        <div>
          <h4>{t("labels.quantity")}</h4>
          <select
            value={quantity}
            onChange={(e) =>
              onQuantityChange(product.product_id, Number(e.target.value))
            }
            className="font-semibold border rounded px-2 py-1"
          >
            {Array.from({ length: product.product.stock }, (_, i) => i + 1).map(
              (qty) => (
                <option key={qty} value={qty}>
                  {qty}
                </option>
              ),
            )}
          </select>
        </div>

        <div>
          <h4>{t("labels.total")}</h4>
          <p className="font-semibold">
            {calculateCurrency(
              calculateTotal(product.product_id, product.product.price),
            )}
          </p>
        </div>
      </div>
    </li>
  );
};
