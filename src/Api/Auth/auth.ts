import { axiosInstance } from "../api";

export const authApi = {
  login: (email: string, password: string) =>
    axiosInstance.post("/users/login", {
      email,
      password,
    }),
  signUp: (email: string, password: string) => axiosInstance.post("/users/create", { email, password }),
};
