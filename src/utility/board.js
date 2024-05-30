import {
  BabySVG,
  BoatSVG,
  CashflowSVG,
  CharitySVG,
  DealCenterSVG,
  DealSVG,
  DoodadCenterSVG,
  DoodadSVG,
  DownsizedSVG,
  MarketCenterSVG,
  MarketSVG,
  PaydaySVG,
  SalonSVG,
  TaxAuditSVG,
} from "../images";

export const InnerBoardBoxType = {
  deal: "deal",
  market: "market",
  doodad: "doodad",
  charity: "charity",
  payday: "payday",
  downsized: "downsized",
  baby: "baby",
};

export const OuterBoardBoxType = {
  opportunity: "opportunity",
  opportunity1: "opportunity1",
  doodad: "doodad",
  charity: "charity",
  cashflow: "cashflow",
  dream: "dream",
};

export const BoardTypeData = {
  [InnerBoardBoxType.deal]: {
    type: InnerBoardBoxType.deal,
    text: "Deal",
    icon: <DealSVG />,
    bgcolor: "#78C8B8",
  },
  [InnerBoardBoxType.market]: {
    type: InnerBoardBoxType.market,
    text: "Market",
    icon: <MarketSVG />,
    bgcolor: "#3498DB",
  },
  [InnerBoardBoxType.doodad]: {
    type: InnerBoardBoxType.doodad,
    text: "Doodad",
    icon: <DoodadSVG />,
    bgcolor: "#DF3F2F",
  },
  [InnerBoardBoxType.baby]: {
    type: InnerBoardBoxType.baby,
    text: "Baby",
    icon: <BabySVG />,
    bgcolor: "#205D86",
  },
  [InnerBoardBoxType.charity]: {
    type: InnerBoardBoxType.charity,
    text: "Charity",
    icon: <CharitySVG />,
    bgcolor: "#205D86",
  },
  [InnerBoardBoxType.payday]: {
    type: InnerBoardBoxType.payday,
    text: "Payday",
    icon: <PaydaySVG />,
    bgcolor: "#EA9448",
  },
  [InnerBoardBoxType.downsized]: {
    type: InnerBoardBoxType.downsized,
    text: "Downsized",
    icon: <DownsizedSVG />,
    bgcolor: "#205D86",
  },
};

export const OuterBoardTypeData = {
  [OuterBoardBoxType.opportunity]: {
    type: OuterBoardBoxType.opportunity,
    name: "Dry Dock Storage",
    description: "Dry Dock Storage",
    subText: "100,000",
    cost: 100000,
    icon: <BoatSVG />,
    bgcolor: "#EBF5FB",
    textColor: "#205D86",
  },
  [OuterBoardBoxType.opportunity1]: {
    type: OuterBoardBoxType.opportunity1,
    subText: "100,000",
    name: "Beauty Salon ",
    description: "Beauty Salon",
    icon: <SalonSVG />,
    borderColor: "#FFFFFF",
    bgcolor: "#2C3E50",
    cost: 100000,
  },
  [OuterBoardBoxType.doodad]: {
    type: OuterBoardBoxType.doodad,
    text: "Tax Audit",
    description: "Pay accountants and lawyers one half of your cash.",
    icon: <TaxAuditSVG />,
    bgcolor: "#CB4335",
  },
  [OuterBoardBoxType.cashflow]: {
    type: OuterBoardBoxType.cashflow,
    icon: <CashflowSVG />,
    bgcolor: "#FFE815",
  },
};

export const BoardPositions = [
  {
    ...BoardTypeData[InnerBoardBoxType.deal],
    row: 1,
    pos: 1,
    className: "br-left",
  },
  {
    ...BoardTypeData[InnerBoardBoxType.market],
    row: 1,
    pos: 2,
  },
  {
    ...BoardTypeData[InnerBoardBoxType.deal],
    row: 1,
    pos: 3,
  },
  {
    ...BoardTypeData[InnerBoardBoxType.doodad],
    row: 1,
    pos: 4,
  },
  {
    ...BoardTypeData[InnerBoardBoxType.deal],
    row: 1,
    pos: 5,
  },
  {
    ...BoardTypeData[InnerBoardBoxType.charity],
    row: 1,
    pos: 6,
  },
  {
    ...BoardTypeData[InnerBoardBoxType.deal],
    row: 1,
    pos: 7,
  },
  {
    ...BoardTypeData[InnerBoardBoxType.payday],
    row: 1,
    pos: 8,
  },
  {
    ...BoardTypeData[InnerBoardBoxType.deal],
    row: 1,
    pos: 9,
    className: "br-right",
  },
  {
    ...BoardTypeData[InnerBoardBoxType.market],
    row: 2,
    pos: 12,
  },
  {
    ...BoardTypeData[InnerBoardBoxType.deal],
    row: 3,
    pos: 14,
  },

  {
    ...BoardTypeData[InnerBoardBoxType.doodad],
    row: 4,
    pos: 16,
  },
  {
    ...BoardTypeData[InnerBoardBoxType.deal],
    row: 5,
    pos: 25,
    className: "br-right-bottom",
  },
  {
    ...BoardTypeData[InnerBoardBoxType.downsized],
    row: 5,
    pos: 24,
  },
  {
    ...BoardTypeData[InnerBoardBoxType.deal],
    row: 5,
    pos: 23,
  },

  {
    ...BoardTypeData[InnerBoardBoxType.payday],
    row: 5,
    pos: 22,
  },
  {
    ...BoardTypeData[InnerBoardBoxType.deal],
    row: 5,
    pos: 21,
  },
  {
    ...BoardTypeData[InnerBoardBoxType.market],
    row: 5,
    pos: 20,
  },
  {
    ...BoardTypeData[InnerBoardBoxType.deal],
    row: 5,
    pos: 19,
  },
  {
    ...BoardTypeData[InnerBoardBoxType.doodad],
    row: 5,
    pos: 18,
  },
  {
    ...BoardTypeData[InnerBoardBoxType.deal],
    row: 5,
    pos: 17,
    className: "br-left-bottom",
  },
  {
    ...BoardTypeData[InnerBoardBoxType.baby],
    row: 4,
    pos: 15,
  },
  {
    ...BoardTypeData[InnerBoardBoxType.deal],
    row: 3,
    pos: 13,
  },

  {
    ...BoardTypeData[InnerBoardBoxType.payday],
    row: 2,
    pos: 10,
  },
];

export const OuterBoardPositions = [
  {
    ...OuterBoardTypeData[OuterBoardBoxType.cashflow],
    row: 1,
    pos: 1,
    className: "br-left",
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity1],
    row: 1,
    pos: 2,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity],
    row: 1,
    pos: 3,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity1],
    row: 1,
    pos: 4,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.doodad],
    row: 1,
    pos: 5,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity1],
    row: 1,
    pos: 6,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity],
    row: 1,
    pos: 7,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity1],
    row: 1,
    pos: 8,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.cashflow],
    row: 1,
    pos: 9,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity],
    row: 1,
    pos: 10,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity1],
    row: 1,
    pos: 11,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.doodad],
    row: 1,
    pos: 12,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity1],
    row: 1,
    pos: 13,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity],
    row: 1,
    pos: 14,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity1],
    row: 1,
    pos: 15,
    className: "br-right",
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity],
    row: 2,
    pos: 18,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity1],
    row: 3,
    pos: 20,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.doodad],
    row: 4,
    pos: 22,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity],
    row: 5,
    pos: 24,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity1],
    row: 6,
    pos: 26,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.cashflow],
    row: 7,
    pos: 41,
    className: "br-right-bottom",
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity1],
    row: 7,
    pos: 40,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity],
    row: 7,
    pos: 39,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity1],
    row: 7,
    pos: 38,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.doodad],
    row: 7,
    pos: 37,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity1],
    row: 7,
    pos: 36,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity],
    row: 7,
    pos: 35,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity1],
    row: 7,
    pos: 34,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.cashflow],
    row: 7,
    pos: 33,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity],
    row: 7,
    pos: 32,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity1],
    row: 7,
    pos: 31,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.doodad],
    row: 7,
    pos: 30,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity],
    row: 7,
    pos: 29,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity1],
    row: 7,
    pos: 28,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity],
    row: 7,
    pos: 27,
    className: "br-left-bottom",
  },

  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity1],
    row: 6,
    pos: 25,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity],
    row: 5,
    pos: 23,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.doodad],
    row: 4,
    pos: 21,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity1],
    row: 3,
    pos: 19,
  },
  {
    ...OuterBoardTypeData[OuterBoardBoxType.opportunity],
    row: 2,
    pos: 16,
  },
];

export const CenterBoxData = [
  {
    text: "BIG DEAL",
    icon: <DealCenterSVG />,
    textColor: "#78C8B8",
    borderColor: "#78C8B8",
    className: "br-left-bottom br-left br-right",
  },
  {
    text: "DOODAD",
    icon: <DoodadCenterSVG />,
    textColor: "#CB4335",
    borderColor: "#CB4335",
    bgcolor: "#FFFFFF",
    className: "br-right-bottom br-left br-right",
  },
  {
    text: "MARKET",
    icon: <MarketCenterSVG />,
    textColor: "#3498DB",
    borderColor: "#3498DB",
    bgcolor: "#FFFFFF",
    className: "br-right-bottom br-left-bottom br-left",
  },
  {
    text: "SMALL DEAL",
    icon: <DealCenterSVG />,
    borderColor: "#78C8B8",
    textColor: "#78C8B8",
    className: "br-right-bottom br-left-bottom br-right",
  },
];
