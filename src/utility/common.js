import {
  BoardPositions,
  InnerBoardBoxType,
  OuterBoardBoxType,
  OuterBoardPositions,
} from "./board";
import { DataClass } from "./data";
import { ExpensesConstant, GameStates, LiabilityConstant } from "./game";

export const CommonConstant = {
  emailRegex:
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const ColorsConstant = [
  "#ffbe0b",
  "#fb5607",
  "#ff006e",
  "#8338ec",
  "#3a86ff",
  "#073b4c",
];

export const playAudio = async (url) => {
  const response = await fetch(url, {
    headers: {
      Range: "bytes=0-",
    },
  });

  if (response.status === 206) {
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.startsWith("audio/")) {
      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audioPlayer = new Audio(audioUrl);
      audioPlayer.play();
    } else {
      console.error("Unexpected content type:", contentType);
    }
  } else {
    console.error("Failed to fetch audio. Status:", response.status);
  }
};

export const randomIndex = (length) => Math.floor(Math.random() * (length - 1));

export const calculateCash = (player) => {
  if (player.fastTrack) {
    const fastTrackAssetsIncome = (player.fastTrackAssets || []).reduce(
      (a, b) => a + (b.cashFlow || 0),
      0,
    );
    const passiveIncome = player.cashFlowDay + fastTrackAssetsIncome;

    return {
      passiveIncome,
    };
  }
  const totalExpenses = (player.expenses || []).reduce(
    (a, b) => a + b.value,
    0,
  );
  const dividend = (player.stockAssets || []).reduce(
    (a, b) => a + b.shares * (b.dividend || 0),
    0,
  );
  const assetsIncome = (player.realEstateAssets || []).reduce(
    (a, b) => a + (b.cashFlow || 0),
    0,
  );
  const passiveIncome = dividend + assetsIncome;
  const totalIncome = passiveIncome + player.salary;
  const payday = totalIncome - totalExpenses;

  return {
    totalExpenses,
    totalIncome,
    passiveIncome,
    payday,
  };
};

export const adjustNewLiability = (liabilities, newLiability) => {
  if ((liabilities || []).some((x) => x.key === newLiability.key)) {
    return liabilities.map((item) => {
      if (item.key === newLiability.key) {
        return {
          ...item,
          value: item.value + newLiability.value,
        };
      }
      return item;
    });
  } else {
    return [...(liabilities || []), newLiability];
  }
};

export const adjustNewExpense = (expenses, newExpense) => {
  if ((expenses || []).some((x) => x.key === newExpense.key)) {
    return expenses.map((item) => {
      if (item.key === newExpense.key) {
        return {
          ...item,
          value: item.value + newExpense.value,
        };
      }
      return item;
    });
  } else {
    return [...(expenses || []), newExpense];
  }
};

export const generateExpenses = (currentScenario) => {
  const expenses = [];
  Object.keys(ExpensesConstant).forEach((key) => {
    if (currentScenario[key]) {
      expenses.push({
        name: ExpensesConstant[key],
        key,
        value: currentScenario[key],
      });
    }
  });
  return [...expenses];
};

export const generateNewPlayer = (user, totalPlayer) => {
  const scenarios = Object.keys(DataClass.scenarios);

  const scenarioKeyIndex = randomIndex(scenarios.length);
  const scenarioKey = Object.keys(DataClass.scenarios)[scenarioKeyIndex];
  const currentScenario = DataClass.scenarios[scenarioKey];

  const temp = {
    id: user.uid,
    name: user.displayName || "Guest",
    position: 1,
    assetIncome: 0,
    cash: currentScenario.startingSavings,
    totalIncome: 0,
    salary: currentScenario.startingSalary,
    cashFlowDay: 0,
    color: ColorsConstant[totalPlayer],
    dream: "",
    jobTitle: currentScenario.jobTitle,
    expenses: [],
    realEstateAssets: [],
    stockAssets: [],
    personalAssets: [],
    passiveIncome: 0,
    totalExpenses: 0,
    payday: 0,
    downsizedTurns: 0,
    charityTurns: 0,
    children: 0,
  };

  temp.expenses = generateExpenses(currentScenario);

  const liabilities = [];
  Object.keys(LiabilityConstant).forEach((key) => {
    if (currentScenario[key]) {
      liabilities.push({
        id: Math.random(),
        name: LiabilityConstant[key],
        key,
        value: currentScenario[key],
      });
    }
  });
  temp.liabilities = [...liabilities];
  const calculatedFields = calculateCash(temp);

  return {
    ...temp,
    ...calculatedFields,
  };
};

export const getRandomDoodad = () => {
  const keys = Object.keys(DataClass.cards.doodad);
  const doodadIndex = randomIndex(keys.length);
  return DataClass.cards.doodad[keys[doodadIndex]];
};

export const getRandomDeal = (gameState) => {
  const options =
    gameState === GameStates.bigDeal
      ? DataClass.cards.bigDeal
      : DataClass.cards.smallDeal;
  const keys = Object.keys(options);
  const dealIndex = randomIndex(keys.length);
  return options[keys[dealIndex]];
};

export const getRandomOffer = () => {
  const options = DataClass.cards.offer;
  const keys = Object.keys(options);
  const dealIndex = randomIndex(keys.length);
  return options[keys[dealIndex]];
};

export const rollDie = (dieCount) => {
  let dieTotal = 0;
  for (let i = 1; i <= dieCount; i += 1) {
    const die = randomIndex(7) + 1;
    dieTotal += die;
  }

  return dieTotal;
};

export const getInnerGameState = (position) => {
  const currentBoard = BoardPositions.find((_, index) => index === position);
  switch (currentBoard?.type) {
    case InnerBoardBoxType.deal:
      return GameStates.deal;

    case InnerBoardBoxType.charity:
      return GameStates.charity;

    case InnerBoardBoxType.baby:
      return GameStates.baby;

    case InnerBoardBoxType.doodad:
      return GameStates.doodad;

    case InnerBoardBoxType.market:
      return GameStates.market;

    case InnerBoardBoxType.payday:
      return GameStates.finishTurn;

    case InnerBoardBoxType.downsized:
      return GameStates.downsized;

    default:
      return "";
  }
};

export const getFastTrackGameState = (position) => {
  const currentBoard = OuterBoardPositions.find(
    (_, index) => index === position,
  );
  switch (currentBoard?.type) {
    case OuterBoardBoxType.opportunity:
    case OuterBoardBoxType.opportunity1:
      return GameStates.opportunity;

    case OuterBoardBoxType.charity:
      return GameStates.charity;

    case OuterBoardBoxType.doodad:
      return GameStates.ftDoodad;

    case OuterBoardBoxType.cashflow:
      return GameStates.cashflow;

    default:
      return "";
  }
};

export const getRandomCashflow = () => {
  const cashflows = [1000, 2000, 3000, 4000, 5000, 6000, 9500, 7500];
  const index = randomIndex(cashflows.length);
  return cashflows[index];
};

export const isNotEmpty = (item) => {
  return (
    item !== undefined && item !== null && item !== "" && item.length !== 0
  );
};

export const currencyFormat = (value, currency) => {
  if (Number.isNaN(value || 0)) {
    return value;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(value || 0);
};

export const numberWithCommas = (x) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const roundNumber = (num, decimals = 2) => {
  if (!isNotEmpty(num)) {
    return "";
  }
  const t = 10 ** decimals;
  let result = Math.round((num + Number.EPSILON) * t) / t;
  if (num < 0) {
    result *= -1;
  }
  return result;
};
