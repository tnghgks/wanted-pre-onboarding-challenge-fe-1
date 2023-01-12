import { Link } from "react-router-dom";
import { Container, Content, Title, ToDoItem } from "./styled";

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
