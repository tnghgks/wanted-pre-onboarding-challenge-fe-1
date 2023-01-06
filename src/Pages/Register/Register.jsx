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
    }
  }, []);

  return (
    <Container>
      <h2>회원가입 페이지</h2>
      <Link to="/login">로그인으로 돌아가기</Link>
      <Form onSubmit={handleRegister}>
        <input type="email" name="email" id="email" />
        <input type="password" name="password" id="password" />
        <button>회원가입</button>
      </Form>
    </Container>
  );
}

const Container = styled.section`
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
