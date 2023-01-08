import React, { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../../Services/auth";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      const {
        email: { value: email },
        password: { value: password },
      } = e.target;

      try {
        const { token, message } = await login(email, password);

        alert(message);

        if (token) {
          localStorage.setItem("token", JSON.stringify(token));
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.details);
      }
    },
    [navigate]
  );

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container>
      <h2>로그인 페이지</h2>
      <Form onSubmit={handleLogin}>
        <input placeholder="이메일을 입력해주세요." type="email" name="email" id="email" required />
        <input placeholder="비밀번호를 입력해주세요." type="password" name="password" id="password" minLength="8" required />
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
