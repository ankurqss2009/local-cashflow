import { CustomModal } from "./Modal";
import { Button } from "antd";
import { currencyFormat } from "../utility";
import { useGame } from "../contexts";
import { useMemo } from "react";
import { BoxContainer } from "./Common";

export const DownsizedBox = ({ pay }) => {
  const { turnData, currentPlayer, yourTurn } = useGame();

  const amount = useMemo(
    () => turnData?.cost || currentPlayer?.totalExpenses,
    [turnData, currentPlayer],
  );

  return (
    <CustomModal>
      <BoxContainer>
        <div>
          <h2>DOWNSIZED!</h2>
          <p>Pay a full set of your expenses</p>
          <p>Pay: {currencyFormat(amount)}</p>
        </div>
        {yourTurn && (
          <div>
            <Button
              type="primary"
              block
              onClick={() => pay({ name: "Downsized", cost: amount })}
            >
              PAY
            </Button>
          </div>
        )}
      </BoxContainer>
    </CustomModal>
  );
};
