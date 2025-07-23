import api from "@config/axios";
import { ResetPasswordDto } from "@features/AuthPages/RecoveryPages/ResetPasswordPage/dto/reset-password-dto";
import { DeleteAccountFormData } from "@shared-types/delete-account-form-data";
import { formObject } from "@shared-types/form-object";
import { UserData } from "@shared-types/user-data";

export function userService(url: string) {
  const deleteAccount = async (data: DeleteAccountFormData) => {
    return api.delete(`${url}/delete-account`, { data }).catch((error) => {
      console.log(error.toJSON());
      throw new Error(error.message);
    });
  };

  const getUserById = async (userId: number) => {
    return api
      .get(`${url}/get-by-id`, { params: { userId } })
      .catch((error) => {
        console.log(error.toJSON());
        throw new Error(error.message);
      });
  };

  const getUsersByIds = async (usersIds: number[]) => {
    return api
      .get(`${url}/get-by-ids`, { params: { usersIds } })
      .catch((error) => {
        console.log(error.toJSON());
        throw new Error(error.message);
      });
  };

  const getUser = async () => {
    return api.get(`${url}/me`).catch((error) => {
      console.log(error.toJSON());
      throw new Error(error.message);
    });
  };

  const updateUserData = async (data: FormData): Promise<UserData> => {
    const response = await api
      .patch<UserData>(`${url}/update`, data)
      .catch((error) => {
        console.log(error.toJSON());
        throw new Error(error.message);
      });
    return response.data;
  };

  const recoveryUser = async (formState: formObject<string>) => {
    return api.post(`${url}/recovery-account`, formState).catch((error) => {
      console.log(error.toJSON());
      throw new Error(error.message);
    });
  };

  const requestResetPasswordUser = async (formState: formObject<string>) => {
    return api
      .post(`${url}/request-password-reset`, formState)
      .catch((error) => {
        console.log(error.toJSON());
        throw new Error(error.message);
      });
  };

  const resetPassword = async (resetPasswordDto: ResetPasswordDto) => {
    const { newPassword, resetToken } = resetPasswordDto;
    return api
      .post(`${url}/reset-password`, { newPassword, resetToken })
      .catch((error) => {
        console.log(error.toJSON());
        throw new Error(error.message);
      });
  };

  const updateLanguageUser = async (languageCode: string) => {
    return api
      .patch(`${url}/update`, { languageCode: languageCode })
      .catch((error) => {
        console.log(error.toJSON());
        throw new Error(error.message);
      });
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
