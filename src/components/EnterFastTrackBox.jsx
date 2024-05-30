import { CustomModal } from "./Modal";
import { useGame } from "../contexts";
import { BoxContainer } from "./Common";
import { Button } from "antd";

export const EnterFastTrackBox = () => {
  const { currentPlayer, yourTurn, setupFastTrack } = useGame();

  return (
    <CustomModal>
      <BoxContainer>
        <h2>WELCOME TO THE FAST TRACK!!</h2>
        <p>{currentPlayer?.name} has entered the Fast Track.</p>
        <p>You receive 100x your passive income in cash. </p>
        <p>Increase your income by $50,000 to win the game.</p>
        {yourTurn && (
          <>
            <Button type="primary" block onClick={() => setupFastTrack()}>
              Ready
            </Button>
          </>
        )}
      </BoxContainer>
    </CustomModal>
  );
};
