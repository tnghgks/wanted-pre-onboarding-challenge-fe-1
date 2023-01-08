import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ToDoList({ toDoList }) {
  return (
    <Container>
      {toDoList.map((toDo) => (
        <Link to={`/${toDo.id}`} key={toDo.id}>
          <ToDoItem>
            <Title>{toDo.title}</Title>
            <Content>{toDo.content}</Content>
          </ToDoItem>
        </Link>
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
