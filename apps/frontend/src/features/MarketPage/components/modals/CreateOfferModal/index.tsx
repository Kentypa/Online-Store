import { NumericInput } from "@forms/NumericInput";
import { useForm } from "@hooks/use-form";
import { OfferFormFields } from "@shared-types/offer-form-fields";
import { Button } from "@ui/Button";
import { FC, useMemo } from "react";

type CreateOfferModalProps = {
  toggleModal: () => void;
};

export const CreateOfferModal: FC<CreateOfferModalProps> = ({
  toggleModal,
}) => {
  const initialState = useMemo(
    () => ({
      amountOfCoinsToSell: 0,
      pricePerCoin: 0,
    }),
    []
  );
  const { formState, handleChangeByValue } =
    useForm<OfferFormFields>(initialState);

  return (
    <form className="flex flex-col max-w-[320px] w-full gap-6 rounded-lg border border-subtle-light p-5.75 bg-white">
      <div className="flex flex-1 flex-col gap-3">
        <h4 className="text-headline-small">Create offer</h4>
        <div className="flex flex-col gap-6">
          <NumericInput
            label="Amount of coins to sell"
            labelClassName="text-subtle-dark text-body-large"
            className="text-center text-body-large p-2.75 border border-subtle-light rounded-lg w-full"
            name="amountOfCoinsToSell"
            value={formState.amountOfCoinsToSell}
            handleChangeByValue={handleChangeByValue}
          />
          <NumericInput
            label="Price per coin"
            labelClassName="text-subtle-dark text-body-large"
            className="text-center text-body-large p-2.75 border border-subtle-light rounded-lg w-full"
            name="pricePerCoin"
            value={formState.pricePerCoin}
            handleChangeByValue={handleChangeByValue}
          />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button
          className="bg-background py-2.5 px-4 rounded-xl"
          handleClick={toggleModal}
        >
          <span className="text-primary text-label-medium w-[49px]">
            Cancel
          </span>
        </Button>
        <Button className="bg-primary py-2.5 px-4 rounded-xl">
          <span className="text-white text-label-medium w-[48px]">Create</span>
        </Button>
      </div>
    </form>
  );
};
