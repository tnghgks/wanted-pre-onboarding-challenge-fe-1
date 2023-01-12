import { axiosAuthInstance } from "../Api/api";

export const getToDoList = async () => {
  try {
    const {
      data: { data },
    } = await axiosAuthInstance.get("/todos");

    return data;
  } catch (error) {
    console.log(error);
    alert(error.response.data.details);
  }
};
export const getToDoById = async (id) => {
  const {
    data: { data },
  } = await axiosAuthInstance.get(`/todos/${id}`);

  return data;
};

export const updateToDo = async (id, updateData) => {
  try {
    const {
      data: { data },
    } = await axiosAuthInstance.put(`/todos/${id}`, {
      title: updateData.titleValue,
      content: updateData.contentValue,
    });
    return data;
  } catch (error) {
    console.log(error);
    alert(error.response.data.details);
  }
};

export const createToDo = async (title, content) => {
  try {
    await axiosAuthInstance.post("/todos", {
      title,
      content,
    });
  } catch (error) {
    console.log(error);
    alert(error.response.data.details);
  }
};

export const deleteToDo = async (toDoId) => {
  try {
    await axiosAuthInstance.delete(`/todos/${toDoId}`);
  } catch (error) {
    console.log(error);
    alert(error.response.data.details);
  }
};
