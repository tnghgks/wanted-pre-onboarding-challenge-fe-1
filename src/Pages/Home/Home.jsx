import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ToDoDetail from "../../Components/ToDoDetail";
import ToDoList from "../../Components/ToDoList";
import { getToDoList, createToDo, DeleteToDo } from "../../Services/toDo";

export default function Home() {
  const [toDoDetail, setToDoDetail] = useState({});
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

  const handleDeleteToDo = async (toDoId) => {
    DeleteToDo(toDoId);
    setToDoDetail("");
    getToDoData();
  };

  const selectToDo = (todo) => {
    setToDoDetail(todo);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) navigate("/login");

    getToDoData();
  }, []);

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
        <ToDoList toDoList={toDoList} handleDeleteToDo={handleDeleteToDo} selectToDo={selectToDo} />
        <ToDoDetail handleDeleteToDo={handleDeleteToDo} toDoDetail={toDoDetail} setToDoDetail={setToDoDetail} getToDoData={getToDoData}></ToDoDetail>
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
