import React, { useState } from 'react';
import styled from 'styled-components';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useTranslation } from 'react-i18next';

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
  background-color: ${({ preordered, theme }) => (preordered ? theme.preorderedColor : theme.notPreorderedColor)};
  color: ${({ theme }) => theme.buttonTextColor};
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 16px;
`;

const QuantityInput = styled.input`
  width: 50px;
  padding: 5px;
  margin-top: 16px;
  margin-right: 10px;
  font-size: 1rem;
  text-align: center;
`;

interface CardProps {
  title: string;
  image: string;
  description: string;
  ingredients: string;
  price: number;
  preordered: boolean;
  onPreorder: (arg0: number) => void;
}

const Card: React.FC<CardProps> = ({ title, image, description, ingredients, price, preordered, onPreorder }) => {
  const { t } = useTranslation('preorder');
  const { items } = useShoppingCart();
  const [quantity, setQuantity] = useState(items.find((item) => item.name === title)?.quantity || 1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
  };

  const handlePreorder = () => {
    onPreorder(quantity);
  };
  
  return (<CardWrapper>
    <CardImage src={image} alt={title} />
    <CardContent>
      <CardTitle>{t(title)}</CardTitle>
      <CardDescription>{t(description)}</CardDescription>
      <CardIngredients>{t(ingredients)}</CardIngredients>
      <CardPrice>€{price.toFixed(2)}</CardPrice>
      <QuantityInput
          type="number"
          value={quantity}
          min="1"
          onChange={handleQuantityChange}
          disabled={preordered}
      />
      <CardButton preordered={preordered} onClick={handlePreorder}>
          {preordered ? t('removeFromOrder') : t('addToOrder')}
      </CardButton>
    </CardContent>
  </CardWrapper>);
};

export default Card;