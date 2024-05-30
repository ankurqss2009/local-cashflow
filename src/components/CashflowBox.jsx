import { CustomModal } from "./Modal";
import { Button } from "antd";
import { useGame } from "../contexts";
import { BoxContainer } from "./Common";
import { currencyFormat, playAudio } from "../utility";
import { AudioConstant } from "../audio";

export const CashflowBox = () => {
  const { currentPlayer, yourTurn, nextTurn } = useGame();

  return (
    <CustomModal>
      <BoxContainer>
        <div>
          <h2>CASHFLOW DAY!</h2>
          <p>Amount: {currencyFormat(currentPlayer?.cashFlowDay)}</p>
        </div>
        {yourTurn && (
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
        )}
      </BoxContainer>
    </CustomModal>
  );
};
