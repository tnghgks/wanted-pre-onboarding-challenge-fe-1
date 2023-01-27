import { Button, Form, Input, Textarea } from "./style";

interface IProps {
  handleCreateToDo: (e: React.FormEvent<HTMLFormElement>) => void;
  handleLogout: () => void;
}

export default function ToDoCreator({ handleCreateToDo, handleLogout }: IProps) {
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
