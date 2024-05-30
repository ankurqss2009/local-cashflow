import { Alert, Button, Form } from "antd";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { FormPasswordFormField, FormTextFormField } from "../elements";
import styled from "styled-components";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { CommonConstant, FirebaseService } from "../utility";
import { useState } from "react";

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: white;
  height: 100vh;
`;

// Apply custom styles to input fields
const InputContainer = styled.div`
  width: 100%;
  max-width: 390px;
`;

export const AuthBottomLink = styled.p`
  font-weight: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.colorWhite};
  font-size: 12px;
  margin-left: 90px;
`;

const AlertContainer = styled(Alert)`
  margin-bottom: 1rem;
`;

const RegisterSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Email address is required")
    .matches(CommonConstant.emailRegex, "Invalid email address"),
  newPassword: yup
    .string()
    .trim()
    .required("New Password is required")
    .matches(
      /(?=.*[0-9a-zA-Z]).{6,}/,
      "Password should have minimum 6 letter, alteast one capital letter, alteast one number, one lowercase letter and special character ",
    ),
  confirmPassword: yup
    .string()
    .trim()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword"), ""], "Passwords must match"),
  name: yup.string().trim().required("Name is required"),
});

export const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (formData) => {
    try {
      setLoading(true);
      const user = await createUserWithEmailAndPassword(
        FirebaseService.auth,
        formData.username,
        formData.newPassword,
      );
      await updateProfile(user.user, { displayName: formData.name });
      navigate("/rooms");
    } catch (error) {
      if (error.message.includes("auth/email-already-in-use")) {
        setError(
          "This email address is already registered. Please use a different email address.",
        );
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit(submit)}>
        <CenteredDiv>
          <h1>Let’s create your account</h1>
          {/* {error && <OnPageMessage message={error} type="error" />} */}
          <InputContainer>
            <FormTextFormField
              control={control}
              name="username"
              placeholder="Your Email Address"
              errors={errors?.username}
              defaultValue=""
              label="Email address"
              required
            />
            <FormTextFormField
              control={control}
              name="name"
              placeholder="Your Name"
              errors={errors?.name}
              defaultValue=""
              label="Name"
              required
            />
            <FormPasswordFormField
              control={control}
              name="newPassword"
              placeholder="Your Password"
              errors={errors?.newPassword}
              defaultValue=""
              label="New password"
              //   tooltip={Strings.password}
              required
            />
            <FormPasswordFormField
              control={control}
              name="confirmPassword"
              placeholder="Your Password"
              errors={errors?.confirmPassword}
              label="Confirm new password"
              defaultValue=""
            />
            {error && <AlertContainer message={error} type="error" showIcon />}

            <Button type="primary" block htmlType="submit" loading={loading}>
              Register
            </Button>
            <AuthBottomLink className="small text-center">
              Already have an account?{" "}
              <Link className="link-underline" to="/login">
                Log In
              </Link>
            </AuthBottomLink>
          </InputContainer>
        </CenteredDiv>
      </Form>
    </>
  );
};
