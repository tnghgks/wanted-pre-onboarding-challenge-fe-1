import styled from "styled-components";

export const Container = styled.section`
  width: 800px;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 100px auto;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 20px;
  border-radius: 20px;
`;
export const ToDoContainer = styled.div`
  flex-grow: 1;
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const CreateBtn = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  &:hover {
    transition: 0.3s;
    transform: scale(1.2);
  }
`;
