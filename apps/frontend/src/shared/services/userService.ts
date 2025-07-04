import api from "@config/axios";
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

  return {
    getUser,
    updateUserData,
    deleteAccount,
    recoveryUser,
  };
}
