import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, LoginContainer, Title } from "./style";
import ErrorMessage from "../Common/ErrorMessage";
import { useForm, SubmitHandler } from "react-hook-form";
import { authApi } from "../../Api/Auth/auth";
import { EMAIL_PATTERN } from "../../Constant/regex";

type FormValues = {
  email?: string;
  password?: string;
};

export default function Login() {
  const [apiError, setApiError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const navigate = useNavigate();

  const handleLogin: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data;
    if (typeof email === "string" && typeof password === "string") {
      try {
        const {
          data: { token, message },
        } = await authApi.login(email, password);

        alert(message);

        if (token) {
          localStorage.setItem("token", token);
          navigate("/");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setApiError(error.response?.data.details);
        }
      }
    }
  };

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
        <Form onSubmit={handleSubmit(handleLogin)}>
          <input
            type="email"
            placeholder="이메일 주소를 입력해주세요."
            {...register("email", {
              required: true,
              pattern: {
                value: EMAIL_PATTERN,
                message: "이메일은 @와 .을 포함해야 합니다.",
              },
            })}
          />
          {errors?.email?.message && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          <input
            type="password"
            placeholder="8자리 이상 패스워드를 입력해주세요."
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "8자 이상 입력해주세요.",
              },
            })}
          />
          {errors?.password?.message && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          {apiError && <ErrorMessage>{apiError}</ErrorMessage>}
          <button>로그인</button>
        </Form>
        <Link to="/register">회원가입</Link>
      </LoginContainer>
    </Container>
  );
}
