import api from "@config/axios";
import { ServiceNames } from "@enums/serviceNames";
import { TokenValidatingStatus } from "@shared-types/token-validating-status";
import {
  changeAuthLoading,
  changeIsAuthenticated,
} from "@stores/user/userSlice";
import { delay } from "@utils/delay";
import { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { store } from "@stores/store";

let isRefreshing = false;

const retryValidate = async (
  countRetries: number,
  delayTime: number,
  isSuccess?: () => void,
  isError?: () => void
): Promise<TokenValidatingStatus> => {
  let validationStatus = TokenValidatingStatus.IN_PROCESS;

  for (let i = 0; i < countRetries; i++) {
    try {
      await api.post(`${ServiceNames.AUTH}/refresh`);
      validationStatus = TokenValidatingStatus.SUCCESS;
      break;
    } catch {
      if (i < countRetries - 1) {
        await delay(delayTime);
      }
    }
  }

  if (validationStatus === TokenValidatingStatus.IN_PROCESS) {
    validationStatus = TokenValidatingStatus.FAIL;
  }

  switch (validationStatus) {
    case TokenValidatingStatus.SUCCESS:
      isSuccess?.();
      break;
    case TokenValidatingStatus.FAIL:
      isError?.();
      break;
  }

  return validationStatus;
};

const setRefreshingStatus = () => {
  store.dispatch(changeAuthLoading(true));
};

const setSuccessRefresh = () => {
  store.dispatch(changeIsAuthenticated(true));
  store.dispatch(changeAuthLoading(false));
};

const setFailureRefresh = () => {
  store.dispatch(changeIsAuthenticated(false));
  store.dispatch(changeAuthLoading(false));
};

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes(`${ServiceNames.AUTH}/refresh`) ||
      isRefreshing
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      setRefreshingStatus();

      const validationStatus = await retryValidate(
        1,
        1000,
        setSuccessRefresh,
        setFailureRefresh
      );

      if (validationStatus === TokenValidatingStatus.SUCCESS) {
        return api(originalRequest);
      } else {
        return Promise.reject(error);
      }
    } catch (refreshError) {
      setFailureRefresh();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
