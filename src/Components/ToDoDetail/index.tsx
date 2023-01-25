import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BtnContainer, Button, Container, Content, Form, Header, Input, Textarea, Title } from "./style";
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
            <Header>
              <label htmlFor="title" className="ir_hidden">
                제목
              </label>
              <Input type="text" defaultValue={toDoDetail.title} name="title" id="title" placeholder="제목" required />
              <BtnContainer>
                <Button>수정</Button>
                <Button onClick={toggleEditing}>취소</Button>
              </BtnContainer>
            </Header>
            <label htmlFor="content" className="ir_hidden">
              내용
            </label>
            <Textarea defaultValue={toDoDetail.content} name="content" id="content" placeholder="내용" />
          </Form>
        ) : isLoading ? (
          "LOADING..."
        ) : (
          !!Object.keys(toDoDetail).length && (
            <>
              <Header>
                <Title>{toDoDetail.title}</Title>
                <BtnContainer>
                  <Button onClick={toggleEditing}>수정</Button>
                  <Button onClick={() => handleDelete(toDoDetail.id)}>삭제</Button>
                </BtnContainer>
              </Header>
              <Content>{toDoDetail.content}</Content>
            </>
          )
        )
      ) : null}
    </Container>
  );
}
