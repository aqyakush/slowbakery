import React, { useState } from 'react';
import styled from 'styled-components';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useTranslation } from 'react-i18next';
import { BreadDataItem } from '../../data/bread';

const CardWrapper = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    height: 180px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  color: ${(props) => props.theme.textColor};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 8px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const CardIngredients = styled.p`
  font-size: 0.9rem;
  color: #999;
  margin: 8px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const CardPrice = styled.p`
  font-size: 1.2rem;
  color: #000;
  margin: 8px 0;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CardButton = styled.button<{ preordered: boolean }>`
  background-color: ${({ preordered, theme }) => (preordered ? theme.preorderedColor : theme.notPreorderedColor)};
  color: ${({ theme }) => theme.buttonTextColor};
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 16px;
  width: 100%;
  max-width: 200px;

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.95rem;
  }
`;

export const QuantityInput = styled.input`
  width: 60px;
  padding: 8px;
  margin-top: 16px;
  margin-right: 10px;
  font-size: 1rem;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 50px;
    padding: 6px;
    font-size: 0.95rem;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: auto;
  padding-top: 1rem;
`;


interface CardProps {
  item: BreadDataItem;
  preordered: boolean;
  onPreorder: (arg0: number) => void;
}

const Card: React.FC<CardProps> = ({ item, preordered, onPreorder, ...props }) => {
  const { title, image, description, ingredients, price } = item;
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
  
  return (
    <CardWrapper {...props}>
      <CardImage src={image} alt={title} />
      <CardContent>
        <CardTitle>{t(title)}</CardTitle>
        <CardDescription>{t(description)}</CardDescription>
        <CardIngredients>{t(ingredients)}</CardIngredients>
      </CardContent>
      <CardFooter>
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
      </CardFooter>
    </CardWrapper>);
};

export default Card;