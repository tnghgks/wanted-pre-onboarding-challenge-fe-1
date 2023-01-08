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
    setToDoList(toDoList);
  };

  const handleCreateToDo = async (e) => {
    createToDo(e);
    getToDoData();
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) navigate("/login");

    getToDoData();
  }, [navigate]);

  return (
    <Container>
      <form onSubmit={handleCreateToDo}>
        <label htmlFor="todoTitle">투두 제목:</label>
        <input type="text" name="todoTitle" id="todoTitle" />
        <label htmlFor="todoContent">투두 내용:</label>
        <input type="text" name="todoContent" id="todoContent" />
        <button>투두 생성</button>
      </form>
      <ToDoContainer>
        <ToDoList toDoList={toDoList} />
        <Outlet context={[getToDoData]} />
      </ToDoContainer>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;
const ToDoContainer = styled.div`
  display: flex;
`;
