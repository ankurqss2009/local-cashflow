import { CustomModal } from "./Modal";
import { useGame } from "../contexts";
import { BoxContainer } from "./Common";
import { Button } from "antd";
import { GameStates, playAudio } from "../utility";
import { AudioConstant } from "../audio";

export const OutOfRatRaceBox = () => {
  const { currentPlayer, yourTurn, updateRoom } = useGame();

  const enterFastTrack = async () => {
    playAudio(AudioConstant.enterFT);
    await updateRoom({ gameState: GameStates.enterFastTrack });
  };

  return (
    <CustomModal>
      <BoxContainer>
        <h2>CONGRATULATIONS!</h2>
        <p>YOU ARE OUT OF THE RAT RACE!</p>

        <p>
          {currentPlayer?.name} has built up their passive income to be greater
          than their total expenses and may now enter the Fast Track.
        </p>
        <p>
          If you enter, you will receive 100x your passive income in cash and
          race to increase your CASHFLOW DAY income by $50,000 to win the game.
        </p>
        {yourTurn && (
          <>
            <Button type="primary" block onClick={() => enterFastTrack()}>
              Enter Fast Track
            </Button>
          </>
        )}
      </BoxContainer>
    </CustomModal>
  );
};
