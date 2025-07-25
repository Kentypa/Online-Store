import { Input } from "@forms/Input";
import { Select } from "@forms/Select";
import { Option } from "@forms/Option";
import { useTranslation } from "react-i18next";

export const CheckoutForm = () => {
  const { t } = useTranslation("user-cart");

  return (
    <div className="flex flex-col gap-4 mt-6">
      <h3 className="text-display-smallest">{t("labels.checkoutForm")}</h3>

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
  );
};
