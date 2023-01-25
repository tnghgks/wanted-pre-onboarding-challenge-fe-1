import { Link } from "react-router-dom";
import { Container, Title, ToDoItem } from "./styled";
import { IToDoList } from "../../../Types/toDo";

export default function ToDoList({ toDoList }: IToDoList) {
  return (
    <Container>
      {toDoList?.map((toDo) => (
        <Link to={`/${toDo.id}`} key={toDo.id}>
          <ToDoItem>
            <Title>{toDo.title}</Title>
          </ToDoItem>
        </Link>
      ))}
    </Container>
  );
}
