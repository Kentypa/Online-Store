import { Input } from "@forms/Input";
import { InputPassword } from "@forms/InputPassword";
import { Label } from "@forms/Label";
import { ChangeEvent, FC } from "react";

type FormFieldProps = {
  label: string;
  name: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "password" | "text";
};

export const FormField: FC<FormFieldProps> = ({
  label,
  name,
  handleChange,
  type = "text",
}) => {
  const InputComponent = type === "password" ? InputPassword : Input;

  return (
    <div className="flex flex-col gap-5">
      <Label className="text-body-small">{label}</Label>
      <InputComponent
        name={name}
        handleChange={handleChange}
        className="w-full rounded-4xl p-3 border-separator border-2 max-h-12"
      />
    </div>
  );
};
