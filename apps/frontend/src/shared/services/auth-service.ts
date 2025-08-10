import api from "@config/axios";
import { formObject } from "@shared-types/formData/form-object";
import { apiErrorHandler } from "@utils/api-error-handler";

export function authService(url: string) {
  const signInUser = async (formState: formObject<string>) => {
    return apiErrorHandler(() => api.post(`${url}/api/sign-in`, formState));
  };

  const signUpUser = async (formState: formObject<string>) => {
    return apiErrorHandler(() => api.post(`${url}/api/sign-up`, formState));
  };

  const logoutUser = async () => {
    return apiErrorHandler(() => api.post(`${url}/api/logout`));
  };

  const validateUser = async () => {
    return apiErrorHandler(() => api.get(`${url}/api/validate`));
  };

  return {
    logoutUser,
    signInUser,
    signUpUser,
    validateUser,
  };
}
