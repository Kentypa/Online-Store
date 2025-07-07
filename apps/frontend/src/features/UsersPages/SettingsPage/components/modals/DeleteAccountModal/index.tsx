import { ChangeEvent, FC, FormEvent, useMemo } from "react";
import { Button } from "@ui/Button";
import { DeleteAccountFormData } from "@shared-types/delete-account-form-data";
import { Input } from "@forms/Input";
import { Modal } from "@modals/Modal";
import { useIsNotSubmitable } from "@hooks/use-is-not-submitable";
import { Label } from "@forms/Label";
import { Form } from "@forms/Form";

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
      <Form
        className="bg-white flex flex-col border border-separator rounded-xl p-3 gap-3"
        handleSubmit={handleSubmit}
      >
        <Label>Password</Label>
        <Input
          handleChange={handleChange}
          value={formState.password}
          name="password"
          className="p-1 border border-separator rounded-xl"
          type="password"
        />

        <Label>Repeat Password</Label>
        <Input
          handleChange={handleChange}
          value={formState.passwordRepeat}
          name="passwordRepeat"
          className="p-1 border border-separator rounded-xl"
          type="password"
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
            className="p-3 bg-separator rounded-2xl"
            handleClick={toggleModal}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
