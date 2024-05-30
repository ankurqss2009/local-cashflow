/* eslint-disable react-hooks/exhaustive-deps */
import { CustomModal } from "./Modal";
import { Button } from "antd";
import { useGame } from "../contexts";
import { BoxContainer, ButtonRow } from "./Common";
import { useTimer } from "react-timer-hook";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../contexts/auth";
import { Link } from "react-router-dom";

const digit = (value) => {
  const leftDigit = value >= 10 ? value.toString()[0] : "0";
  const rightDigit = value >= 10 ? value.toString()[1] : value.toString();
  return `${leftDigit}${rightDigit}`;
};

export const TurnBox = ({ roll, pay }) => {
  const {
    currentPlayer,
    yourTurn,
    getNextTurnUser,
    kickOutUser,
    players,
    nextTurn,
  } = useGame();
  const [isTurnExpired, setTurnExpired] = useState(false);
  const { user } = useAuth();

  const { currentGamePlayers, loggedInPlayer } = useMemo(
    () => ({
      loggedInPlayer: players.find((x) => x.id === user?.uid),
      currentGamePlayers: players.filter((x) => !x.lose && !x.left),
    }),
    [players, user]
  );

  const nextUser = useMemo(() => getNextTurnUser(), [currentPlayer]);
  const [showKickOut, setShowKickOut] = useState(false);

  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: new Date(),
    onExpire: async () => {
      setTurnExpired(true);
    },
  });

  const turnDies = async () => {
    pay({
      name: "Cash Deducted",
      cost: Math.floor(currentPlayer.cash * 0.02),
    });
    await nextTurn();
    setTurnExpired(false);
    restartTimer();
    //setShowKickOut(true);
  };

  const restartTimer = () => {
    const time = new Date();
    time.setSeconds(
      time.getSeconds() + (+process.env.REACT_APP_ROLL_TIME || 30)
    );
    restart(time, true);
  };

  useEffect(() => {
    restartTimer();
  }, []);

  return (
    <CustomModal>
      <BoxContainer>
        {loggedInPlayer?.left ? (
          <>
            <h2>YOU LOSE!</h2>
            <p>You have been kicked out from the game</p>
            <Link to="/rooms">
              <Button type="primary" block>
                Play Again
              </Button>
            </Link>
          </>
        ) : (
          <>
            {isTurnExpired && yourTurn ? (
              <div>
                <h2>{currentPlayer?.name}'s Turn expired</h2>
                <p>2% cash will be deduct and roll turn to next user</p>
                <Button type="primary" block onClick={turnDies}>
                  Ok
                </Button>
              </div>
            ) : (
              <div>
                <h2>{currentPlayer?.name}'s Turn</h2>
                <h3>When you are ready, roll the die and take your turn</h3>
                <p>
                  Before you start your turn, review your financial statement.
                  You may also use this time to repay liabilities or borrow
                  money.
                </p>
              </div>
            )}
            {yourTurn && !isTurnExpired && (
              <div>
                {currentGamePlayers.length > 1 ? (
                  <ButtonRow>
                    <Button type="primary" block onClick={() => roll(1)}>
                      Roll ({digit(minutes)}:{digit(seconds)})
                    </Button>
                    {currentGamePlayers.charityTurns > 0 && (
                      <Button type="primary" block onClick={() => roll(2)}>
                        Roll 2X ({digit(minutes)}:{digit(seconds)})
                      </Button>
                    )}
                  </ButtonRow>
                ) : (
                  <ButtonRow>
                    <Button type="primary" block onClick={() => roll(1)}>
                      Roll
                    </Button>
                    {currentGamePlayers.charityTurns > 0 && (
                      <Button type="primary" block onClick={() => roll(2)}>
                        Roll 2X
                      </Button>
                    )}
                  </ButtonRow>
                )}
              </div>
            )}
            {showKickOut &&
              user?.uid === nextUser.id &&
              user?.uid !== currentPlayer.id && (
                <div>
                  <p>
                    Player is taking too much time to play turn, you can kick
                    out if you want
                  </p>
                  <Button
                    type="primary"
                    block
                    onClick={() => kickOutUser(currentPlayer)}
                  >
                    Kick out
                  </Button>
                </div>
              )}
          </>
        )}
      </BoxContainer>
    </CustomModal>
  );
};
