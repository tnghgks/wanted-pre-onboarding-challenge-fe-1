import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ToDoList from "../../Components/ToDoList";
import { getToDoList, createToDo } from "../../Services/toDo";

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
        </Form>
      </Header>
      <ToDoContainer>
        <ToDoList toDoList={toDoList} />
        <Outlet context={[getToDoData]} />
      </ToDoContainer>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  width: 100%;
  height: 50px;
  background-color: #c0deff;
  display: flex;
  justify-content: center;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  label {
    font-weight: 700;
    font-size: 1.5rem;
  }
`;
const ToDoContainer = styled.div`
  display: flex;
`;
