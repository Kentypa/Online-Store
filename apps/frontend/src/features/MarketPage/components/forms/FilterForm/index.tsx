// import { useForm } from '../../hooks/use-form';

import { Input } from "@forms/Input";
import { Button } from "@ui/Button";
import { FC } from "react";

export const FilterForm: FC = () => {
  // const { formState, handleChange, handleSubmit } = useForm({ minAmountOfCoins: '', maxPrice: '' });

  return (
    <form
      className="flex w-full max-w-[588px] gap-6 items-end"
      // onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <Input
          type="text"
          className="border border-subtle-light rounded-lg p-2.75 max-w-[180px]"
          label="Min amount of coins"
          labelClassName="text-body-large text-subtle-dark mb-2"
          name="minAmountOfCoins"
          // handleChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <Input
          type="text"
          className="border border-subtle-light rounded-lg p-2.75 max-w-[180px]"
          label="Max price"
          labelClassName="text-body-large text-subtle-dark mb-2"
          name="maxPrice"
          // handleChange={handleChange}
        />
      </div>
      <Button
        type="submit"
        className="w-full text-label-large rounded-2xl border border-subtle-light py-2.75 px-4.75"
      >
        Apply filters
      </Button>
    </form>
  );
};
