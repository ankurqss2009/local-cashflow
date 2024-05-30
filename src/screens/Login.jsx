import React, { useState } from "react";
import styled from "styled-components";
import { FormPasswordFormField, FormTextFormField } from "../elements";
import { useForm } from "react-hook-form";
import { Alert, Button, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
// import { theme } from '../utility';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseService } from "../utility";

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: white;
  height: 80vh;
`;

export const AuthBottomLink = styled.p`
  font-weight: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.colorWhite};
  font-size: 12px;
  margin-left: 90px;
`;

// Apply custom styles to input fields
const InputContainer = styled.div`
  width: 100%;
  max-width: 390px;
`;

const LoginSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Email Address is required")
    .email("Invalid email address"),
  password: yup.string().trim().required("Password is required"),
});

export const LoginScreen = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const submit = async (formData) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(
        FirebaseService.auth,
        formData.username,
        formData.password,
      );
      navigate("/rooms");
    } catch {
      setError("Invalid username and/or password");
    } finally {
      setLoading(false);
    }
  };

  const loginAsGuest = async () => {
    try {
      setLoading(true);
      await signInAnonymously(FirebaseService.auth);
      navigate("/rooms");
    } catch {
      setError("Invalid username and/or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(submit)}>
      <CenteredDiv>
        <h1>Sign in to your account</h1>
        <InputContainer>
          <FormTextFormField
            name="username"
            control={control}
            placeholder="Email Address"
            errors={errors?.username}
            defaultValue=""
            label="Email address"
          />
          <FormPasswordFormField
            control={control}
            name="password"
            placeholder="Password"
            label="Password"
            errors={errors?.password}
            defaultValue=""
          />
          {error && <Alert message={error} type="error" showIcon />}

          <Button type="primary" block htmlType="submit" loading={loading}>
            Login
          </Button>
          <Button
            // type="primary"
            block
            htmlType="button"
            style={{ margin: "1rem auto" }}
            loading={loading}
            onClick={loginAsGuest}
          >
            Login As Guest
          </Button>
          <AuthBottomLink className="small text-center">
            Don't have an account?{" "}
            <Link
              className="link-underline"
              to={`/register${window.location.search}`}
            >
              Sign up now!
            </Link>
          </AuthBottomLink>
        </InputContainer>
      </CenteredDiv>
    </Form>
  );
};
