import styled from "styled-components";

export default function ToDoList({ toDoList, handleDeleteToDo, selectToDo }) {
  return (
    <Container>
      {toDoList.map((toDo) => (
        <ToDoItem key={toDo.id} onClick={() => selectToDo(toDo)}>
          <Title>{toDo.title}</Title>
          <Content>{toDo.content}</Content>
          <DeleteBtn onClick={() => handleDeleteToDo(toDo.id)}>삭제</DeleteBtn>
        </ToDoItem>
      ))}
    </Container>
  );
}
const Container = styled.ul`
  width: 50%;
`;

const ToDoItem = styled.li``;

const Title = styled.h3``;

const Content = styled.p``;

const DeleteBtn = styled.button``;
