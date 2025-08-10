import { ResetPasswordDto } from "@features/AuthPages/RecoveryPages/ResetPasswordPage/dto/reset-password-dto";
import { UserData } from "@shared-types/auth/user-data";
import { DeleteAccountFormData } from "@shared-types/formData/delete-account-form-data";
import { formObject } from "@shared-types/formData/form-object";
import { apiErrorHandler } from "@utils/api-error-handler";
import api from "@config/axios";

export function userService(url: string) {
  const deleteAccount = async (data: DeleteAccountFormData) => {
    return apiErrorHandler(() =>
      api.delete(`${url}/api/delete-account`, { data })
    );
  };

  const getUserById = async (userId: number) => {
    return apiErrorHandler(() =>
      api.get<UserData>(`${url}/api/get-by-id`, { params: { userId } })
    );
  };

  const getUsersByIds = (usersIds: number[]) => {
    return apiErrorHandler(() =>
      api.get<UserData[]>(`${url}/api/get-by-ids`, { params: { usersIds } })
    );
  };

  const getUser = async () => {
    return apiErrorHandler(() => api.get<UserData>(`${url}/api/me`));
  };

  const updateUserData = async (data: FormData): Promise<UserData> => {
    return apiErrorHandler(() =>
      api.patch<UserData>(`${url}/api/update`, data)
    );
  };

  const recoveryUser = async (formState: formObject<string>) => {
    return apiErrorHandler(() =>
      api.post(`${url}/api/recovery-account`, formState)
    );
  };

  const requestResetPasswordUser = async (formState: formObject<string>) => {
    return apiErrorHandler(() =>
      api.post(`${url}/api/request-password-reset`, formState)
    );
  };

  const resetPassword = async ({
    newPassword,
    resetToken,
  }: ResetPasswordDto) => {
    return apiErrorHandler(() =>
      api.post(`${url}/api/reset-password`, { newPassword, resetToken })
    );
  };

  const updateLanguageUser = async (languageCode: string) => {
    return apiErrorHandler(() =>
      api.patch(`${url}/api/update`, { languageCode: languageCode })
    );
  };

  return {
    getUser,
    updateUserData,
    deleteAccount,
    recoveryUser,
    updateLanguageUser,
    requestResetPasswordUser,
    resetPassword,
    getUserById,
    getUsersByIds,
  };
}
