import axios, { AxiosRequestHeaders } from "axios";
import { BASE_URL } from "../utils/utils";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// добавить обработку null
api.interceptors.request.use(
  async (config) => {
    const tokensStr = localStorage.getItem("tokens");
    let tokens = null;
    if (tokensStr) {
      try {
        tokens = JSON.parse(tokensStr);
      } catch (e) {
        console.error("Failed to parse tokens from localStorage", e);
      }
    }

    if (tokensStr) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${tokens.access}`,
      } as any;
    }

    if (config.data instanceof FormData) {
      config.headers = {
        ...config.headers,
        "Content-Type": "multipart/form-data",
      } as AxiosRequestHeaders;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
