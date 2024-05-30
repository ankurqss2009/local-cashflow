import { CustomModal } from "./Modal";
import { Button } from "antd";
import { currencyFormat } from "../utility";
import { useMemo } from "react";
import { useGame } from "../contexts";
import { BoxContainer } from "./Common";

export const BabyBox = ({ pay }) => {
  const { currentPlayer, yourTurn } = useGame();

  const expense = useMemo(() => {
    if (currentPlayer?.children > 2) {
      return 0;
    }
    return Math.floor(currentPlayer.totalIncome * 0.056);
  }, [currentPlayer]);

  return (
    <CustomModal>
      <BoxContainer>
        <div>
          <h2>NEW BABY!</h2>
          <p>Congratulations! One child has been added to your dependents</p>
          <h3>Child Expenses will be increased by {currencyFormat(expense)}</h3>
        </div>
        {yourTurn && (
          <div>
            <Button
              type="primary"
              block
              onClick={() =>
                pay(expense > 0 ? { name: "New Baby", cost: expense } : null)
              }
            >
              Done
            </Button>
          </div>
        )}
      </BoxContainer>
    </CustomModal>
  );
};
