import { ChangeEvent, FC } from "react";
import { FormField } from "@forms/FormField";

type AuthFormFieldsProps = {
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  t: (key: string) => string;
};

export const AuthFormFields: FC<AuthFormFieldsProps> = ({
  handleChange,
  t,
}) => (
  <div className="flex flex-col gap-9.5">
    <FormField label={t("email")} name="email" handleChange={handleChange} />
    <FormField
      label={t("password")}
      name="password"
      type="password"
      handleChange={handleChange}
    />
  </div>
);
