import { axiosAuthInstance } from "../api";
import { IUpdateData } from "../../Types/toDo";

export const toDoApi = {
  getToDoList: () => axiosAuthInstance.get("/todos"),
  getToDoById: (id: string | undefined) => axiosAuthInstance.get(`/todos/${id}`),
  updateToDo: (id: string, updateData: IUpdateData) =>
    axiosAuthInstance.put(`/todos/${id}`, {
      title: updateData.titleValue,
      content: updateData.contentValue,
    }),
  createToDo: (title: string, content: string) =>
    axiosAuthInstance.post("/todos", {
      title,
      content,
    }),
  deleteToDo: (toDoId: string | undefined) => axiosAuthInstance.delete(`/todos/${toDoId}`),
};
