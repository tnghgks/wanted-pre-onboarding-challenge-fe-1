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
  try {
    const {
      data: { data },
    } = await axiosAuthInstance.get(`/todos/${id}`);

    return data;
  } catch (error) {
    console.log(error);
    alert(error.response.data.details);
    return false;
  }
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

export const createToDo = async (e) => {
  e.preventDefault();
  const {
    todoTitle: { value: title },
    todoContent: { value: content },
  } = e.target;

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

export const DeleteToDo = async (toDoId) => {
  try {
    await axiosAuthInstance.delete(`/todos/${toDoId}`);
  } catch (error) {
    console.log(error);
    alert(error.response.data.details);
  }
};
