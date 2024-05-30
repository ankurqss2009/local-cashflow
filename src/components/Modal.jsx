import Draggable from "react-draggable";
import styled from "styled-components";

const Container = styled.div`
  z-index: 2;
  min-height: 250px;
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
  max-width: 30vw;
  cursor: move;
  h1 {
    font-size: 1.2rem;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 1;
`;

export const CustomModal = ({ children }) => {
  return (
    <Draggable>
      <Container>{children}</Container>
    </Draggable>
  );
};
