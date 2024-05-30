/* eslint-disable react-hooks/exhaustive-deps */
import { useState, createContext, useContext, useMemo, useEffect } from "react";
import {
  ExpenseLiabilityConstant,
  ExpensesConstant,
  GameStates,
  LiabilityConstant,
  OfferTypes,
} from "../utility/game";
import {
  BoardPositions,
  InnerBoardBoxType,
  OuterBoardBoxType,
  OuterBoardPositions,
} from "../utility/board";
import {
  getInnerGameState,
  rollDie,
  DealTypes,
  calculateCash,
  FirebaseService,
  adjustNewLiability,
  adjustNewExpense,
  roundNumber,
  getFastTrackGameState,
  getRandomCashflow,
  playAudio,
} from "../utility";
import { useAuth } from "./auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { ref, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { AudioConstant } from "../audio";

const GameContext = createContext();

export function GameProvider({ children }) {
  const { user } = useAuth();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [highlightedRows, setHighlightedRows] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [room] = useObjectVal(ref(FirebaseService.database, `rooms/${roomId}`));
  const navigate = useNavigate();

  const { gameState, turnData } = room || {};

  const { yourTurn, players, currentPlayer, allOut } = useMemo(() => {
    const tempPlayer = Object.values(room?.players || {});
    return {
      yourTurn: room?.currentTurn === user?.uid,
      players: tempPlayer,
      currentPlayer: tempPlayer.find((x) => x.id === room?.currentTurn),
      allOut: tempPlayer.length > 0 && tempPlayer.every((x) => x.lose),
    };
  }, [room, user]);

  useEffect(() => {
    const update = async () => {
      await updateRoom({
        completed: true,
      });
    };
    if (allOut) {
      update();
    }
  }, [allOut]);

  const updateRoom = async (newValue) => {
    await update(ref(FirebaseService.database, `rooms/${roomId}`), newValue);
  };

  const leaveTheLobby = async () => {
    if (yourTurn) {
      await nextTurn();
    }
    await update(
      ref(FirebaseService.database, `rooms/${roomId}/players/${user.uid}`),
      {
        left: true,
      },
    );
    navigate("/rooms");
  };

  const kickOutUser = async (tempUser) => {
    if (currentPlayer.id === tempUser.id) {
      await update(
        ref(FirebaseService.database, `rooms/${roomId}/players/${tempUser.id}`),
        {
          left: true,
        },
      );
      await nextTurn();
    }
  };

  const getNextTurnUser = () => {
    let currentPlayerIndex = players.findIndex(
      (x) => x.id === room?.currentTurn,
    );
    const tempPlayers = players.filter((x) => !x.lose && !x.left);
    if (currentPlayerIndex < tempPlayers.length - 1) {
      currentPlayerIndex += 1;
    } else {
      currentPlayerIndex = 0;
    }
    return tempPlayers[currentPlayerIndex];
  };

  const nextTurn = async () => {
    let currentPlayerIndex = players.findIndex(
      (x) => x.id === room?.currentTurn,
    );
    const tempPlayers = players.filter((x) => !x.lose && !x.left);
    if (tempPlayers.length > 1) {
      playAudio(AudioConstant.nextPlayer);
    }
    if (currentPlayerIndex < tempPlayers.length - 1) {
      currentPlayerIndex += 1;
    } else {
      currentPlayerIndex = 0;
    }
    await updateRoom({
      currentTurn: getNextTurnUser().id,
      gameState: GameStates.turn,
    });
  };

  const updatePlayer = async (newInfo) => {
    const temp = {
      ...currentPlayer,
      ...newInfo,
    };
    const calculatedFields = calculateCash(temp);
    await update(
      ref(FirebaseService.database, `rooms/${roomId}/players/${user.uid}`),
      {
        ...temp,
        ...calculatedFields,
      },
    );
  };

  const movePlayer = async (dieCount) => {
    const previousPosition = currentPlayer.position;
    const dice = rollDie(dieCount);
    playAudio(AudioConstant.roll);
    let newPosition = dice + previousPosition;
    let hasPayDay = [];
    if (currentPlayer.fastTrack) {
      if (newPosition > OuterBoardPositions.length - 1) {
        hasPayDay = OuterBoardPositions.filter(
          (x, index) =>
            x.type === OuterBoardBoxType.cashflow &&
            index >= previousPosition &&
            index <= newPosition,
        );
        newPosition = newPosition - OuterBoardPositions.length;
      } else {
        hasPayDay = OuterBoardPositions.filter(
          (x, index) =>
            x.type === OuterBoardBoxType.cashflow &&
            index >= previousPosition &&
            index <= newPosition,
        );
      }
    } else {
      if (newPosition > BoardPositions.length - 1) {
        hasPayDay = BoardPositions.filter(
          (x, index) =>
            x.type === InnerBoardBoxType.payday &&
            index >= previousPosition &&
            index <= newPosition,
        );
        newPosition = newPosition - BoardPositions.length;
      } else {
        hasPayDay = BoardPositions.filter(
          (x, index) =>
            x.type === InnerBoardBoxType.payday &&
            index >= previousPosition &&
            index <= newPosition,
        );
      }
    }

    const temp = {
      position: newPosition,
    };
    if (currentPlayer.charityTurns > 0) {
      temp.charityTurns = currentPlayer.charityTurns - 1;
    }
    if (hasPayDay.length > 0) {
      temp.cash =
        currentPlayer.cash +
        (currentPlayer.fastTrack
          ? currentPlayer.cashFlowDay
          : currentPlayer.payday * hasPayDay.length);
    }
    await updatePlayer(temp);
    playAudio(AudioConstant.statementOpen);
    setOpenDrawer(true);

    if (currentPlayer.fastTrack) {
      const newGameState = getFastTrackGameState(newPosition);
      let ftBox = {};
      if (newGameState === GameStates.opportunity) {
        ftBox = {
          ...OuterBoardPositions[newPosition],
          cashFlow: getRandomCashflow(),
        };
        delete ftBox.icon;
      } else if (newGameState === GameStates.ftDoodad) {
        ftBox = {
          ...OuterBoardPositions[newPosition],
          cost: Math.floor(currentPlayer?.cash / 2),
        };
        delete ftBox.icon;
      }

      playAudio(AudioConstant[newGameState]);
      await updateRoom({
        gameState: newGameState,
        ftBox,
      });
    } else {
      const newGameState = getInnerGameState(newPosition);
      playAudio(AudioConstant[newGameState]);
      await updateRoom({
        gameState: newGameState,
      });
    }
  };

  const payExpenses = async (type, expense) => {
    playAudio(AudioConstant.human);
    if (expense) {
      let cost = expense.cost || 0;
      const temp = {
        expenses: [...(currentPlayer.expenses || [])],
        liabilities: [...(currentPlayer.liabilities || [])],
      };
      if (expense.amount) {
        cost = currentPlayer.cash * expense.amount;
      }
      if (expense.loan) {
        temp.liabilities.push({
          id: Math.random(),
          name: LiabilityConstant[expense.key],
          key: expense.key,
          value: expense.loan,
        });
      }
      if (expense.debt) {
        temp.expenses = adjustNewExpense(temp.expenses, {
          name: ExpensesConstant[expense.key],
          key: expense.key,
          value: expense.debt,
        });
      }

      switch (type) {
        case GameStates.baby:
          temp.children = currentPlayer.children + 1;
          temp.expenses = adjustNewExpense(temp.expenses, {
            name: "Children",
            key: ExpensesConstant.children,
            value: cost,
          });
          break;

        case GameStates.downsized:
          temp.downsizedTurns = currentPlayer.downsizedTurns + 3;
          break;

        case GameStates.charity:
          temp.charityTurns = currentPlayer.charityTurns + 3;
          break;

        default:
          break;
      }

      if (cost <= currentPlayer.cash) {
        temp.cash = currentPlayer.cash - cost;
        await updatePlayer({
          ...temp,
        });
        await finishTurn({
          ...currentPlayer,
          ...temp,
        });
      } else {
        await updateRoom({
          turnData: {
            type,
            cost,
            gameState,
            data: expense,
          },
          gameState: GameStates.takeALoan,
        });
      }
    } else {
      await finishTurn();
    }
  };

  const buyDeal = async (deal) => {
    playAudio(AudioConstant.human);

    let cost = deal.cost || 0;
    if (!cost) {
      if (
        [
          DealTypes.realEstate,
          DealTypes.limitedPartnership,
          DealTypes.business,
        ].includes(deal.type)
      ) {
        cost = deal.downPayment;
      } else {
        cost = deal.price * deal.shares;
      }
    }

    const temp = {
      stockAssets: [...(currentPlayer.stockAssets || [])],
      realEstateAssets: [...(currentPlayer.realEstateAssets || [])],
      liabilities: [...(currentPlayer.liabilities || [])],
    };

    if (cost <= currentPlayer.cash) {
      temp.cash = currentPlayer.cash - cost;
      if (
        [
          DealTypes.realEstate,
          DealTypes.limitedPartnership,
          DealTypes.business,
          DealTypes.company,
        ].includes(deal.type)
      ) {
        temp.realEstateAssets = [
          ...temp.realEstateAssets,
          {
            ...deal,
          },
        ];
      } else {
        if (temp.stockAssets.some((x) => x.symbol === deal.symbol)) {
          temp.stockAssets = temp.stockAssets.map((x) => {
            if (x.symbol === deal.symbol) {
              const totalShares = x.shares + deal.shares;
              const totalCost = x.cost + cost;
              return {
                ...x,
                shares: totalShares,
                price: Math.round(totalCost / totalShares),
                cost: totalCost,
              };
            }
            return x;
          });
        } else {
          temp.stockAssets = [
            ...temp.stockAssets,
            {
              ...deal,
              cost,
            },
          ];
        }
      }
      await updatePlayer({
        ...temp,
      });
      await finishTurn({
        ...currentPlayer,
        ...temp,
      });
    } else {
      await updateRoom({
        turnData: {
          cost,
          gameState,
          data: deal,
        },
        gameState: GameStates.takeALoan,
      });
    }
  };

  const sellDeal = async (deal) => {
    playAudio(AudioConstant.human);
    const cost = deal.price * deal.shares;

    const stockAssets = currentPlayer.stockAssets
      .map((x) => {
        if (x.symbol === deal.symbol) {
          const totalShares = x.shares - deal.shares;
          return {
            ...x,
            shares: totalShares,
          };
        }
        return x;
      })
      .filter((x) => x.shares > 0);

    await updatePlayer({
      cash: currentPlayer.cash + cost,
      stockAssets,
    });
    await finishTurn();
  };

  const loanDecision = async (loanAmount) => {
    playAudio(AudioConstant.human);
    if (loanAmount) {
      const temp = {
        expenses: [...currentPlayer.expenses],
        liabilities: [...(currentPlayer.liabilities || [])],
      };

      temp.liabilities = adjustNewLiability(temp.liabilities, {
        name: LiabilityConstant.loans,
        key: LiabilityConstant.loans,
        value: loanAmount,
        id: Math.random(),
      });
      temp.expenses = adjustNewExpense(temp.expenses, {
        name: LiabilityConstant.loans,
        key: LiabilityConstant.loans,
        value: roundNumber(loanAmount * 0.1),
      });
      temp.cash = currentPlayer.cash + loanAmount;
      await updatePlayer({
        ...temp,
      });
    }
    await updateRoom({
      gameState: turnData.gameState,
    });
  };

  const checkBalanceSheet = (currentPlayerInfo) => {
    if (currentPlayerInfo.payday < 0 && currentPlayerInfo.cash < 0) {
      if ((currentPlayerInfo.realEstateAssets || []).length > 0) {
        return GameStates.bankrupt;
      }
      return GameStates.lose;
    }
  };

  const finishTurn = async (currentPlayerInfo) => {
    const tempPlayer = currentPlayerInfo || currentPlayer;
    let newState;
    if (tempPlayer.fastTrack) {
      if (tempPlayer.passiveIncome >= tempPlayer.winGoal) {
        newState = GameStates.winner;
        await updatePlayer({
          winner: true,
        });
        await updateRoom({
          gameState: GameStates.winner,
          turnData: null,
          deal: null,
          offer: null,
          doodad: null,
        });
        return;
      }
    } else {
      if (tempPlayer.passiveIncome > tempPlayer.totalExpenses) {
        newState = GameStates.outOfRatRace;
      } else {
        newState = checkBalanceSheet(tempPlayer);
      }
    }
    await updateRoom({
      gameState: newState || GameStates.finishTurn,
      turnData: null,
      deal: null,
      offer: null,
      doodad: null,
    });
    setOpenDrawer(!!newState);
    if (newState !== GameStates.bankrupt) {
      setHighlightedRows({});
    }
    setSelectedRow(null);
    if (newState === GameStates.lose) {
      await updatePlayer({
        lose: true,
      });
    } else if (newState === GameStates.outOfRatRace) {
      await updatePlayer({
        fastTrack: true,
      });
    }
  };

  const repay = async () => {
    await updateRoom({
      gameState: GameStates.repay,
      turnData: null,
    });
    const temp = {};
    (currentPlayer.liabilities || []).forEach(
      (item) => (temp[item.id] = "highlighed"),
    );
    playAudio(AudioConstant.statementOpen);
    setOpenDrawer(true);
    updateHighlightAssets(temp);
  };

  const payoffLoan = async (liability, amount) => {
    let newLiabilities = [];
    let newExpenses = [];
    playAudio(AudioConstant.human);
    if (liability.key === LiabilityConstant.loans) {
      newLiabilities = (currentPlayer.liabilities || [])
        .map((x) => {
          if (x.id === liability.id) {
            return {
              ...x,
              value: x.value - amount,
            };
          }
          return x;
        })
        .filter((x) => x.value > 0);

      const loadInterest = Math.round(amount * 0.1);
      newExpenses = currentPlayer.expenses
        .map((x) => {
          if (
            x.name === ExpenseLiabilityConstant[liability.key.toLowerCase()]
          ) {
            return {
              ...x,
              value: x.value - loadInterest,
            };
          }
          return x;
        })
        .filter((x) => x.value > 0);
    } else {
      newLiabilities = (currentPlayer.liabilities || []).filter(
        (x) => x.id !== liability.id,
      );
      newExpenses = (currentPlayer.expenses || []).filter(
        (x) => x.name !== ExpenseLiabilityConstant[liability.key.toLowerCase()],
      );
    }

    await updatePlayer({
      cash: currentPlayer.cash - (amount || liability.value),
      liabilities: newLiabilities,
      expenses: newExpenses,
    });

    await finishTurn();
  };

  const dealDecision = async (state) => {
    playAudio(AudioConstant.human);
    await updateRoom({
      gameState: state,
    });
  };

  const borrow = async () => {
    playAudio(AudioConstant.human);
    await updateRoom({
      gameState: GameStates.takeALoan,
      turnData: {
        gameState,
      },
    });
    playAudio(AudioConstant.statementOpen);
    setOpenDrawer(true);
  };

  const updateHighlightAssets = (highlighed) => {
    setHighlightedRows({ ...highlighed });
  };

  const updateSelectedRow = (assest) => {
    setSelectedRow(assest);
  };

  const acceptOffer = async (deal, amount) => {
    playAudio(AudioConstant.human);
    let incoming;
    const temp = {};
    if (amount) {
      incoming = amount;
    } else {
      switch (deal.type) {
        case OfferTypes.apartment:
        case OfferTypes.plex:
        case OfferTypes["8-plex"]:
        case OfferTypes["4-plex"]:
        case OfferTypes.duplex:
          incoming =
            deal.offerPerUnit * selectedRow.units - selectedRow.mortgage;
          break;

        default:
          incoming = deal.offer - selectedRow.mortgage;
          break;
      }
    }
    temp.cash = currentPlayer.cash + incoming;
    temp.realEstateAssets = (currentPlayer.realEstateAssets || []).filter(
      (x) => x.id !== selectedRow.id,
    );
    await updatePlayer({
      ...temp,
    });
    await finishTurn({
      ...currentPlayer,
      ...temp,
    });
  };

  // Fast Track Functions
  const setupFastTrack = async () => {
    playAudio(AudioConstant.human);
    const temp = {
      cash: currentPlayer.cash + currentPlayer.payday * 100,
      cashFlowDay: currentPlayer.payday + 50000,
      winGoal: currentPlayer.payday + 100000,
      position: 2,
      downsizedTurns: 0,
      charityTurns: 0,
      realEstateAssets: [],
      stockAssets: [],
      personalAssets: [],
      liabilities: [],
      fastTrackAssets: [],
      expenses: [],
    };

    const calculatedFields = calculateCash({
      ...currentPlayer,
      ...temp,
    });

    await updatePlayer({
      ...temp,
      ...calculatedFields,
    });
    await nextTurn();
  };

  const buyOpportunity = async (opportunity) => {
    let cost = opportunity.cost || 0;

    const temp = {
      fastTrackAssets: [...(currentPlayer.fastTrackAssets || [])],
    };

    temp.cash = currentPlayer.cash - cost;

    temp.fastTrackAssets = [
      ...temp.fastTrackAssets,
      {
        ...opportunity,
      },
    ];
    await updatePlayer({
      ...temp,
    });
    await finishTurn({
      ...currentPlayer,
      ...temp,
    });
  };

  const contextData = useMemo(
    () => ({
      players,
      currentPlayer,
      gameState,
      yourTurn,
      rollDie,
      movePlayer,
      updatePlayer,
      turnData,
      nextTurn,
      payExpenses,
      buyDeal,
      sellDeal,
      loanDecision,
      openDrawer,
      setOpenDrawer,
      updateHighlightAssets,
      selectedRow,
      updateSelectedRow,
      acceptOffer,
      highlightedRows,
      borrow,
      repay,
      finishTurn,
      setRoomId,
      dealDecision,
      payoffLoan,
      updateRoom,
      room,
      allOut,
      leaveTheLobby,
      kickOutUser,
      setupFastTrack,
      buyOpportunity,
      getNextTurnUser,
    }),
    [
      players,
      currentPlayer,
      gameState,
      yourTurn,
      rollDie,
      movePlayer,
      updatePlayer,
      nextTurn,
      payExpenses,
      buyDeal,
      sellDeal,
      turnData,
      loanDecision,
      openDrawer,
      setOpenDrawer,
      updateHighlightAssets,
      selectedRow,
      updateSelectedRow,
      acceptOffer,
      highlightedRows,
      borrow,
      repay,
      finishTurn,
      setRoomId,
      dealDecision,
      payoffLoan,
      updateRoom,
      room,
      allOut,
      leaveTheLobby,
      kickOutUser,
      setupFastTrack,
      buyOpportunity,
      getNextTurnUser,
    ],
  );

  return (
    <GameContext.Provider value={contextData}>{children}</GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
