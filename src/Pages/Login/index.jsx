import React, { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInput } from "../../Hooks/useInput";
import { validateEmail, validatePassword } from "../../Policy/inputValidate";
import { login } from "../../Services/auth";
import { Container, Form, LoginContainer, Title } from "./style";

export default function Login() {
  const [email, emailOnChange] = useInput("", validateEmail);
  const [password, passwordOnChange] = useInput("", validatePassword);
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
      <LoginContainer>
        <Title>로그인 페이지</Title>
        <Form onSubmit={handleLogin}>
          <input placeholder="이메일을 입력해주세요." value={email} type="email" name="email" id="email" onChange={emailOnChange} required />
          <input placeholder="비밀번호를 입력해주세요." value={password} type="password" name="password" id="password" minLength="8" onChange={passwordOnChange} required />
          <button>로그인</button>
        </Form>
        <Link to="/register">회원가입</Link>
      </LoginContainer>
    </Container>
  );
}
