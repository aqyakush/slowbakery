import styled from "styled-components"
import { Button } from "./StyledComponets";

export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Card = styled.div`
  background-color: #FEE995;
  border-radius: 10px;
  padding: 20px;
  flex: 1;
  margin: 0 10px;
  text-align: left;
`;

export const CardButton = styled(Button)`
`;

export const ThankYouCard = styled.div`
  background-color: #FEE995;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ThankYouText = styled.p`
  font-weight: bold;
  color: #92400e;
`;