import { ChangeEvent, FC, FormEvent, useMemo } from "react";
import { Button } from "@ui/Button";
import { DeleteAccountFormData } from "@shared-types/delete-account-form-data";
import { Input } from "@forms/Input";
import { Modal } from "@modals/Modal";
import { useIsNotSubmitable } from "@hooks/use-is-not-submitable";

type DeleteAccountModalProps = {
  visible: boolean;
  formState: DeleteAccountFormData;
  toggleModal: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const DeleteAccountModal: FC<DeleteAccountModalProps> = ({
  visible,
  formState,
  toggleModal,
  handleChange,
  handleSubmit,
}) => {
  const initialState = useMemo(
    () => ({ password: "", passwordRepeat: "" }),
    []
  );

  const changesIsNotSubmitable = useIsNotSubmitable({
    allRequired: true,
    initialState,
    state: formState,
  });
  return (
    <Modal
      toggleModal={toggleModal}
      visible={visible}
      backgroundClassName="z-10 bg-[#12121280] fixed inset-0 flex justify-center items-center"
    >
      <form
        className="bg-white flex flex-col border border-subtle-light rounded-xl p-3 gap-3"
        onSubmit={handleSubmit}
      >
        <Input
          handleChange={handleChange}
          value={formState.password}
          name="password"
          placeholder="Password"
          label="Password"
          className="p-1 border border-subtle-dark rounded-xl"
        />
        <Input
          handleChange={handleChange}
          value={formState.passwordRepeat}
          name="passwordRepeat"
          placeholder="Repeat password"
          label="Repeat password"
          className="p-1 border border-subtle-dark rounded-xl"
        />
        <div className="flex justify-between">
          <Button
            className="p-3 bg-primary text-white rounded-2xl"
            type="submit"
            disabled={changesIsNotSubmitable}
          >
            Confirm
          </Button>
          <Button
            className="p-3 bg-subtle-light rounded-2xl"
            handleClick={toggleModal}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};
