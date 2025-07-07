import { Queries } from "@enums/queriesKeys";
import { ServiceNames } from "@enums/serviceNames";
import { useAppDispatch } from "@hooks/redux";
import { useForm } from "@hooks/use-form";
import { userService } from "@services/userService";
import { DeleteAccountFormData } from "@shared-types/delete-account-form-data";
import { logout } from "@stores/user/userSlice";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useMemo } from "react";

export const useDeleteAccount = () => {
  const [showDeleteAccountModal, setShowAccountModal] = useState(false);

  const toggleShowDeleteAccountModal = () =>
    setShowAccountModal(!showDeleteAccountModal);

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { deleteAccount } = userService(ServiceNames.USER);

  const { mutate, isSuccess, ...otherOptions } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      dispatch(logout());

      queryClient.removeQueries({ queryKey: [Queries.AUTH] });
      queryClient.removeQueries({ queryKey: [Queries.USER] });
    },
  });

  const initalState = useMemo<DeleteAccountFormData>(
    () => ({ password: "", passwordRepeat: "" }),
    []
  );

  const { formState, handleChange, handleSubmit } =
    useForm<DeleteAccountFormData>(initalState, mutate);

  return {
    formState,
    isSuccess,
    showDeleteAccountModal,
    handleChange,
    handleSubmit,
    toggleShowDeleteAccountModal,
    ...otherOptions,
  };
};
