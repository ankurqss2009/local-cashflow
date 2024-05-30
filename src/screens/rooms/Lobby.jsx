/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Button, Input, List, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { FirebaseService, GameStates, generateNewPlayer } from "../../utility";
import { ref, update, remove } from "firebase/database";
import { useObjectVal, useListVals } from "react-firebase-hooks/database";
import {PlayerJobTypeIcon} from '../../utility'

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
const PositionContainer = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 40px;
`;

const ReadyButton = styled(Button)`
  &:disabled {
    color: #fff;
    opacity: 0.4;
  }
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin: 1rem auto;
`;

const StyledList = styled(List)`
  width: 40vw;

  .ant-list-header,
  .ant-empty-description {
    color: white;
    border-color: white;
  }

  .ant-list-item {
    color: white !important;
    border-color: white;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
  }
`;

const PlayerIcon= ({jobTitle})=>{
  let obj = PlayerJobTypeIcon.find(item => item.jobType === jobTitle)   
  return  <>{obj.icon}</>
}

export const LobbyRoomScreen = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [room] = useObjectVal(ref(FirebaseService.database, `rooms/${id}`));

  const [players, loading] = useListVals(
    ref(FirebaseService.database, `rooms/${id}/players`)
  );

  const currentPlayer = useMemo(
    () => players.find((x) => x.id === user?.uid),
    [players, user]
  );

  useEffect(() => {
    if (user?.uid) {
      setName(user.displayName || "Guest");
    }
  }, [user]);

  useEffect(() => {
    if (room?.ready) {
      navigate(`/game/${id}`);
    }
  }, [room]);

  const leave = async () => {
    await remove(
      ref(FirebaseService.database, `rooms/${id}/players/${user.uid}`)
    );
    navigate("/rooms");
  };

  const ready = async () => {
    let newObj = {
      name,
      ready: true,
    };
    if (!currentPlayer?.id) {
      const temp = generateNewPlayer(user, players.length);
      newObj = {
        ...temp,
        ...newObj,
      };
    }
    await update(
      ref(FirebaseService.database, `rooms/${id}/players/${user.uid}`),
      newObj
    );
  };

  const beginGame = async () => {
    await update(ref(FirebaseService.database, `rooms/${id}`), {
      currentTurn: user.uid,
      ready: true,
      gameState: GameStates.turn,
    });
  };

 

  return (
    <CenteredDiv>
      <h1>Lobby({room?.name})</h1>
      <CustomP>1. Change your name if desired.</CustomP>
      <CustomP>
        2. Wait for other players to join and confirm they are ready.
      </CustomP>
      <CustomP>3. Press "Begin Game".</CustomP>
      {!currentPlayer?.ready && (
        <FlexRow>
          <CustomP>Name</CustomP>
          <Input
            style={{ width: "100px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="primary" disabled={!name} onClick={ready}>
            Ready
          </Button>
        </FlexRow>
      )}
      <StyledList
        bordered
        loading={loading}
        dataSource={players}
        renderItem={(item, index) => (
          <List.Item>
            <PositionContainer>
            <PlayerIcon jobTitle={item.jobTitle}/>
            </PositionContainer>
            <Typography.Text style={{ color: "white", flex: 1 }}>
              {item.name} {item.ready ? "(Ready)" : "(Not Ready)"}
              &nbsp;
            </Typography.Text>
            {item.id === user.uid && room?.user !== user?.uid && (
              <Button ghost onClick={() => leave()}>
                Leave
              </Button>
            )}
          </List.Item>
        )}
        header={<b>Players</b>}
      />
      <ButtonContainer>
        <Button type="primary" danger ghost onClick={() => navigate("/rooms")}>
          Back
        </Button>
        <ReadyButton
          type="primary"
          disabled={
            players.length !== (room?.noOfPlayers || 0) ||
            players.some((x) => !x.ready) ||
            room?.user !== user?.uid
          }
          onClick={beginGame}
        >
          Begin Game
        </ReadyButton>
      </ButtonContainer>
    </CenteredDiv>
  );
};
