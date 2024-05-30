import styled from "styled-components";
import { CustomModal } from "./Modal";
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "antd";
import { useGame } from "../contexts";
import { BoxContainer } from "./Common";
import { DataClass, currencyFormat } from "../utility";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  font-size: 1.4em;
  font-weight: 700;
  margin: auto;
  padding: 0 10px;
`;

export const ChooseDreamBox = () => {
  const { currentPlayer, updatePlayer, yourTurn } = useGame();
  const [index, setIndex] = useState(0);

  const selectDream = async (dream) => {
    await updatePlayer({ dream }, currentPlayer?.id);
  };

  return (
    <CustomModal>
      <BoxContainer>
        <HeaderContainer>
          {yourTurn && (
            <CaretCircleLeft
              size={32}
              weight="fill"
              disabled={index === 0}
              onClick={() => index !== 0 && setIndex(index - 1)}
            />
          )}
          <Header>Choose your dream</Header>
          {yourTurn && (
            <CaretCircleRight
              size={32}
              weight="fill"
              disabled={index === DataClass.dreams.length - 1}
              onClick={() =>
                index !== DataClass.dreams.length - 1 && setIndex(index + 1)
              }
            />
          )}
        </HeaderContainer>
        <div>
          <h2>{DataClass.dreams[index]?.text}</h2>
          <p>{DataClass.dreams[index]?.description}</p>
        </div>
        {yourTurn && (
          <>
            <div>
              <p>You are a {currentPlayer?.jobTitle}</p>
              <p>
                Your starting salary is{" "}
                {currencyFormat(currentPlayer?.totalIncome)}
              </p>
              <p>
                You have {currencyFormat(currentPlayer?.cash)} in your savings.
              </p>
              <p>
                That means your starting cash is{" "}
                {currencyFormat(currentPlayer?.cash)}
              </p>
            </div>
            <div>
              <Button
                type="primary"
                block
                onClick={() => selectDream(DataClass.dreams[index]?.text)}
              >
                Select
              </Button>
            </div>
          </>
        )}
      </BoxContainer>
    </CustomModal>
  );
};
