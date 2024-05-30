import styled from "styled-components";
import { CustomModal } from "./Modal";
import { Button, InputNumber } from "antd";
import { GameStates, currencyFormat } from "../utility";
import { BoxContainer, ButtonRow } from "./Common";
import { useMemo, useState } from "react";
import { useGame } from "../contexts";

const InputBox = styled(InputNumber)`
  .ant-input-number-group-addon {
    padding: 0;
  }
  .up-down {
    padding: 11px;
    cursor: pointer;
  }
`;

export const TakeALoanBox = () => {
  const { turnData, currentPlayer, loanDecision, yourTurn } = useGame();

  const [customValue, setCustomValue] = useState(1000);

  const amount = useMemo(() => {
    const val = (turnData?.cost || 0) - (currentPlayer.cash || 0);
    if (val < 1000) {
      return 1000;
    }
    return Math.ceil(val / 1000) * 1000;
  }, [turnData, currentPlayer]);

  return (
    <CustomModal>
      <BoxContainer>
        <div>
          <h2>TAKE OUT A LOAN</h2>
          {turnData?.gameState === GameStates.finishTurn ? (
            <>
              <p>
                Loans must be in multiples of $1000 at 10% interest per month.
              </p>
              <div>
                <InputBox
                  addonAfter={
                    <div
                      className="up-down"
                      onClick={() => setCustomValue(customValue + 1000)}
                    >
                      +
                    </div>
                  }
                  addonBefore={
                    <div
                      className="up-down"
                      onClick={() =>
                        customValue > 1000 && setCustomValue(customValue - 1000)
                      }
                    >
                      -
                    </div>
                  }
                  controls={false}
                  min={1000}
                  value={customValue}
                  onChange={setCustomValue}
                />
              </div>
            </>
          ) : (
            <>
              <p>Not enough funds.</p>
              <p>
                Take out a loan of {currencyFormat(amount)} with a monthly
                payment of {currencyFormat(amount * 0.1)}
              </p>
            </>
          )}
        </div>
        {yourTurn && (
          <>
            {turnData?.gameState === GameStates.finishTurn ? (
              <ButtonRow>
                <Button
                  type="primary"
                  block
                  onClick={() => loanDecision(customValue)}
                >
                  Borrow
                </Button>
                <Button
                  type="primary"
                  danger
                  block
                  onClick={() => loanDecision(null)}
                >
                  Cancel
                </Button>
              </ButtonRow>
            ) : (
              <ButtonRow>
                <Button
                  type="primary"
                  block
                  onClick={() => loanDecision(amount)}
                >
                  Yes
                </Button>
                {[
                  GameStates.doodad,
                  GameStates.downsized,
                  GameStates.baby,
                ].includes() && (
                  <Button
                    type="primary"
                    danger
                    block
                    onClick={() => loanDecision(null)}
                  >
                    No
                  </Button>
                )}
              </ButtonRow>
            )}
          </>
        )}
      </BoxContainer>
    </CustomModal>
  );
};
