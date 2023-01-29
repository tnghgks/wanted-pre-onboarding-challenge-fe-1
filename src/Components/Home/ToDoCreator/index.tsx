import useCreateToDo from "../../../Hooks/Mutation/ToDo/useCreateToDo";
import { Button, Form, Input, Textarea } from "./style";

interface IProps {
  ToggleOpenCreator: () => void;
}
interface IEventTarget extends EventTarget {
  todoTitle: HTMLInputElement;
  todoContent: HTMLInputElement;
}

export default function ToDoCreator({ ToggleOpenCreator }: IProps) {
  const { mutate: createToDoMutate } = useCreateToDo();

  const handleCreateToDo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as IEventTarget;
    const todoTitle = target.todoTitle;
    const todoContent = target.todoContent;

    createToDoMutate({ title: todoTitle.value, content: todoContent.value });
    todoTitle.value = "";
    todoContent.value = "";
    ToggleOpenCreator();
  };

  return (
    <Form onSubmit={handleCreateToDo}>
      <label htmlFor="todoTitle" className="ir_hidden">
        투두 제목
      </label>
      <Input type="text" name="todoTitle" id="todoTitle" placeholder="제목" required />
      <label htmlFor="todoContent" className="ir_hidden">
        투두 내용
      </label>
      <Textarea name="todoContent" id="todoContent" placeholder="내용" />
      <Button>생성</Button>
    </Form>
  );
}
