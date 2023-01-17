import { AxiosError } from "axios";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../Api/api";
import { Container, Form, RegisterContainer, Title } from "./style";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const target = e.target as typeof e.target & {
        email: { value: string };
        password: { value: string };
      };
      const email = target.email.value;
      const password = target.password.value;

      try {
        const {
          data: { token, message },
        } = await axiosInstance.post("/users/create", { email, password });

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

  return (
    <Container>
      <RegisterContainer>
        <Title>회원가입 페이지</Title>
        <Link to="/login">로그인으로 돌아가기</Link>
        <Form onSubmit={handleRegister}>
          <input type="email" name="email" id="email" required />
          <input type="password" name="password" id="password" minLength={8} required />
          <button>회원가입</button>
        </Form>
      </RegisterContainer>
    </Container>
  );
}
