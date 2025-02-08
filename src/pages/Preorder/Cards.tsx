import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px auto; /* Center the card horizontally */
  text-align: left;
  max-width: 600px; /* Set a maximum width for the card */
`;

const CardImage = styled.img`
  width: 400px;
  height: auto;
  border-radius: 8px;
  margin-right: 16px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 0; /* Remove default margin */
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 8px 0; /* Add margin for spacing */
`;

const CardIngredients = styled.p`
  font-size: 0.9rem;
  color: #999;
  margin: 8px 0; /* Add margin for spacing */
`;

const CardPrice = styled.p`
  font-size: 1.2rem;
  color: #000;
  margin: 8px 0; /* Add margin for spacing */
`;

const CardButton = styled.button<{ preordered: boolean }>`
  background-color: ${({ preordered }) => (preordered ? '#008CBA' : '#4CAF50')};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 16px;
`;

interface CardProps {
  title: string;
  image: string;
  description: string;
  ingredients: string;
  price: string;
  preordered: boolean;
  onPreorder: () => void;
}

const Card: React.FC<CardProps> = ({ title, image, description, ingredients, price, preordered, onPreorder }) => (
  <CardWrapper>
    <CardImage src={image} alt={title} />
    <CardContent>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <CardIngredients>{ingredients}</CardIngredients>
      <CardPrice>{price}</CardPrice>
      <CardButton preordered={preordered} onClick={onPreorder}>
        {preordered ? 'Remove from order' : 'Add to order'}
      </CardButton>
    </CardContent>
  </CardWrapper>
);

export default Card;