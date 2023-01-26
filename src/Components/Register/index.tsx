import { AxiosError } from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../Api/Auth/auth";
import { EMAIL_PATTERN } from "../../Constant/regex";
import ErrorMessage from "../Common/ErrorMessage";
import { Container, Form, RegisterContainer, Title } from "./style";

type FormValues = {
  email?: string;
  password?: string;
  passwordCheck?: string;
};

export default function Register() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const handleRegister: SubmitHandler<FormValues> = async (data) => {
    const { email, password, passwordCheck } = data;

    if (!(password === passwordCheck)) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    if (typeof email === "string" && typeof password === "string") {
      try {
        const {
          data: { token, message },
        } = await authApi.signUp(email, password);
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

  return (
    <Container>
      <RegisterContainer>
        <Title>회원가입 페이지</Title>
        <Link to="/login">로그인으로 돌아가기</Link>
        <Form onSubmit={handleSubmit(handleRegister)}>
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
          <input
            type="password"
            placeholder="패스워드를 동일하게 입력해주세요."
            {...register("passwordCheck", {
              required: true,
              minLength: {
                value: 8,
                message: "8자 이상 입력해주세요.",
              },
            })}
          />
          {errors?.passwordCheck?.message && <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>}
          {apiError && <ErrorMessage>{apiError}</ErrorMessage>}
          <button>회원가입</button>
        </Form>
      </RegisterContainer>
    </Container>
  );
}
