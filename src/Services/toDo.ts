import { axiosAuthInstance } from "../Api/api";
import { IUpdateData } from "../Types/toDo";

export const getToDoList = async () => {
  try {
    const {
      data: { data },
    } = await axiosAuthInstance.get("/todos");

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};
export const getToDoById = async (id: string) => {
  const {
    data: { data },
  } = await axiosAuthInstance.get(`/todos/${id}`);

  return data;
};

export const updateToDo = async (id: string, updateData: IUpdateData) => {
  try {
    const {
      data: { data },
    } = await axiosAuthInstance.put(`/todos/${id}`, {
      title: updateData.titleValue,
      content: updateData.contentValue,
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

export const createToDo = async (title: string, content: string) => {
  try {
    await axiosAuthInstance.post("/todos", {
      title,
      content,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

export const deleteToDo = async (toDoId: string) => {
  try {
    await axiosAuthInstance.delete(`/todos/${toDoId}`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};
