import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { PopUpItem } from '../../data/popUpShop';
import { useTranslation } from 'react-i18next';

const CardWrapper = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: ${props => props.theme.cardBackground};
  max-width: 300px;
  margin: 0 auto;
`;

const CardImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    height: 140px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  color: ${props => props.theme.textColor};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.textColor};
  margin: 6px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const CardIngredients = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.textColor};
  opacity: 0.8;
  margin: 6px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const CardPrice = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.textColor};
  margin: 6px 0;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CardButton = styled.button<{ preordered: boolean }>`
  background-color: ${({ preordered, theme }) => (preordered ? theme.preorderedColor : theme.notPreorderedColor)};
  color: ${({ theme }) => theme.buttonTextColor};
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 12px;
  width: 100%;
  max-width: 180px;

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.85rem;
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  padding: 6px;
  margin-top: 12px;
  margin-right: 8px;
  font-size: 0.9rem;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 45px;
    padding: 4px;
    font-size: 0.85rem;
  }
`;

const AvailabilityText = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.textColor};
  margin: 6px 0;
  font-style: italic;
`;

interface PopUpItemCardProps {
  item: PopUpItem;
  eventId: number;
  eventTitle: string;
  eventDate: string;
}

const PopUpItemCard: React.FC<PopUpItemCardProps> = ({ item, eventId, eventTitle, eventDate }) => {
  const { items, addItem, removeItem, updateItemQuantity } = useShoppingCart();
  const { t } = useTranslation('popup');

  const itemId = `${eventId}-${item.id}`;
  const cartItem = items.find(i => i.name === itemId);
  const isPreordered = !!cartItem;
  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);

  useEffect(() => {
    // Update quantity when cart item changes
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.min(Number(e.target.value), item.available);
    setQuantity(newQuantity);
    
    if (isPreordered) {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const handlePreorder = () => {
    if (isPreordered) {
      removeItem(itemId);
      setQuantity(1);
    } else {
      const ids = [
        { namespace: 'popup', value: itemId },
        { namespace: 'event', value: eventTitle }
      ];
      addItem({
        ids,
        name: itemId,
        price: item.price,
        quantity,
        metadata: {
          eventTitle,
          eventDate,
          itemTitle: t(`${item.id}.title`)
        }
      });
    }
  };

  return (
    <CardWrapper>
      <CardImage src={item.image} alt={t(`${item.id}.title`)} />
      <CardTitle>{t(`${item.id}.title`)}</CardTitle>
      <CardDescription>{t(`${item.id}.description`)}</CardDescription>
      <CardIngredients>{t(`${item.id}.ingredients`)}</CardIngredients>
      <CardPrice>€{item.price.toFixed(2)}</CardPrice>
      <AvailabilityText>{t('available')}: {item.available}</AvailabilityText>
      <QuantityInput
        type="number"
        value={quantity}
        min="1"
        max={item.available}
        onChange={handleQuantityChange}
      />
      <CardButton preordered={isPreordered} onClick={handlePreorder}>
        {isPreordered ? t('removeFromOrder') : t('addToOrder')}
      </CardButton>
    </CardWrapper>
  );
};

export default PopUpItemCard;