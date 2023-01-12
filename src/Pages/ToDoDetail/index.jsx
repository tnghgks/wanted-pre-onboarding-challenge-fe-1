import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getToDoById, updateToDo, deleteToDo } from "../../Services/toDo";
import { Container, Content, DeleteBtn, Form, Header, ModifyBtn, Title } from "./style";

export default function ToDoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const invalidateQueries = {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      queryClient.invalidateQueries("todoDetail");
    },
  };
  const { isLoading, data: toDoDetail } = useQuery(["todoDetail", id], () => getToDoById(id), {
    retry: false,
    onError: () => {
      alert("해당 ToDo를 찾을 수 없습니다.");
      navigate("/");
    },
  });

  const updateMutate = useMutation(({ id, updateData }) => {
    updateToDo(id, updateData);
  }, invalidateQueries);

  const deleteMutate = useMutation((id) => {
    deleteToDo(id);
  }, invalidateQueries);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title: { value: titleValue },
      content: { value: contentValue },
    } = e.target;

    updateMutate.mutate({ id, updateData: { titleValue, contentValue } });

    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    deleteMutate.mutate(id);
    navigate("/");
  };

  return (
    <Container>
      {isEditing ? (
        <Form onSubmit={handleSubmit}>
          <button>수정완료</button>
          <button onClick={toggleEditing}>수정취소</button>
          <div>
            <label htmlFor="title">제목 :</label>
            <input type="text" defaultValue={toDoDetail.title} name="title" id="title" />
          </div>
          <div>
            <label htmlFor="content">내용 :</label>
            <textarea defaultValue={toDoDetail.content} name="content" id="content" />
          </div>
        </Form>
      ) : isLoading ? (
        "LOADING..."
      ) : (
        !!Object.keys(toDoDetail).length && (
          <>
            <Header>
              <Title>{toDoDetail.title}</Title>
              <ModifyBtn onClick={toggleEditing}>수정</ModifyBtn>
              <DeleteBtn onClick={() => handleDelete(toDoDetail.id)}>삭제</DeleteBtn>
            </Header>
            <Content>{toDoDetail.content}</Content>
          </>
        )
      )}
    </Container>
  );
}
