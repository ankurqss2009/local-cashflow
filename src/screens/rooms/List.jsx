import React, { useMemo, useState } from "react";
import { List, Typography, Button, Modal, Input, message } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ref } from "firebase/database";
import { DataClass, FirebaseService } from "../../utility";
import { useListVals } from "react-firebase-hooks/database";

const { Password } = Input;

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: blanchedalmond;
  height: 80vh;
  color: white;
`;

const StyledList = styled(List)`
  width: 40vw;
  overflow-y: auto;

  .ant-list-header,
  .ant-empty-description {
    color: white;
    border-color: white;
  }

  .ant-list-item {
    color: white !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-color: white;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

export const RoomListScreen = () => {
  const navigate = useNavigate();
  const [rooms, loading] = useListVals(ref(FirebaseService.database, "rooms"));
  const filteredRooms = useMemo(
    () =>
      rooms
        .filter(
          (x) =>
            !x.completed &&
            Object.keys(x.players || {}).length > 0 &&
            !Object.values(x.players || {}).every((x) => x.lose || x.left),
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [rooms],
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [room, setRoom] = useState(null);
  const [password, setPassword] = useState("");

  const redirect = (room) => {
    if (room.ready) {
      navigate(`/game/${room.id}`);
    } else {
      navigate(`lobby/${room.id}`);
    }
  };

  const handleJoinClick = (room) => {
    if (room.password) {
      setRoom({ ...room });
      setModalVisible(true);
    } else {
      redirect(room);
    }
  };

  const handleOk = () => {
    if (room && room.password === password) {
      setModalVisible(false);
      setPassword("");
      redirect(room);
    } else {
      message.error("Invalid Password");
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setPassword("");
  };

  return (
    <CenteredDiv>
      <h1>Select a Game</h1>
      <StyledList
        bordered
        loading={loading}
        dataSource={filteredRooms}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text style={{ color: "white" }}>
              [{Object.keys(item.players || {}).length}/{item.noOfPlayers}]
              &nbsp;
            </Typography.Text>
            <span style={{ flex: 1 }}>
              &nbsp;{`${item.name}`} &nbsp; {item.ready && "[Started]"}
            </span>
            {(item.ready ||
              Object.keys(item.players || {}).length < item.noOfPlayers) && (
              <Button ghost onClick={() => handleJoinClick(item)}>
                {item.ready ? "View" : "Join"}
              </Button>
            )}
          </List.Item>
        )}
        header={
          <HeaderWrapper>
            <div>Create New Rooms</div>
            <Button type="primary" onClick={() => navigate("create")}>
              Create a Room
            </Button>
          </HeaderWrapper>
        }
      />
      <Modal
        title={`Enter Password for ${room ? room.name : ""}`}
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Modal>
    </CenteredDiv>
  );
};
