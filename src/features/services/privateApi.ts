import axios, { InternalAxiosRequestConfig } from "axios";

const BASE_URL =
  import.meta.env.VITE_APP_ENV === "prod"
    ? (import.meta.env.VITE_PROD_BASEURL as string)
    : (import.meta.env.VITE_DEV_BASEURL as string);

const privateApi = axios.create({
  baseURL: BASE_URL,
});

// request interceptor
privateApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      window.location.href = "/login";
    }

    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

export default privateApi;
