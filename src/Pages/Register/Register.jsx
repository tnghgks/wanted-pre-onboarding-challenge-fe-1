import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { axiosInstance } from "../../Api/api";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = useCallback(async (e) => {
    e.preventDefault();
    const {
      email: { value: email },
      password: { value: password },
    } = e.target;

    try {
      const {
        data: { token, message },
      } = await axiosInstance.post("/users/create", { email, password });

      alert(message);

      if (token) {
        localStorage.setItem("token", JSON.stringify(token));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.details);
    }
  }, []);

  return (
    <Container>
      <RegisterContainer>
        <Title>회원가입 페이지</Title>
        <Link to="/login">로그인으로 돌아가기</Link>
        <Form onSubmit={handleRegister}>
          <input type="email" name="email" id="email" required />
          <input type="password" name="password" id="password" minLength="8" required />
          <button>회원가입</button>
        </Form>
      </RegisterContainer>
    </Container>
  );
}

const Container = styled.section`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fff8e1;
`;
const RegisterContainer = styled.div`
  background-color: #c0deff;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
`;
const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 0px;
  gap: 10px;
`;
