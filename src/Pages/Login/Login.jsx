import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { axiosInstance } from "../../Api/api";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    const {
      email: { value: email },
      password: { value: password },
    } = e.target;

    try {
      const {
        data: { token, message },
      } = await axiosInstance.post("/users/login", { email, password });

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
      <h2>로그인 페이지</h2>
      <Form onSubmit={handleLogin}>
        <input type="email" name="email" id="email" />
        <input type="password" name="password" id="password" />
        <button>로그인</button>
      </Form>
      <Link to="/register">회원가입</Link>
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
