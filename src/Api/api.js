import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosAuthInstance = axios.create({
  baseURL: BASE_URL,
});

axiosAuthInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    config.headers.Authorization = token;
    return config;
  },
  (error) => new Promise.reject(error)
);
