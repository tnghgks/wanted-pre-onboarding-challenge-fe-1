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
