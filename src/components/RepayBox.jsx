import { CustomModal } from "./Modal";
import { Button, InputNumber } from "antd";
import { LiabilityConstant, currencyFormat, playAudio } from "../utility";
import { BoxContainer, ButtonRow } from "./Common";
import { useMemo, useState } from "react";
import { useGame } from "../contexts";
import { AudioConstant } from "../audio";

export const RepayBox = () => {
  const { selectedRow, finishTurn, currentPlayer, yourTurn, payoffLoan } =
    useGame();

  const [customValue, setCustomValue] = useState(1000);
  const showConfirm = useMemo(() => {
    if (selectedRow?.key === LiabilityConstant.loans) {
      return true;
    }
    return currentPlayer?.cash > selectedRow?.value;
  }, [selectedRow, currentPlayer]);

  const disabledConfirm = useMemo(() => {
    if (selectedRow?.key === LiabilityConstant.loans) {
      return customValue > currentPlayer.cash;
    }
    return false;
  }, [selectedRow, currentPlayer, customValue]);

  return (
    <CustomModal>
      <BoxContainer>
        <h2>PAY OFF LOAN</h2>
        {selectedRow?.id ? (
          <>
            <p>
              Pay off {selectedRow.name} for {currencyFormat(selectedRow.value)}
            </p>
            {selectedRow.key === LiabilityConstant.loans ? (
              <>
                <p>
                  Input an amount to repay your loan Payments must be in
                  multiples of $1,000
                </p>
                <div>
                  <InputNumber
                    addonBefore={
                      <span onClick={() => setCustomValue(customValue + 1000)}>
                        +
                      </span>
                    }
                    addonAfter={
                      <span
                        onClick={() =>
                          customValue > 2000 &&
                          setCustomValue(customValue - 1000)
                        }
                      >
                        -
                      </span>
                    }
                    controls={false}
                    min={1000}
                    max={currentPlayer?.cash}
                    value={customValue}
                    onChange={setCustomValue}
                  />
                </div>
              </>
            ) : (
              <>
                {showConfirm ? (
                  <p>Are you sure?</p>
                ) : (
                  <p>You do not have enough cash to pay off this loan</p>
                )}
              </>
            )}
          </>
        ) : (
          <p>Select a liability on your statement sheet to repay your debt.</p>
        )}

        {yourTurn && (
          <ButtonRow>
            {showConfirm && (
              <Button
                type="primary"
                block
                disabled={disabledConfirm}
                onClick={() =>
                  !disabledConfirm &&
                  payoffLoan(
                    selectedRow,
                    selectedRow?.key === LiabilityConstant.loans
                      ? customValue
                      : null,
                  )
                }
              >
                Confirm
              </Button>
            )}
            <Button
              danger
              type="primary"
              block
              onClick={() => {
                playAudio(AudioConstant.human);
                finishTurn();
              }}
            >
              Cancel
            </Button>
          </ButtonRow>
        )}
      </BoxContainer>
    </CustomModal>
  );
};
