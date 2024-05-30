import {BusinessManagerSvg,
  CEOSvg,
  DoctorSvg,
  EngineerSvg,
  JanitorSvg,
  LawyerSvg,
  MachanicSvg,
  DefaultSvg,
  NurseSvg,
  PilotSvg,
  PoliceOfficerSvg,
  SecretarySvg,
  TeacherSvg,
  TruckDriverSvg
} from "../images"

export const GameStates = {
  turn: "turn",
  deal: "deal",
  baby: "baby",
  doodad: "doodad",
  market: "market",
  finishTurn: "finishTurn",
  takeALoan: "takeALoan",
  repay: "repay",
  charity: "charity",
  downsized: "downsized",
  bigDeal: "bigDeal",
  smallDeal: "smallDeal",
  bankrupt: "bankrupt",
  lose: "lose",
  outOfRatRace: "outOfRatRace",
  enterFastTrack: "enterFastTrack",
  opportunity: "opportunity",
  cashflow: "cashflow",
  ftDoodad: "ftDoodad",
  winner: "winner",
};

export const DealTypes = {
  mf: "Mutual Fund",
  stock: "Stock",
  stockSplit: "Stock Split",
  reverseSplit: "Reverse Split",
  preferredStock: "Preferred Stock",
  realEstate: "Real Estate",
  business: "Automated Business",
  coin: "Coin",
  certificateOfDeposit: "Certificate of Deposit",
  company: "Company",
  limitedPartnership: "Limited Partnership",
  propertyDamage: "Property Damage",
};

export const OfferTypes = {
  plex: "plex",
  duplex: "duplex",
  "4-plex": "4-plex",
  "8-plex": "8-plex",
  apartment: "apartment",
  bedBreakfast: "bed breakfast",
  "6Br/6Ba": "6Br/6Ba",
  "5Br/4Ba": "5Br/4Ba",
  "3Br/2Ba": "3Br/2Ba",
  "2Br/1Ba": "2Br/1Ba",
  "10 acres": "10 acres",
  "20 acres": "20 acres",
  limited: "limited",
  mall: "mall",
  business: "business",
  "car wash": "car wash",
};

export const ExpensesConstant = {
  taxes: "Taxes",
  mortgagePayment: "Mortgage Payment",
  carPayment: "Car Payment",
  creditCardPayment: "Credit Card Payment",
  retailPayment: "Retail Payment",
  loans: "Loans",
  children: "Children",
  otherExpenses: "Other Expenses",
};

export const LiabilityConstant = {
  mortgage: "Mortgage",
  carLoan: "Car Loan",
  creditDebt: "Credit Debt",
  retailDebt: "Retail Debt",
  boatLoan: "Boat Loan",
  loans: "Loans",
};

export const ExpenseLiabilityConstant = {
  mortgage: ExpensesConstant.mortgagePayment,
  carloan: ExpensesConstant.carPayment,
  creditdebt: ExpensesConstant.creditCardPayment,
  retaildebt: ExpensesConstant.retailPayment,
  loans: ExpensesConstant.loans,
};



export const PlayerJobTypeIcon = [
  {
   
    icon: <PilotSvg/>,
    jobType: "Airline Pilot"
  },
  {
   
    icon: <BusinessManagerSvg />,
    jobType: "Business Manager"
  },
  {
   
    icon: <CEOSvg />,
    jobType: "CEO"
  },
  {
   
    icon: <DoctorSvg />,
    jobType: "Doctor (MD)"
  },
  {
   
    icon: <EngineerSvg />,
    jobType: "Engineer"
  },
  {
   
    icon: <JanitorSvg />,
    jobType: "Janitor"
  },
  {
   
    icon: <LawyerSvg />,
    jobType: "Lawyer"
  },
  {
   
    icon: <MachanicSvg />,
    jobType: "Mechanic"
  },
  {
   
    icon: <NurseSvg />,
    jobType: "Nurse"
  },
  {
   
    icon: <PoliceOfficerSvg />,
    jobType: "Police Officer"
  },
  {
   
    icon: <SecretarySvg />,
    jobType: "Secretary"
  },
  {
   
    icon: <TeacherSvg />,
    jobType: "Teacher (K-12)"
  },
  {
   
    icon: <TruckDriverSvg />,
    jobType: "Truck Driver"
  },
];


