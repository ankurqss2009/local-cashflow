import styled from "styled-components";
import { useGame } from "../contexts";
import { ExpensesConstant, currencyFormat, numberWithCommas } from "../utility";
import { Button, Popconfirm, Progress } from "antd";
import { useMemo } from "react";

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;
  color: black;
  height: 100vh;
  overflow: hidden;

  .highlighed {
    background-color: #e2e2e2;
    cursor: pointer;
  }
  .selected {
    background-color: yellow;
  }
`;

const Header = styled.div`
  background: #205d86;
  color: #fff;
  height: 40px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  padding: 0.7rem;
`;

const ChildContainer = styled.div`
  display: grid;
  gap: 16px;
  margin-top: 1rem;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.4rem auto;
  padding: 2px 0.4rem;
`;

const ScrollContainer = styled.div`
  max-height: 20vh;
  overflow-y: auto;
`;

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 2rem 1rem;

  .header {
    text-transform: uppercase;
    text-align: center;
  }
  ${FlexRow} {
    text-transform: uppercase;
  }
  .footer {
    padding-top: 5px;
    border-top: 0.5px solid;
    font-weight: bold;
  }
  .cash {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .progress {
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StatementHeader = ({ loggedInPlayer, leaveTheLobby }) => {
  return (
    <HeaderContainer>
      <span>Statement ({loggedInPlayer?.name})</span>
      <Popconfirm
        title="Leave the lobby"
        description="Are you sure to leave this room?"
        onConfirm={() => leaveTheLobby()}
        okText="Yes"
        cancelText="No"
      >
        <Button type="primary" danger size="small">
          Leave
        </Button>
      </Popconfirm>
    </HeaderContainer>
  );
};

export const Statement = ({ loggedInPlayer }) => {
  const { selectedRow, highlightedRows, updateSelectedRow } = useGame();

  const progress = useMemo(() => {
    if (!loggedInPlayer?.name) {
      return 0;
    }
    let width =
      100 * (loggedInPlayer.passiveIncome / loggedInPlayer.totalExpenses);

    if (width > 100) {
      return width;
    } else {
      return Math.round(width);
    }
  }, [loggedInPlayer]);

  return (
    <Container>
      <ChildContainer className="child">
        <div>
          <Header>Income</Header>
          <ScrollContainer>
            <FlexRow>
              <div></div>
              <div>
                <b>Cash Flow</b>
              </div>
            </FlexRow>
            <FlexRow>
              <div>{loggedInPlayer?.jobTitle} Salary</div>
              <div>{currencyFormat(loggedInPlayer?.salary)}</div>
            </FlexRow>
            <FlexRow>
              <div>
                <b>Interest/Dividends</b>
              </div>
            </FlexRow>
            {(loggedInPlayer?.stockAssets || [])
              .filter((x) => x.dividend)
              .map((item) => (
                <FlexRow key={item.id}>
                  <div>{item.name}</div>
                  <div>{currencyFormat(item.shares * item.dividend)}</div>
                </FlexRow>
              ))}
            <FlexRow>
              <div>
                <b>Real Estate/Business</b>
              </div>
            </FlexRow>
            {(loggedInPlayer?.realEstateAssets || [])
              .filter((x) => x.cashFlow)
              .map((item) => (
                <FlexRow key={item.id}>
                  <div>{item.landType}</div>
                  <div>{currencyFormat(item.cashFlow)}</div>
                </FlexRow>
              ))}
          </ScrollContainer>
        </div>
        <div>
          <Header>Expenses</Header>
          <ScrollContainer>
            {(loggedInPlayer?.expenses || []).map((item) => (
              <FlexRow key={item.key}>
                <div>
                  {item.name}
                  {item.key === ExpensesConstant.children &&
                    `(${loggedInPlayer.children}x)`}
                </div>
                <div>{currencyFormat(item.value)}</div>
              </FlexRow>
            ))}
          </ScrollContainer>
        </div>
      </ChildContainer>
      <StatContainer className="child">
        <div>
          <div>
            <h3 className="header">
              Increase Passing Income to Escape the rat race
            </h3>
          </div>
          <div>
            Total Expenses: {currencyFormat(loggedInPlayer?.totalExpenses)}
            <Progress percent={progress} showInfo={false} />
            Passive Income: {currencyFormat(loggedInPlayer?.passiveIncome)}
          </div>
        </div>
        <div>
          <FlexRow className="cash">
            <div>
              <b>CASH:</b>
            </div>
            <div>{currencyFormat(loggedInPlayer?.cash)}</div>
          </FlexRow>
          <FlexRow>
            <div>
              <b>Total Income:</b>
            </div>
            <div>{currencyFormat(loggedInPlayer?.totalIncome)}</div>
          </FlexRow>
          <FlexRow>
            <div>
              <b>Total Expenses:</b>
            </div>
            <div>-{currencyFormat(loggedInPlayer?.totalExpenses)}</div>
          </FlexRow>
          <FlexRow className="footer">
            <div>
              <b>Payday:</b>
            </div>
            <div>{currencyFormat(loggedInPlayer?.payday)}</div>
          </FlexRow>
        </div>
      </StatContainer>

      <ChildContainer className="child">
        <div>
          <Header>Assets</Header>
          <ScrollContainer>
            <FlexRow>
              <div>
                <b>Stock/Funds/CDs</b>
              </div>
              <div>
                <b>Cost/Shares</b>
              </div>
            </FlexRow>
            {(loggedInPlayer?.stockAssets || []).map((item) => (
              <FlexRow key={item.id}>
                <div>
                  {item.name}({numberWithCommas(item.shares)} Shares)
                </div>
                <div>{currencyFormat(item.cost)}</div>
              </FlexRow>
            ))}
            <FlexRow>
              <div>
                <b>Real Estate/Business</b>
              </div>
              <div>
                <b>Cost</b>
              </div>
            </FlexRow>
            {(loggedInPlayer?.realEstateAssets || []).map((item) => (
              <FlexRow
                key={item.id}
                className={
                  selectedRow?.id === item.id
                    ? "selected"
                    : highlightedRows[item.id] || ""
                }
                onClick={() =>
                  highlightedRows[item.id] && updateSelectedRow(item)
                }
              >
                <div className="text-transform">
                  {item.landType || item.name}
                </div>
                <div>{currencyFormat(item.cost)}</div>
              </FlexRow>
            ))}
          </ScrollContainer>
        </div>
      </ChildContainer>
      <ChildContainer className="child">
        <div>
          <Header>Liabilites</Header>
          <ScrollContainer>
            {(loggedInPlayer?.liabilities || []).map((item) => (
              <FlexRow
                key={item.id}
                className={
                  selectedRow?.id === item.id
                    ? "selected"
                    : highlightedRows[item.id] || ""
                }
                onClick={() =>
                  highlightedRows[item.id] && updateSelectedRow(item)
                }
              >
                <div>{item.name}</div>
                <div>
                  <b>{currencyFormat(item.value)}</b>
                </div>
              </FlexRow>
            ))}
            <FlexRow>
              <div>
                <b>Real Estate/Business</b>
              </div>
              <div>
                <b>Liability</b>
              </div>
            </FlexRow>
            {(loggedInPlayer?.realEstateAssets || [])
              .filter((x) => x.mortgage)
              .map((item) => (
                <FlexRow key={`${item.id}`}>
                  <div className="text-transform">{item.landType}</div>
                  <div>
                    <b>{currencyFormat(item.mortgage)}</b>
                  </div>
                </FlexRow>
              ))}
          </ScrollContainer>
        </div>
      </ChildContainer>
    </Container>
  );
};

const FTContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr;
  height: auto;
`;

export const FastTrackStatement = ({ loggedInPlayer }) => {
  const progress = useMemo(() => {
    if (!loggedInPlayer?.name) {
      return 0;
    }
    let width = 100 * (loggedInPlayer.passiveIncome / loggedInPlayer.winGoal);

    if (width > 100) {
      return width;
    } else {
      return Math.round(width);
    }
  }, [loggedInPlayer]);

  return (
    <FTContainer>
      <StatContainer className="child">
        <div>
          <div>
            <h3 className="header">To Win, Increase Cashflow Day Income!</h3>
          </div>
          <div>
            Income Goal: {currencyFormat(loggedInPlayer?.winGoal)}
            <Progress percent={progress} showInfo={false} />
            Passive Income: {currencyFormat(loggedInPlayer?.passiveIncome)}
          </div>
        </div>
        <div>
          <hr />
        </div>
        <div>
          <FlexRow className="cash">
            <div>
              <b>CASH:</b>
            </div>
            <div>{currencyFormat(loggedInPlayer?.cash)}</div>
          </FlexRow>
          <FlexRow>
            <div>
              <b>Cashflow day income:</b>
            </div>
            <div>{currencyFormat(loggedInPlayer?.cashFlowDay)}</div>
          </FlexRow>
        </div>
      </StatContainer>
      <ChildContainer className="child">
        <div>
          <Header>Cashflow Day Income Record</Header>
          <ScrollContainer>
            <FlexRow>
              <div>
                <b>Title</b>
              </div>
              <div>
                <b>Cashflow</b>
              </div>
            </FlexRow>
            {(loggedInPlayer?.fastTrackAssets || []).map((item) => (
              <FlexRow key={item.id}>
                <div>{item.name}</div>
                <div>{currencyFormat(item.cashFlow)}</div>
              </FlexRow>
            ))}
          </ScrollContainer>
        </div>
      </ChildContainer>
    </FTContainer>
  );
};
