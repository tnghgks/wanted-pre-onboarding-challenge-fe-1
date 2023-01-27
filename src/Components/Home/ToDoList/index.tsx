import { Link } from "react-router-dom";
import { Container, Title, ToDoItem } from "./styled";
import { IToDo } from "../../../Types/toDo";

interface IProps {
  toDoList: IToDo[] | undefined;
}

export default function ToDoList({ toDoList }: IProps) {
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
