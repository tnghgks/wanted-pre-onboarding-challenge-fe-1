import { axiosInstance } from "../Api/api";

export const login = async (email, password) => {
  try {
    const {
      data: { token, message },
    } = await axiosInstance.post("/users/login", {
      email,
      password,
    });

    return { token, message };
  } catch (error) {
    console.log(error);
    alert(error.response.data.details);
  }
};
