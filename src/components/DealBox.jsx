import { CustomModal } from "./Modal";
import { Button } from "antd";
import { GameStates } from "../utility";
import { BoxContainer, ButtonRow } from "./Common";
import { useGame } from "../contexts";

export const DealBox = ({ deal }) => {
  const { yourTurn } = useGame();

  return (
    <CustomModal>
      <BoxContainer>
        <div>
          <h2>DEAL OPPORTUNITY</h2>
          <h3>Which type of deal do you want?</h3>
          <p>
            Small deals cost $5,000 or less.
            <br />
            Big deals cost $6,000 or more.
          </p>
        </div>
        {yourTurn && (
          <ButtonRow>
            <Button
              type="primary"
              block
              onClick={() => deal(GameStates.smallDeal)}
            >
              Small
            </Button>
            <Button
              type="primary"
              block
              onClick={() => deal(GameStates.bigDeal)}
            >
              Big
            </Button>
          </ButtonRow>
        )}
      </BoxContainer>
    </CustomModal>
  );
};
