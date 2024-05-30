import { CustomModal } from "./Modal";
import { useGame } from "../contexts";
import { BoxContainer } from "./Common";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { currencyFormat } from "../utility";

export const WinnerBox = () => {
  const { currentPlayer, yourTurn } = useGame();

  return (
    <CustomModal>
      <BoxContainer>
        <h2>CONGRATULATIONS!</h2>
        <p>{currentPlayer?.name} IS THE WINNER!</p>
        <p>
          {currentPlayer?.name} wins the game by adding over $50,000 to their
          Cash Flow Day!
        </p>
        <p>Final</p>
        <p>Cash: {currencyFormat(currentPlayer?.cash)}</p>
        <p>Income: {currencyFormat(currentPlayer?.passiveIncome)}</p>
        {yourTurn && (
          <>
            <Link to="/rooms">
              <Button type="primary" block>
                Play Again
              </Button>
            </Link>
          </>
        )}
      </BoxContainer>
    </CustomModal>
  );
};
