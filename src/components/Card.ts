import styled from "styled-components"
import { Button } from "./StyledComponets";

export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Card = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 10px;
  padding: 20px;
  flex: 1;
  margin: 0 10px;
  text-align: left;
`;

export const CardButton = styled(Button)`
`;

