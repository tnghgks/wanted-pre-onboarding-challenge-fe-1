import styled from "styled-components";

export const Container = styled.section`
  flex-basis: 70%;
  flex-grow: 0;
  overflow: hidden auto;
  background-color: #fff8e1;
  padding: 20px;
`;
export const Header = styled.header`
  display: flex;
  align-items: center;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Content = styled.p`
  width: 100%;
  margin-top: 20px;
  word-wrap: break-word;
`;
export const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
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
  height: 200px;
  padding: 10px;
  font-weight: 700;
`;
export const Button = styled.button`
  width: 50px;
`;
