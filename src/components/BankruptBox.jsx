/* eslint-disable react-hooks/exhaustive-deps */
import { CustomModal } from "./Modal";
import { Button } from "antd";
import { currencyFormat } from "../utility";
import { BoxContainer, ButtonRow } from "./Common";
import { useGame } from "../contexts";
import { useEffect } from "react";

export const BankruptBox = () => {
  const {
    selectedRow,
    yourTurn,
    currentPlayer,
    updateHighlightAssets,
    acceptOffer,
  } = useGame();

  useEffect(() => {
    if (yourTurn) {
      const temp = {};
      (currentPlayer.realEstateAssets || []).forEach((x) => {
        temp[x.id] = "highlighed";
      });
      updateHighlightAssets(temp);
    }
  }, [currentPlayer, yourTurn]);

  return (
    <CustomModal>
      <BoxContainer>
        <h2>{yourTurn ? "YOU ARE" : `${currentPlayer?.name} IS`} BANKRUPT!</h2>
        <p>Sell assets for 1/2 the down payment.</p>
        <p>Pay off debt.</p>
        <p>Pay down your loan amount.</p>

        {selectedRow?.id ? (
          <>
            <p>
              Sell {selectedRow.name} for{" "}
              {currencyFormat((selectedRow.downPayment || 0) / 2)}
            </p>
          </>
        ) : (
          <p>Select a asset on your statement sheet to repay your debt.</p>
        )}

        {yourTurn && (
          <ButtonRow>
            <Button
              type="primary"
              block
              disabled={!selectedRow?.name}
              onClick={() =>
                selectedRow?.name &&
                acceptOffer(selectedRow, (selectedRow.downPayment || 0) / 2)
              }
            >
              Confirm
            </Button>
          </ButtonRow>
        )}
      </BoxContainer>
    </CustomModal>
  );
};
