import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  background-color: #ada2ff;
  label {
    font-weight: 700;
    font-size: 1.5rem;
  }
`;
export const ToDoItem = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const Input = styled.input`
  border: none;
  border-radius: 10px;
  text-align: center;
  width: 100%;
  padding: 5px;
`;

export const Textarea = styled.textarea`
  border: none;
  border-radius: 10px;
  text-align: center;
  width: 100%;
  padding: 10px;
  font-weight: 700;
`;
export const Button = styled.button`
  padding: 5px;
  width: 100%;
`;
