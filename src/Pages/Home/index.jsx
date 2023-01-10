import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ToDoList from "./ToDoList/index";
import { getToDoList, createToDo } from "../../Services/toDo";
import { Container, Form, Header, LogoutBtn, ToDoContainer } from "./style";

export default function Home() {
  const [toDoList, setToDoList] = useState([]);
  const navigate = useNavigate();

  const getToDoData = async () => {
    const toDoList = await getToDoList();
    setToDoList(toDoList.reverse());
  };

  const handleCreateToDo = async (e) => {
    e.preventDefault();
    const { todoTitle, todoContent } = e.target;

    createToDo(todoTitle.value, todoContent.value);
    todoTitle.value = "";
    todoContent.value = "";
    getToDoData();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) navigate("/login");

    getToDoData();
  }, [navigate]);

  return (
    <Container>
      <Header>
        <Form onSubmit={handleCreateToDo}>
          <label htmlFor="todoTitle">투두 제목:</label>
          <input type="text" name="todoTitle" id="todoTitle" />
          <label htmlFor="todoContent">투두 내용:</label>
          <textarea name="todoContent" id="todoContent" />
          <button>투두 생성</button>
          <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
        </Form>
      </Header>
      <ToDoContainer>
        <ToDoList toDoList={toDoList} />
        <Outlet context={[getToDoData]} />
      </ToDoContainer>
    </Container>
  );
}
