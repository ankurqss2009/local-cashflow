import { CustomModal } from "./Modal";
import { Button } from "antd";
import { useGame } from "../contexts";
import { BoxContainer, ButtonRow } from "./Common";
import { AudioConstant } from "../audio";
import { playAudio } from "../utility";

export const FinishTurnBox = () => {
  const { repay, borrow, yourTurn, nextTurn, currentPlayer } = useGame();

  return (
    <CustomModal>
      <BoxContainer>
        <div>
          <h2>FINISH {yourTurn ? "YOU" : `${currentPlayer?.name}`} TURN</h2>
          <p>
            Before you end your turn, review your financial statement. You may
            also use this time to repay liabilities or borrow money.
          </p>
        </div>
        {yourTurn && (
          <>
            <ButtonRow>
              <Button onClick={() => repay()} block type="primary">
                Repay
              </Button>
              <Button type="primary" block onClick={() => borrow()}>
                Borrow
              </Button>
            </ButtonRow>
            <div>
              <Button
                type="primary"
                block
                onClick={() => {
                  playAudio(AudioConstant.human);
                  nextTurn();
                }}
              >
                End Turn
              </Button>
            </div>
          </>
        )}
      </BoxContainer>
    </CustomModal>
  );
};
