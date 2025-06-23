import api from "@config/axios";
import { formObject } from "@shared-types/form-object";

export function authService(url: string) {
  const signInUser = async (formState: formObject) => {
    return api.post(`${url}/sign-in`, formState).catch((error) => {
      console.log(error.toJSON());
      throw new Error(error.message);
    });
  };

  const signUpUser = async (formState: formObject) => {
    return api.post(`${url}/sign-up`, formState).catch((error) => {
      console.log(error.toJSON());
      throw new Error(error.message);
    });
  };

  const logoutUser = async () => {
    return api.post(`${url}/logout`).catch((error) => {
      console.log(error.toJSON());
      throw new Error(error.message);
    });
  };

  const validateUser = async () => {
    return api.get(`${url}/validate`).catch((error) => {
      console.log(error.toJSON());
      throw new Error(error.message);
    });
  };

  return {
    logoutUser,
    signInUser,
    signUpUser,
    validateUser,
  };
}
