import styled from "styled-components";

export const Container = styled.main`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const LoginContainer = styled.div`
  width: 800px;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 0px;
  gap: 10px;
  input {
    font-size: 1.3rem;
    padding: 5px;
  }
  button {
    font-size: 1.3rem;
    font-weight: 700;
  }
`;
