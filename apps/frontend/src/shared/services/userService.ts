import { ResetPasswordDto } from "@features/AuthPages/RecoveryPages/ResetPasswordPage/dto/reset-password-dto";
import { UserData } from "@shared-types/auth/user-data";
import { DeleteAccountFormData } from "@shared-types/formData/delete-account-form-data";
import { formObject } from "@shared-types/formData/form-object";
import { apiErrorHandler } from "@utils/apiErrorHandler";
import api from "@config/axios";

export function userService(url: string) {
  const deleteAccount = async (data: DeleteAccountFormData) => {
    return apiErrorHandler(() => api.delete(`${url}/delete-account`, { data }));
  };

  const getUserById = async (userId: number) => {
    return apiErrorHandler(() =>
      api.get<UserData>(`${url}/get-by-id`, { params: { userId } }),
    );
  };

  const getUsersByIds = (usersIds: number[]) => {
    return apiErrorHandler(() =>
      api.get<UserData[]>(`${url}/get-by-ids`, { params: { usersIds } }),
    );
  };

  const getUser = async () => {
    return apiErrorHandler(() => api.get<UserData>(`${url}/me`));
  };

  const updateUserData = async (data: FormData): Promise<UserData> => {
    return apiErrorHandler(() => api.patch<UserData>(`${url}/update`, data));
  };

  const recoveryUser = async (formState: formObject<string>) => {
    return apiErrorHandler(() =>
      api.post(`${url}/recovery-account`, formState),
    );
  };

  const requestResetPasswordUser = async (formState: formObject<string>) => {
    return apiErrorHandler(() =>
      api.post(`${url}/request-password-reset`, formState),
    );
  };

  const resetPassword = async ({
    newPassword,
    resetToken,
  }: ResetPasswordDto) => {
    return apiErrorHandler(() =>
      api.post(`${url}/reset-password`, { newPassword, resetToken }),
    );
  };

  const updateLanguageUser = async (languageCode: string) => {
    return apiErrorHandler(() =>
      api.patch(`${url}/update`, { languageCode: languageCode }),
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
