import { CustomModal } from "./Modal";
import { Button } from "antd";
import { BoxContainer, ButtonRow } from "./Common";
import { Link } from "react-router-dom";

export const GameoverBox = () => {
  return (
    <CustomModal>
      <BoxContainer>
        <h2>GAME OVER</h2>
        <p>EVERYONE IN THE GAME HAS GONE BANKRUPT.</p>

        <ButtonRow>
          <Link to="/rooms">
            <Button type="primary" block>
              Play Again
            </Button>
          </Link>
        </ButtonRow>
      </BoxContainer>
    </CustomModal>
  );
};
