import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ToDoList from "./ToDoList/index";
import { Container, CreateBtn, ToDoContainer } from "./style";
import ToDoCreator from "./ToDoCreator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import UserController from "./UserController";
import useGetToDoList from "../../Hooks/Queries/ToDo/useGetToDoList";

export default function Home() {
  const { isLoading, data: toDoList } = useGetToDoList();
  const [isOpenCreator, setIsOpenCreator] = useState(false);

  const ToggleOpenCreator = () => {
    setIsOpenCreator((prev) => !prev);
  };

  return (
    <Container>
      <ToDoContainer>
        <UserController />
        <CreateBtn onClick={() => setIsOpenCreator((prev) => !prev)}>
          <FontAwesomeIcon icon={faSquarePlus} color="#61876E" size="2x" />
        </CreateBtn>
        {isOpenCreator ? <ToDoCreator ToggleOpenCreator={ToggleOpenCreator} /> : null}
        {isLoading ? "Loading" : <ToDoList toDoList={toDoList} />}
      </ToDoContainer>
      <Outlet />
    </Container>
  );
}
