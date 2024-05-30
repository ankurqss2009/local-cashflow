/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useGame } from "../contexts";
import {
  BabyBox,
  BankruptBox,
  CashflowBox,
  CharityBox,
  ChooseDreamBox,
  DealBox,
  DealOfferBox,
  DoodadBox,
  DownsizedBox,
  EnterFastTrackBox,
  FastTrackDoodadBox,
  FastTrackStatement,
  FinishTurnBox,
  GameoverBox,
  LoseBox,
  MarketBox,
  OpportunityBox,
  OutOfRatRaceBox,
  OuterBox,
  RepayBox,
  Statement,
  StatementHeader,
  TakeALoanBox,
  TurnBox,
} from "../components";
import { GameStates } from "../utility/game";
import { Drawer } from "antd";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { playAudio } from "../utility";
import { AudioConstant } from "../audio";

const StatementContainer = styled.div`
  width: 20px;
  height: 220px;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  color: black;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;

  span {
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
`;

export const GameScreen = () => {
  const { user } = useAuth();

  const { id } = useParams();
  const {
    setRoomId,
    gameState,
    movePlayer,
    payExpenses,
    buyDeal,
    sellDeal,
    openDrawer,
    setOpenDrawer,
    finishTurn,
    dealDecision,
    currentPlayer,
    players,
    allOut,
    leaveTheLobby,
  } = useGame();

  const loggedInPlayer = useMemo(
    () => players.find((x) => x.id === user?.uid),
    [players, user],
  );

  useEffect(() => {
    setRoomId(id);
  }, []);

  return (
    <>
      <OuterBox players={players} />
      <StatementContainer
        onClick={() => {
          if (!openDrawer) {
            playAudio(AudioConstant.statementOpen);
          }
          setOpenDrawer(!openDrawer);
        }}
      >
        <span>Statement</span>
      </StatementContainer>
      <Drawer
        placement="left"
        onClose={() => {
          playAudio(AudioConstant.statementClose);
          setOpenDrawer(false);
        }}
        open={openDrawer}
        title={
          <StatementHeader
            leaveTheLobby={leaveTheLobby}
            loggedInPlayer={loggedInPlayer}
          />
        }
      >
        {loggedInPlayer?.fastTrack ? (
          <FastTrackStatement loggedInPlayer={loggedInPlayer} />
        ) : (
          <Statement loggedInPlayer={loggedInPlayer} />
        )}
      </Drawer>

      {allOut ? (
        <GameoverBox />
      ) : (
        <>
          {!currentPlayer?.dream ? (
            <ChooseDreamBox />
          ) : (
            <>
              {gameState === GameStates.turn && (
                <TurnBox
                  roll={(count) => movePlayer(count)}
                  pay={(expense) => payExpenses(gameState, expense)}
                />
              )}
              {gameState === GameStates.deal && <DealBox deal={dealDecision} />}
              {gameState === GameStates.doodad && (
                <DoodadBox pay={(expense) => payExpenses(gameState, expense)} />
              )}
              {gameState === GameStates.finishTurn && <FinishTurnBox />}
              {gameState === GameStates.downsized && (
                <DownsizedBox
                  pay={(expense) => payExpenses(gameState, expense)}
                />
              )}
              {gameState === GameStates.charity && (
                <CharityBox
                  pay={(expense) => payExpenses(gameState, expense)}
                />
              )}
              {gameState === GameStates.baby && (
                <BabyBox pay={(expense) => payExpenses(gameState, expense)} />
              )}
              {gameState === GameStates.market && (
                <MarketBox done={finishTurn} />
              )}
              {[GameStates.bigDeal, GameStates.smallDeal].includes(
                gameState
              ) && (
                <DealOfferBox buy={buyDeal} sell={sellDeal} done={finishTurn} />
              )}
              {gameState === GameStates.opportunity && <OpportunityBox />}
              {gameState === GameStates.cashflow && <CashflowBox />}
              {gameState === GameStates.ftDoodad && (
                <FastTrackDoodadBox
                  pay={(expense) => payExpenses(gameState, expense)}
                />
              )}
              {gameState === GameStates.takeALoan && <TakeALoanBox />}
              {gameState === GameStates.repay && <RepayBox />}
              {gameState === GameStates.bankrupt && <BankruptBox />}
              {gameState === GameStates.lose && <LoseBox />}
              {gameState === GameStates.outOfRatRace && <OutOfRatRaceBox />}
              {gameState === GameStates.enterFastTrack && <EnterFastTrackBox />}
            </>
          )}
        </>
      )}
    </>
  );
};
