import styled from "styled-components";
import ManIcon from "@mui/icons-material/Man";
import {PlayerJobTypeIcon} from '../utility'
const CardBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  padding: 5px;
  flex-direction: column;
  position: relative;
  grid-column: span 1;
  order: ${({ order }) => order};
  background: ${({ bgcolor }) => bgcolor};
  border: 1px solid ${({ bordercolor, bgcolor }) => bordercolor || bgcolor};
  color: ${({ textcolor }) => textcolor};

  svg {
    width: 40px;
    height: 40px;
    margin: 0.2rem;
  }

  &.br-right-bottom {
    border-bottom-right-radius: 16px;
  }
  &.br-left-bottom {
    border-bottom-left-radius: 16px;
  }
  &.br-left {
    border-top-left-radius: 16px;
  }
  &.br-right {
    border-top-right-radius: 16px;
  }
`;

const CardText = styled.div`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0em;
  text-align: center;
`;

const PositionParentContainer = styled.div`
  border-radius: 6px;
  display: flex;
  align-items: center;
  bottom: 0;
  position: absolute;
  gap: 2px;
`;

const PositionContainer = styled.div`
  height: 12px;
  width: 12px;
  background: ${({ color }) => color};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6px;
  font-weight: bold;
`;


const UserPos = ({ color, name, jobTitle, index }) => {
  let obj = PlayerJobTypeIcon.find(item => item.jobType === jobTitle)  
  return (
    <PositionContainer color={color} title={name}>      
      <div style={{marginRight: "10px" }}>{obj?.icon}</div>     
    </PositionContainer>
  );
};

export const BoardDiv = ({ item }) => {
  return (
    <CardBox
      order={item.pos}
      bgcolor={item.bgcolor}
      className={item.className || ""}
      bordercolor={item.borderColor}
      textcolor={item.textColor}
    >
      <CardText>{item.text || item.name}</CardText>
      {item.icon}
      {item.subText && <CardText>{item.subText}</CardText>}
      {(item.positions || []).length > 0 && (
        <PositionParentContainer>
          {item.positions.map((pos, index) => (
            <UserPos
              key={pos.id}
              color={pos.color}
              name={pos.name}
              jobTitle={pos.jobTitle}
              index={index}
            />
          ))}
        </PositionParentContainer>
      )}
    </CardBox>
  );
};
