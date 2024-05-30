import { CustomModal } from "./Modal";
import { Button } from "antd";
import { useGame } from "../contexts";
import { BoxContainer, ButtonRow } from "./Common";

export const CharityBox = ({ pay }) => {
  const { currentPlayer, yourTurn } = useGame();

  return (
    <CustomModal>
      <BoxContainer>
        <div>
          <h2>GIVE TO CHARITY</h2>
          <p>
            Donate 10% of your total income to roll 1 or 2 die over your next 3
            turns.
          </p>
        </div>
        {yourTurn && (
          <ButtonRow>
            <Button
              type="primary"
              block
              onClick={() =>
                pay({
                  name: "Charity",
                  cost: Math.floor(currentPlayer.totalIncome * 0.1),
                })
              }
            >
              Donate
            </Button>
            <Button type="primary" block onClick={() => pay(null)}>
              Pass
            </Button>
          </ButtonRow>
        )}
      </BoxContainer>
    </CustomModal>
  );
};
