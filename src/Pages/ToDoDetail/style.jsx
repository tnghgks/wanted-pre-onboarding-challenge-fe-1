import styled from "styled-components";

export const Container = styled.section`
  width: 80%;
  background-color: #fff8e1;
  padding: 20px;
`;
export const Header = styled.header`
  display: flex;
  width: 100%;
  gap: 5px;
  padding: 10px 0px;
  border-bottom: 3px solid #c0deff;
`;
export const Form = styled.form`
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

export const Title = styled.h3`
  width: 100%;
  font-size: 2rem;
  font-weight: 700;
`;

export const Content = styled.p`
  margin-top: 20px;
`;

export const ModifyBtn = styled.button`
  width: 50px;
`;

export const DeleteBtn = styled.button`
  width: 50px;
`;
