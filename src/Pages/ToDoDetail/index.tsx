import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Content, DeleteBtn, Form, Header, ModifyBtn, Title } from "./style";
import useGetToDoById from "../../Hooks/Queries/ToDo/useGetToDoById";
import useUpdateToDo from "../../Hooks/Mutation/ToDo/useUpdateToDo";
import useDeleteToDo from "../../Hooks/Mutation/ToDo/useDeleteToDo";

interface IEventTarget extends EventTarget {
  todoTitle: string;
  todoContent: string;
}

export default function ToDoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { isLoading, data: toDoDetail } = useGetToDoById(id);
  const { mutate: updateMutate } = useUpdateToDo();
  const { mutate: deleteMutate } = useDeleteToDo();

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as IEventTarget;
    const titleValue = target.todoTitle;
    const contentValue = target.todoContent;

    updateMutate({ id, updateData: { titleValue, contentValue } });

    setIsEditing(false);
  };

  const handleDelete = async (id: string) => {
    deleteMutate(id);
    navigate("/");
  };

  return (
    <Container>
      {toDoDetail ? (
        isEditing ? (
          <Form onSubmit={handleSubmit}>
            <button>수정완료</button>
            <button onClick={toggleEditing}>수정취소</button>
            <div>
              <label htmlFor="title">제목 :</label>
              <input type="text" defaultValue={toDoDetail.title} name="title" id="title" />
            </div>
            <div>
              <label htmlFor="content">내용 :</label>
              <textarea defaultValue={toDoDetail.content} name="content" id="content" />
            </div>
          </Form>
        ) : isLoading ? (
          "LOADING..."
        ) : (
          !!Object.keys(toDoDetail).length && (
            <>
              <Header>
                <Title>{toDoDetail.title}</Title>
                <ModifyBtn onClick={toggleEditing}>수정</ModifyBtn>
                <DeleteBtn onClick={() => handleDelete(toDoDetail.id)}>삭제</DeleteBtn>
              </Header>
              <Content>{toDoDetail.content}</Content>
            </>
          )
        )
      ) : null}
    </Container>
  );
}
