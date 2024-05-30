import styled from "styled-components";
import { BoardPositions, OuterBoardPositions } from "../utility/board";
import { BoardDiv } from "../components/Card";
import { InnerBox } from "./InnerBox";
import { useMemo } from "react";

const Framer = styled.div`
  display: grid;
  // grid: 120px repeat(5, 120px) 120px/100px repeat(13, 100px) 100px;
  grid-template-rows: repeat(7, 1fr);
  grid-template-columns: repeat(15, 1fr);
  position: relative;
  padding: 1rem 2rem;
  grid-gap: 4px;
  height: 100vh;
  width: 100%;
`;

const Center = styled.div`
  grid-row: span 5;
  grid-column: span 13;
  position: relative;
  border-radius: 4px;
  padding: 10px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const OuterBox = ({ players }) => {
  const { outerBoardWithPositions, innerBoardWithPositions } = useMemo(() => {
    const outerBoardWithPositions = OuterBoardPositions.map((item, index) => {
      const positions = (players || [])
        .filter(
          (x) =>
            x.fastTrack &&
            !x.lose &&
            !x.left &&
            (x.position === 1 ? x.position - 1 : x.position) === index,
        )
        .map((x) => ({
          id: x.id,
          color: x.color,
          name: x.name,
          jobTitle: x.jobTitle
        }));
      return {
        ...item,
        positions,
      };
    });
    const innerBoardWithPositions = BoardPositions.map((item, index) => {
      const positions = (players || [])
        .filter(
          (x) =>
            !x.fastTrack &&
            !x.lose &&
            !x.left &&
            (x.position === 1 ? x.position - 1 : x.position) === index,
        )
        .map((x) => ({
          id: x.id,
          color: x.color,
          name: x.name,
          jobTitle: x.jobTitle
        }));
      return {
        ...item,
        positions,
      };
    });
    return {
      outerBoardWithPositions,
      innerBoardWithPositions,
    };
  }, [players]);

  return (
    <Framer>
      {outerBoardWithPositions.map((item) => (
        <BoardDiv key={`${item.row}${item.pos}`} item={item} />
      ))}

      <Center style={{ order: 17 }}>
        <Container>
          <InnerBox boxes={innerBoardWithPositions} />
        </Container>
      </Center>
    </Framer>
  );
};
