/* eslint-disable react-hooks/exhaustive-deps */
import { CustomModal } from "./Modal";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { currencyFormat, isNotEmpty, playAudio } from "../utility";
import { BoxContainer, ButtonRow } from "./Common";
import { useGame } from "../contexts";
import { AudioConstant } from "../audio";

const OpportunityPoints = (type) => [
  {
    text: "Cost",
    key: "cost",
    currency: true,
  },
  {
    text: "Cashflow",
    currency: true,
    key: "cashFlow",
  },
];

export const OpportunityBox = () => {
  const { currentPlayer, yourTurn, room, finishTurn, buyOpportunity } =
    useGame();

  const [opportunity, setOpportunity] = useState(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (opportunity?.type) {
      const tempPoints = [];
      OpportunityPoints(opportunity.type).forEach((item) => {
        if (isNotEmpty(opportunity[item.key])) {
          tempPoints.push({
            text: item.text,
            value: item.currency
              ? currencyFormat(opportunity[item.key])
              : opportunity[item.key],
          });
        }
      });
      setPoints(tempPoints);
    }
  }, [opportunity]);

  useEffect(() => {
    setOpportunity(room?.ftBox || {});
  }, [room]);

  const buyClick = () => {
    buyOpportunity({
      ...opportunity,
      id: Math.random(),
    });
  };

  return (
    <CustomModal>
      <BoxContainer>
        <div>
          <h2>{opportunity?.name}</h2>
          <p>{opportunity?.description}</p>
          {points.map((item) => (
            <p key={item.text}>
              {item.text}: {item.value}
            </p>
          ))}
        </div>
        {yourTurn && (
          <ButtonRow>
            <Button
              type="primary"
              block
              disabled={(currentPlayer?.cash || 0) < (opportunity?.cost || 0)}
              onClick={() =>
                (currentPlayer?.cash || 0) > (opportunity?.cost || 0) &&
                buyClick()
              }
            >
              Buy
            </Button>
            <Button
              type="primary"
              block
              onClick={() => {
                playAudio(AudioConstant.human);
                finishTurn();
              }}
            >
              Pass
            </Button>
          </ButtonRow>
        )}
      </BoxContainer>
    </CustomModal>
  );
};
