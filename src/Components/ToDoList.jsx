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
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 20%;
  color: white;
`;

const ToDoItem = styled.li`
  width: 100%;
  background-color: #ada2ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 700;
`;

const Content = styled.p`
  width: 80%;
  text-align: center;
  font-size: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
