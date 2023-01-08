import { useState } from "react";
import styled from "styled-components";
import { axiosAuthInstance } from "../Api/api";

export default function ToDoDetail({ DeleteToDo, toDoDetail, setToDoDetail, getToDoList }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleModify = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title: { value: titleValue },
      content: { value: contentValue },
    } = e.target;

    const {
      data: { data },
    } = await axiosAuthInstance.put(`/todos/${toDoDetail.id}`, {
      title: titleValue,
      content: contentValue,
    });
    setToDoDetail(data);
    getToDoList();
    setIsEditing(false);
  };

  return (
    <Container>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" />
          <input type="text" defaultValue={toDoDetail.title} name="title" id="title" />
          <label htmlFor="content" />
          <input type="text" defaultValue={toDoDetail.content} name="content" id="content" />
          <button>수정완료</button>
        </form>
      ) : (
        !!Object.keys(toDoDetail).length && (
          <>
            <ModifyBtn onClick={handleModify}>수정</ModifyBtn>
            <DeleteBtn onClick={() => DeleteToDo(toDoDetail.id)}>삭제</DeleteBtn>
            <Title>{toDoDetail.title}</Title>
            <Content>{toDoDetail.content}</Content>
          </>
        )
      )}
    </Container>
  );
}
const Container = styled.section`
  width: 50%;
`;

const Title = styled.h3``;

const Content = styled.p``;

const ModifyBtn = styled.button``;

const DeleteBtn = styled.button``;
