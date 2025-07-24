import { useForm } from "@hooks/use-form";
import { useUpdateUser } from "@hooks/use-update-user";
import { ChangePasswordFormData } from "@shared-types/formData/change-password-form-data";
import { useState, useMemo, useEffect, useCallback } from "react";

export const useChangePassword = () => {
  const [showChangePasswordModal, setShowAccountModal] = useState(false);

  const toggleShowChangePasswordModal = useCallback(
    () => setShowAccountModal((prev) => !prev),
    [],
  );

  const initalState = useMemo<ChangePasswordFormData>(
    () => ({ oldPassword: "", newPassword: "" }),
    [],
  );

  const { handleUpdatedUser, isSuccess, ...otherOptions } =
    useUpdateUser(initalState);

  useEffect(() => {
    if (isSuccess) {
      toggleShowChangePasswordModal();
    }
  }, [isSuccess, toggleShowChangePasswordModal]);

  const { formState, handleChange, handleSubmit } =
    useForm<ChangePasswordFormData>(initalState, handleUpdatedUser);

  return {
    formState,
    isSuccess,
    showChangePasswordModal,
    handleChange,
    handleSubmit,
    toggleShowChangePasswordModal,
    ...otherOptions,
  };
};
