import { InputProps, Input } from "@forms/Input";
import { Label } from "@forms/Label";
import { OfferFormFields } from "@shared-types/offer-form-fields";
import { Button } from "@ui/Button";
import { validateNumbers } from "@utils/number-validator";
import { FC, ChangeEvent } from "react";
import LeftArrow from "@icons/simple-arrow-left.svg";
import RightArrow from "@icons/simple-arrow-right.svg";

type NumericInputProps = InputProps & {
  name: keyof OfferFormFields;
  value: number;
  handleChangeByValue: (name: keyof OfferFormFields, value: number) => void;
};

export const NumericInput: FC<NumericInputProps> = ({
  autoComplete,
  className,
  handleChangeByValue,
  id,
  label,
  labelClassName,
  name,
  placeholder,
  type,
  value,
}) => {
  const incrementValue = () => handleChangeByValue(name, value + 1);
  const decrementValue = () =>
    handleChangeByValue(name, Math.max(value - 1, 0));

  const validateInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = validateNumbers(event.target.value);
    handleChangeByValue(name, +newValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className={labelClassName}>{label}</Label>
      <div className="relative">
        <Input
          autoComplete={autoComplete}
          className={className}
          handleChange={validateInput}
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
        />
        <Button
          handleClick={decrementValue}
          className="absolute left-1 top-1/2 transform -translate-y-1/2"
        >
          <img src={LeftArrow} alt="arrow-left" />
        </Button>
        <Button
          handleClick={incrementValue}
          className="absolute right-1 top-1/2 transform -translate-y-1/2"
        >
          <img src={RightArrow} alt="arrow-right" />
        </Button>
      </div>
    </div>
  );
};
