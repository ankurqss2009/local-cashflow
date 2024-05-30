/* eslint-disable react-hooks/exhaustive-deps */
import { CustomModal } from "./Modal";
import { Button, InputNumber } from "antd";
import { useEffect, useState } from "react";
import {
  DealTypes,
  currencyFormat,
  getRandomDeal,
  isNotEmpty,
  playAudio,
} from "../utility";
import { BoxContainer, ButtonRow } from "./Common";
import { useGame } from "../contexts";
import { AudioConstant } from "../audio";

const DealPoints = (type) => [
  {
    text: "Cost",
    key: "cost",
    currency: true,
  },
  {
    text: "Cost",
    key: "price",
    currency: true,
  },
  {
    text: "Trading range",
    key: "range",
  },
  {
    text: [DealTypes.stock, DealTypes.mf].includes(type)
      ? "Dividend"
      : "Cashflow",
    currency: true,
    key: "cashFlow",
  },
  {
    currency: true,
    text: "Mortgage",
    key: "mortgage",
  },
  {
    text: "Down Payment",
    currency: true,
    key: "downPayment",
  },
  {
    currency: true,
    text: "Liability",
    key: "liability",
  },
];

const Mode = {
  buy: "buy",
  sell: "sell",
};

export const DealOfferBox = ({ buy, sell, done }) => {
  const { currentPlayer, gameState, turnData, yourTurn, updateRoom, room } =
    useGame();

  const [deal, setDeal] = useState(null);
  const [ownedStock, setOwnedStock] = useState(null);
  const [points, setPoints] = useState([]);
  const [mode, setMode] = useState("");
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (deal?.type) {
      const tempPoints = [];
      DealPoints(deal.type).forEach((item) => {
        if (isNotEmpty(deal[item.key])) {
          tempPoints.push({
            text: item.text,
            value: item.currency
              ? currencyFormat(deal[item.key])
              : deal[item.key],
          });
        }
      });

      switch (deal.type) {
        case DealTypes.stock:
        case DealTypes.mf:
        case DealTypes.preferredStock:
        case DealTypes.certificateOfDeposit:
          if (isNotEmpty(deal.dividend)) {
            if (deal.dividend) {
              tempPoints.push({
                text: "Dividend",
                value: currencyFormat(deal.dividend),
              });
            } else {
              tempPoints.push({
                text: "Dividend",
                value: "$0",
              });
            }
          }

          const ownShares = (currentPlayer.stockAssets || []).find(
            (x) => x.symbol === deal.symbol,
          );
          if (ownShares) {
            tempPoints.push({
              text: "Share Owned",
              value: ownShares.shares,
            });
            tempPoints.push({
              text: "Share Bound At",
              value: ownShares.price,
            });
            setOwnedStock(ownShares.shares);
          }
          break;

        default:
          break;
      }

      setPoints(tempPoints);
    }
  }, [deal]);

  useEffect(() => {
    const getDeal = async () => {
      let tempDeal = getRandomDeal(gameState);
      setOwnedStock(false);
      setMode("");
      setValue(null);
      setDeal(tempDeal);
      await updateRoom({ deal: tempDeal });
    };
    if (turnData?.data) {
      setDeal({ ...turnData?.data });
      setOwnedStock(false);
      setMode("");
      setValue(turnData.data.shares);
    } else if (yourTurn) {
      if (!room?.deal?.type) {
        getDeal();
      }
    } else {
      setDeal(room?.deal || {});
    }
  }, [turnData, gameState, yourTurn, room]);

  const buyClick = () => {
    if (
      [
        DealTypes.realEstate,
        DealTypes.limitedPartnership,
        DealTypes.business,
        DealTypes.company,
      ].includes(deal.type)
    ) {
      buy({
        ...deal,
        id: Math.random(),
      });
    } else {
      if (mode) {
        buy({
          ...deal,
          shares: value,
        });
      } else {
        setMode(Mode.buy);
      }
    }
  };

  const sellClick = () => {
    if (mode) {
      sell({
        ...deal,
        shares: value,
      });
    } else {
      setMode(Mode.sell);
    }
  };

  return (
    <CustomModal>
      <BoxContainer>
        <div>
          <h2>{deal?.name}</h2>
          <p>{deal?.description}</p>
          {deal?.rule && <p>{deal?.rule}</p>}

          {points.map((item) => (
            <p key={item.text}>
              {item.text}: {item.value}
            </p>
          ))}
        </div>
        {mode && (
          <>
            <div>
              <b>{mode === Mode.buy ? "Buy Shares" : "Sell Shares"}</b>
            </div>
            <div>
              <InputNumber min={0} value={value} onChange={setValue} />
            </div>
            <div>
              <b>For: {currencyFormat(deal.price)} each</b>
            </div>
          </>
        )}
        {yourTurn && (
          <ButtonRow>
            <Button
              type="primary"
              block
              disabled={mode === Mode.buy && !value}
              onClick={() => buyClick()}
            >
              Buy
            </Button>
            {ownedStock && (
              <Button
                type="primary"
                block
                disabled={mode === Mode.sell && (!value || ownedStock < value)}
                onClick={() => sellClick()}
              >
                Sell
              </Button>
            )}
            <Button
              type="primary"
              block
              onClick={() => {
                playAudio(AudioConstant.human);
                done();
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
