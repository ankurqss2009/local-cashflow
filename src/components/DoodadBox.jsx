/* eslint-disable react-hooks/exhaustive-deps */
import { CustomModal } from "./Modal";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { getRandomDoodad } from "../utility";
import { useGame } from "../contexts";
import { BoxContainer } from "./Common";

export const DoodadBox = ({ pay }) => {
  const { turnData, currentPlayer, yourTurn, updateRoom, room } = useGame();
  const [doodad, setDoodad] = useState(null);
  const [hasDoodad, setHasDoodad] = useState(null);

  useEffect(() => {
    const getDoodad = async () => {
      const tempDoodad = getRandomDoodad();
      if (currentPlayer.children === 0 && tempDoodad.child) {
        getDoodad();
      } else {
        setDoodad(tempDoodad);
        await updateRoom({ doodad: tempDoodad });
        if (
          tempDoodad.onlyOne &&
          currentPlayer.liabilities.some((x) => x.key === tempDoodad.key)
        ) {
          setHasDoodad("You already have one!");
        } else {
          setHasDoodad("");
        }
      }
    };
    if (turnData?.data) {
      setDoodad({ ...turnData.data });
    } else if (yourTurn) {
      if (!room?.doodad?.name) {
        getDoodad();
      }
    } else {
      setDoodad(room?.doodad || {});
    }
  }, [currentPlayer, turnData, room, yourTurn]);

  return (
    <CustomModal>
      <BoxContainer>
        <div>
          <h2>{doodad?.name}</h2>
          <p>{doodad?.hasDoodad || doodad?.text}</p>
        </div>
        {yourTurn && (
          <div>
            {!hasDoodad ? (
              <Button type="primary" block onClick={() => pay(doodad)}>
                Pay
              </Button>
            ) : (
              <Button type="primary" block onClick={() => pay(null)}>
                Done
              </Button>
            )}
          </div>
        )}
      </BoxContainer>
    </CustomModal>
  );
};

export const FastTrackDoodadBox = ({ pay }) => {
  const { yourTurn, room } = useGame();
  const [doodad, setDoodad] = useState(null);

  useEffect(() => {
    setDoodad(room?.ftBox || {});
  }, [room]);

  return (
    <CustomModal>
      <BoxContainer>
        <div>
          <h2>{doodad?.text}</h2>
          <p>{doodad?.description}</p>
        </div>
        {yourTurn && (
          <div>
            <Button type="primary" block onClick={() => pay(doodad)}>
              Pay
            </Button>
          </div>
        )}
      </BoxContainer>
    </CustomModal>
  );
};
