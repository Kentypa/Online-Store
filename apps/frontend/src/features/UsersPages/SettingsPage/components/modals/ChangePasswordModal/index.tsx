import { ChangeEvent, FC, FormEvent, useMemo } from "react";
import { Button } from "@ui/Button";
import { Input } from "@forms/Input";
import { Modal } from "@modals/Modal";
import { useIsNotSubmitable } from "@hooks/use-is-not-submitable";
import { Label } from "@forms/Label";
import { Form } from "@forms/Form";
import { ChangePasswordFormData } from "@shared-types/change-password-form-data";

type ChangePasswordModalProps = {
  visible: boolean;
  formState: ChangePasswordFormData;
  toggleModal: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  visible,
  formState,
  toggleModal,
  handleChange,
  handleSubmit,
}) => {
  const initialState = useMemo(
    () => ({ oldPassword: "", newPassword: "" }),
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
      backgroundClassName="z-10 bg-[#1A1A1A80] fixed inset-0 flex justify-center items-center"
    >
      <Form
        className="bg-white flex flex-col border border-separator rounded-xl p-3 gap-3"
        handleSubmit={handleSubmit}
      >
        <Label>Old Password</Label>
        <Input
          handleChange={handleChange}
          value={formState.oldPassword}
          name="oldPassword"
          className="p-1 border border-separator rounded-xl"
          type="password"
        />

        <Label>New Password</Label>
        <Input
          handleChange={handleChange}
          value={formState.newPassword}
          name="newPassword"
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
