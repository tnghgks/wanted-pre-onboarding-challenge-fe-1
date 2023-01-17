import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosAuthInstance = axios.create({
  baseURL: BASE_URL,
});

axiosAuthInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {};
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosAuthInstance.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
