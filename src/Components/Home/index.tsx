import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ToDoList from "./ToDoList/index";
import { Container, CreateBtn, ToDoContainer } from "./style";
import useCreateToDo from "../../Hooks/Mutation/ToDo/useCreateToDo";
import ToDoCreator from "./ToDoCreator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import UserController from "./UserController";
import useGetToDoList from "../../Hooks/Queries/ToDo/useGetToDoList";

interface IEventTarget extends EventTarget {
  todoTitle: HTMLInputElement;
  todoContent: HTMLInputElement;
}

export default function Home() {
  const { isLoading, data: toDoList } = useGetToDoList();
  const [isOpenCreator, setIsOpenCreator] = useState(false);
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
    setIsOpenCreator(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container>
      <ToDoContainer>
        <UserController handleLogout={handleLogout} />
        <CreateBtn onClick={() => setIsOpenCreator((prev) => !prev)}>
          <FontAwesomeIcon icon={faSquarePlus} color="#61876E" size="2x" />
        </CreateBtn>
        {isOpenCreator ? <ToDoCreator handleCreateToDo={handleCreateToDo} handleLogout={handleLogout} /> : null}
        {isLoading ? "Loading" : <ToDoList toDoList={toDoList} />}
      </ToDoContainer>
      <Outlet />
    </Container>
  );
}
