import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  width: 100%;
  height: 50px;
  background-color: #c0deff;
  display: flex;
  justify-content: center;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-left: 10px;
  label {
    font-weight: 700;
    font-size: 1.5rem;
  }
`;

export const LogoutBtn = styled.button`
  margin-left: auto;
  margin-right: 10px;
`;

export const ToDoContainer = styled.div`
  display: flex;
`;
