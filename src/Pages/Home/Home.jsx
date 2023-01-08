import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { axiosAuthInstance } from "../../Api/api";
import ToDoDetail from "../../Components/ToDoDetail";
import ToDoList from "../../Components/ToDoList";

export default function Home() {
  const [toDoDetail, setToDoDetail] = useState({});
  const [toDoList, setToDoList] = useState([]);
  const navigate = useNavigate();

  const getToDoList = async () => {
    try {
      const {
        data: { data },
      } = await axiosAuthInstance.get("/todos");

      setToDoList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createToDo = async (e) => {
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

      getToDoList();
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteToDo = async (toDoId) => {
    try {
      await axiosAuthInstance.delete(`/todos/${toDoId}`);

      getToDoList();
    } catch (error) {
      console.log(error);
    }
  };

  // const ModifyBtn = async (toDoId) => {
  //   try {
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const selectToDo = (todo) => {
    setToDoDetail(todo);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) navigate("/login");

    getToDoList();
  }, []);

  return (
    <Container>
      <form onSubmit={createToDo}>
        <label htmlFor="todoTitle">투두 제목:</label>
        <input type="text" name="todoTitle" id="todoTitle" />
        <label htmlFor="todoContent">투두 내용:</label>
        <input type="text" name="todoContent" id="todoContent" />
        <button>투두 생성</button>
      </form>
      <ToDoContainer>
        <ToDoList toDoList={toDoList} DeleteToDo={DeleteToDo} selectToDo={selectToDo} />
        <ToDoDetail DeleteToDo={DeleteToDo} toDoDetail={toDoDetail} setToDoDetail={setToDoDetail} getToDoList={getToDoList}></ToDoDetail>
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
