import api from "@config/axios";
import { formObject } from "@shared-types/formData/form-object";
import { apiErrorHandler } from "@utils/api-error-handler";

export function authService(url: string) {
  const signInUser = async (formState: formObject<string>) => {
    return apiErrorHandler(() => api.post(`${url}/sign-in`, formState));
  };

  const signUpUser = async (formState: formObject<string>) => {
    return apiErrorHandler(() => api.post(`${url}/sign-up`, formState));
  };

  const logoutUser = async () => {
    return apiErrorHandler(() => api.post(`${url}/logout`));
  };

  const validateUser = async () => {
    return apiErrorHandler(() => api.get(`${url}/validate`));
  };

  return {
    logoutUser,
    signInUser,
    signUpUser,
    validateUser,
  };
}
