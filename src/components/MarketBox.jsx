/* eslint-disable react-hooks/exhaustive-deps */
import { CustomModal } from "./Modal";
import { Button } from "antd";
import { useEffect, useMemo, useState } from "react";
import { getRandomOffer, playAudio } from "../utility";
import { useGame } from "../contexts";
import { BoxContainer, ButtonRow } from "./Common";
import { AudioConstant } from "../audio";

export const MarketBox = ({ done }) => {
  const {
    currentPlayer,
    updateHighlightAssets,
    selectedRow,
    acceptOffer,
    yourTurn,
    updateRoom,
    room,
  } = useGame();
  const [deal, setDeal] = useState(null);
  const [availableAssets, setAvailableAssets] = useState([]);

  const hasSelected = useMemo(
    () => availableAssets.some((x) => x.id === selectedRow?.id),
    [selectedRow, availableAssets],
  );

  useEffect(() => {
    const getDeal = async () => {
      const tempDeal = getRandomOffer();
      setDeal(tempDeal);
      await updateRoom({ offer: tempDeal });

      const tempHas = (currentPlayer.realEstateAssets || []).filter((x) =>
        x.landType.includes(tempDeal.type),
      );
      setAvailableAssets(tempHas);
      const temp = {};
      tempHas.forEach((item) => (temp[item.id] = "highlighed"));
      updateHighlightAssets(temp);
    };
    if (yourTurn) {
      if (!room?.offer?.name) {
        getDeal();
      }
    } else {
      setDeal(room?.offer || {});
    }
  }, [currentPlayer, yourTurn, room]);

  return (
    <CustomModal>
      <BoxContainer>
        <div>
          <h2>{deal?.name}</h2>
          <p>{deal?.description}</p>
          <p>{deal?.rule1}</p>
          <p>{deal?.rule2}</p>
          {yourTurn && !availableAssets.length && (
            <p>
              <b>You have no assets that match this opportinuty</b>
            </p>
          )}
        </div>
        {yourTurn && (
          <ButtonRow>
            {availableAssets.length > 0 && (
              <Button
                disabled={!hasSelected}
                onClick={() => acceptOffer(deal)}
                block
                type="primary"
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
              Done
            </Button>
          </ButtonRow>
        )}
      </BoxContainer>
    </CustomModal>
  );
};
