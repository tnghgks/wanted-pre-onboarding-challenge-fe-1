import { AxiosError } from "axios";
import React, { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInput } from "../../Hooks/useInput";
import { validateEmail, validatePassword } from "../../Policy/inputValidate";
import { login } from "../../Services/auth";
import { Container, Form, LoginContainer, Title } from "./style";
import { ILogin } from "../../Types/auth";

export default function Login() {
  const { value: email, onChange: emailOnChange } = useInput("", validateEmail);
  const { value: password, onChange: passwordOnChange } = useInput("", validatePassword);
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        email: { value: string };
        password: { value: string };
      };
      const email = target.email.value;
      const password = target.password.value;

      try {
        const { token, message } = (await login(email, password)) as ILogin;
        console.log(token);
        alert(message);

        if (token) {
          localStorage.setItem("token", token);
          navigate("/");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
        }
      }
    },
    [navigate]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container>
      <LoginContainer>
        <Title>로그인 페이지</Title>
        <Form onSubmit={handleLogin}>
          <input placeholder="이메일을 입력해주세요." value={email} type="email" name="email" id="email" onChange={emailOnChange} required />
          <input placeholder="비밀번호를 입력해주세요." value={password} type="password" name="password" id="password" minLength={8} onChange={passwordOnChange} required />
          <button>로그인</button>
        </Form>
        <Link to="/register">회원가입</Link>
      </LoginContainer>
    </Container>
  );
}
