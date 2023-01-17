import { axiosInstance } from "../Api/api";

export const login = async (email: string, password: string) => {
  try {
    const {
      data: { token, message },
    } = await axiosInstance.post("/users/login", {
      email,
      password,
    });

    return { token, message };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};
