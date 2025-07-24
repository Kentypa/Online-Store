import { ChangeEvent, FC, FormEvent, useMemo } from "react";
import { Button } from "@ui/Button";
import { Input } from "@forms/Input";
import { Modal } from "@modals/Modal";
import { Label } from "@forms/Label";
import { Form } from "@forms/Form";
import { useTranslation } from "react-i18next";
import { ChangePasswordFormData } from "@shared-types/formData/change-password-form-data";
import { useIsNotSubmitable } from "@hooks/form/use-is-not-submitable";

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
    [],
  );

  const changesIsNotSubmitable = useIsNotSubmitable({
    allRequired: true,
    initialState,
    state: formState,
  });

  const { t } = useTranslation("user-settings");

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
        <Label>{t("modals.changePassword.labels.oldPassword")}</Label>
        <Input
          handleChange={handleChange}
          value={formState.oldPassword}
          name="oldPassword"
          className="p-1 border border-separator rounded-xl"
          type="password"
        />

        <Label>{t("modals.changePassword.labels.newPassword")}</Label>
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
            {t("modals.changePassword.buttons.confirm")}
          </Button>
          <Button
            className="p-3 bg-separator rounded-2xl"
            handleClick={toggleModal}
          >
            {t("modals.changePassword.buttons.cancel")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
