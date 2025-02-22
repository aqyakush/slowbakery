import React from 'react';
import { styled } from 'styled-components';

export const ThankYouCard = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ThankYouText = styled.p`
  font-weight: bold;
  color: ${(props) => props.theme.textColor}
`;

type ThankyouMessageProps = {
    message: string;
}

const ThankyouMessage: React.FC<ThankyouMessageProps> = ({ message }) => {
    return (
        <ThankYouCard>
            <ThankYouText>{message}</ThankYouText>
        </ThankYouCard>
    );
};

export default ThankyouMessage;