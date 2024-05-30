import { Button, Form } from "antd";
import React, { useMemo } from "react";
import styled from "styled-components";
import {
  FormDropdownFormField,
  FormPasswordFormField,
  FormTextFormField,
} from "../../elements";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ref, set } from "firebase/database";
import { FirebaseService, generateNewPlayer } from "../../utility";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

const CreateRoomSchema = yup.object().shape({
  password: yup.string().trim(),
  name: yup.string().trim().required("Name is required"),
  noOfPlayers: yup
    .number()
    .required("No of Player is required")
    .positive("Number should be positive")
    .max(6, "Number should be greater than 6"),
});

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: white;
  height: 100vh;
`;

const CustomP = styled.p`
  margin: 0.2rem 0;
  font-weight: 500;
`;
const InputContainer = styled.div`
  width: 100%;
  max-width: 390px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 40px;
`;

export const CreateRoomScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateRoomSchema),
    defaultValues: {
      noOfPlayers: 1,
    },
  });

  const options = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      name: i + 1,
      value: i + 1,
    }));
  }, []);

  const save = async (formData) => {
    const id = Date.now();
    await set(ref(FirebaseService.database, `rooms/${id}`), {
      ...formData,
      id,
      user: user.uid,
      players: [],
      createdAt: new Date().toISOString(),
    });
    await set(
      ref(FirebaseService.database, `rooms/${id}/players/${user.uid}`),
      generateNewPlayer(user, 0),
    );

    navigate(`/rooms/lobby/${id}`);
  };

  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit(save)}>
        <CenteredDiv>
          <h1>Set Up Your Party</h1>
          <CustomP>1. Change game name if desired.</CustomP>
          <CustomP>2. Set up a password if you want a private game.</CustomP>
          <CustomP>3. Press "Create Game" when you are ready.</CustomP>
          <InputContainer>
            <FormTextFormField
              control={control}
              name="name"
              placeholder="Name"
              errors={errors?.name}
              defaultValue=""
              label="Name"
              required
            />
            <FormPasswordFormField
              control={control}
              name="password"
              placeholder="Password"
              errors={errors?.password}
              defaultValue=""
              label="Password"
            />
            <FormDropdownFormField
              control={control}
              name="noOfPlayers"
              placeholder="No of Players"
              errors={errors?.noOfPlayers}
              defaultValue=""
              type="number"
              label="No of Players"
              required
              options={options}
            />
          </InputContainer>
          <ButtonContainer>
            <Button
              type="primary"
              danger
              ghost
              onClick={() => navigate("/rooms")}
            >
              Back
            </Button>
            <Button type="primary" htmlType="submit">
              Create Game
            </Button>
          </ButtonContainer>
        </CenteredDiv>
      </Form>
    </>
  );
};
