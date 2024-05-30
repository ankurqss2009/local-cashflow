import { CustomModal } from "./Modal";
import { useGame } from "../contexts";
import { Button } from "antd";
import { BoxContainer, ButtonRow } from "./Common";
import { Link } from "react-router-dom";
import { playAudio } from "../utility";
import { AudioConstant } from "../audio";

export const LoseBox = () => {
  const { nextTurn, yourTurn } = useGame();

  return (
    <CustomModal>
      <BoxContainer>
        <h2>YOU LOSE!</h2>
        <p>
          You are unable to afford your debt. You are officially out of the
          game.
        </p>

        {yourTurn && (
          <ButtonRow>
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
            <Link to="/rooms">
              <Button type="primary" block>
                Play Again
              </Button>
            </Link>
          </ButtonRow>
        )}
      </BoxContainer>
    </CustomModal>
  );
};
