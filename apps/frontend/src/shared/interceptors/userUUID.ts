import api from "@config/axios";
import { getUserUUID } from "@utils/getUserUUID";

api.interceptors.request.use((config) => {
  config.headers["Device-ID"] = getUserUUID();
  return config;
});
