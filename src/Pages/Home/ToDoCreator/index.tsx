import { Form, LogoutBtn } from "./style";

interface IToDoCreator {
  handleCreateToDo: (e: React.FormEvent<HTMLFormElement>) => void;
  handleLogout: () => void;
}

export default function ToDoCreator({ handleCreateToDo, handleLogout }: IToDoCreator) {
  return (
    <Form onSubmit={handleCreateToDo}>
      <label htmlFor="todoTitle">투두 제목:</label>
      <input type="text" name="todoTitle" id="todoTitle" />
      <label htmlFor="todoContent">투두 내용:</label>
      <textarea name="todoContent" id="todoContent" />
      <button>투두 생성</button>
      <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
    </Form>
  );
}
