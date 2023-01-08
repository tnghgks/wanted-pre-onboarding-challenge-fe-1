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
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" />
          <input type="text" defaultValue={toDoDetail.title} name="title" id="title" />
          <label htmlFor="content" />
          <input type="text" defaultValue={toDoDetail.content} name="content" id="content" />
          <button>수정완료</button>
        </form>
      ) : (
        !!Object.keys(toDoDetail).length && (
          <>
            <ModifyBtn onClick={handleModify}>수정</ModifyBtn>
            <DeleteBtn onClick={() => handleDelete(toDoDetail.id)}>삭제</DeleteBtn>
            <Title>{toDoDetail.title}</Title>
            <Content>{toDoDetail.content}</Content>
          </>
        )
      )}
    </Container>
  );
}
const Container = styled.section`
  width: 50%;
`;

const Title = styled.h3``;

const Content = styled.p``;

const ModifyBtn = styled.button``;

const DeleteBtn = styled.button``;
