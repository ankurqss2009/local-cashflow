import styled from "styled-components";
import { CenterBoxData } from "../utility/board";
import { BoardDiv } from "../components/Card";

const Framer = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(9, 1fr);
  position: relative;
  grid-gap: 4px;
`;

const Center = styled.div`
  grid-row: span 3;
  grid-column: span 7;
  position: relative;
  border-radius: 4px;
  align-self: center;
  justify-self: center;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4px;
`;

export const InnerBox = ({ boxes }) => {
  return (
    <Framer>
      {boxes.map((item) => (
        <BoardDiv key={`${item.row}_${item.pos}`} item={item} />
      ))}

      <Center style={{ order: 11 }}>
        <Container>
          {CenterBoxData.map((item) => (
            <BoardDiv key={`${item.text}`} item={item} />
          ))}
        </Container>
      </Center>
    </Framer>
  );
};
