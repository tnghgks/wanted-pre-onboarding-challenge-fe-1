import { useCallback, useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getToDoById, updateToDo, DeleteToDo } from "../../Services/toDo";

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
const Container = styled.section`
  width: 80%;
  background-color: #fff8e1;
  padding: 20px;
`;
const Header = styled.header`
  display: flex;
  width: 100%;
  gap: 5px;
  padding: 10px 0px;
  border-bottom: 3px solid #c0deff;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  div {
    display: flex;
    align-items: center;
    gap: 20px;
    input {
      width: 90%;
    }
    textarea {
      width: 90%;
    }
  }
`;

const Title = styled.h3`
  width: 100%;
  font-size: 2rem;
  font-weight: 700;
`;

const Content = styled.p`
  margin-top: 20px;
`;

const ModifyBtn = styled.button`
  width: 50px;
`;

const DeleteBtn = styled.button`
  width: 50px;
`;
