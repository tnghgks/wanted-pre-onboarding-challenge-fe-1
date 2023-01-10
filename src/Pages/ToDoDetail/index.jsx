import { useCallback, useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { getToDoById, updateToDo, DeleteToDo } from "../../Services/toDo";
import { Container, Content, DeleteBtn, Form, Header, ModifyBtn, Title } from "./style";

export default function ToDoDetail() {
  const [toDoDetail, setToDoDetail] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [getToDoData] = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const getToDoDetail = useCallback(async () => {
    const data = await getToDoById(id);

    if (!data) {
      navigate("/");
    }
    setToDoDetail(data);
  }, [id, navigate]);

  const handleModify = () => {
    setIsEditing(true);
  };

  const cancelModify = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title: { value: titleValue },
      content: { value: contentValue },
    } = e.target;
    const data = await updateToDo(id, { titleValue, contentValue });

    setToDoDetail(data);
    getToDoData();
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    DeleteToDo(id);
    getToDoData();
    navigate("/");
  };

  useEffect(() => {
    getToDoDetail();
  }, [getToDoDetail]);

  return (
    <Container>
      {isEditing ? (
        <Form onSubmit={handleSubmit}>
          <button>수정완료</button>
          <button onClick={cancelModify}>수정취소</button>
          <div>
            <label htmlFor="title">제목 :</label>
            <input type="text" defaultValue={toDoDetail.title} name="title" id="title" />
          </div>
          <div>
            <label htmlFor="content">내용 :</label>
            <textarea defaultValue={toDoDetail.content} name="content" id="content" />
          </div>
        </Form>
      ) : (
        !!Object.keys(toDoDetail).length && (
          <>
            <Header>
              <Title>{toDoDetail.title}</Title>
              <ModifyBtn onClick={handleModify}>수정</ModifyBtn>
              <DeleteBtn onClick={() => handleDelete(toDoDetail.id)}>삭제</DeleteBtn>
            </Header>
            <Content>{toDoDetail.content}</Content>
          </>
        )
      )}
    </Container>
  );
}
