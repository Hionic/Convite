import axios, { AxiosHeaders } from "axios";
import type { AxiosInstance } from "axios";
import { getToken } from "./firebase";

const config = useRuntimeConfig();

const api: AxiosInstance = axios.create({
  baseURL: config.public.baseUrl,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();

  const headers = new AxiosHeaders(config.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return {
    ...config,
    headers,
  };
});

export default api;
