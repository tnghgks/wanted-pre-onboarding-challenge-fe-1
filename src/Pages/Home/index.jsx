import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ToDoList from "./ToDoList/index";
import { getToDoList, createToDo } from "../../Services/toDo";
import { Container, Form, Header, LogoutBtn, ToDoContainer } from "./style";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function Home() {
  const queryClient = useQueryClient();
  const { isLoading, data: toDoList } = useQuery("todos", getToDoList);
  const createToDoMutate = useMutation(
    ({ title, content }) => {
      createToDo(title, content);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );
  const navigate = useNavigate();

  const handleCreateToDo = async (e) => {
    e.preventDefault();
    const { todoTitle, todoContent } = e.target;

    createToDoMutate.mutate({ title: todoTitle.value, content: todoContent.value });
    todoTitle.value = "";
    todoContent.value = "";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
