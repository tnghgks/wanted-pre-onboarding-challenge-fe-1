import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ToDoList from "./ToDoList/index";
import { getToDoList } from "../../Services/toDo";
import { Container, Header, ToDoContainer } from "./style";
import { useQuery } from "react-query";
import useCreateToDo from "../../Hooks/Mutation/ToDo/useCreateToDo";
import ToDoCreator from "./ToDoCreator";

interface IEventTarget extends EventTarget {
  todoTitle: HTMLInputElement;
  todoContent: HTMLInputElement;
}

export default function Home() {
  const { isLoading, data: toDoList } = useQuery("todos", getToDoList);
  const { mutate: createToDoMutate } = useCreateToDo();
  const navigate = useNavigate();

  const handleCreateToDo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as IEventTarget;
    const todoTitle = target.todoTitle;
    const todoContent = target.todoContent;

    createToDoMutate({ title: todoTitle.value, content: todoContent.value });
    todoTitle.value = "";
    todoContent.value = "";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container>
      <ToDoContainer>
        <Header>
          <ToDoCreator handleCreateToDo={handleCreateToDo} handleLogout={handleLogout} />
        </Header>
        {isLoading ? (
          "Loading"
        ) : (
          <>
            <ToDoList toDoList={toDoList} />
            <Outlet />
          </>
        )}
      </ToDoContainer>
    </Container>
  );
}
