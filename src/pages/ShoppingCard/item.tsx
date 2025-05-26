import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ShoppingCartItem, useShoppingCart } from '../../context/ShoppingCartContext';
import { FaTrash } from 'react-icons/fa';

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ItemName = styled.span`
  font-weight: 500;
  color: ${props => props.theme.textColor};
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityInput = styled.input`
  width: 50px;
  padding: 0.25rem;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.removeItem};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;

interface ItemProps {
  item: ShoppingCartItem;
}

interface TranslationId {
  namespace: string;
  value: string;
}

export const createTranslatedString = (t: any, ids?: TranslationId[]) => {
  if (!ids || ids.length === 0) return '';

  return ids.map(id => {
    if (id.namespace === 'popup') return '';
    if (id.namespace === 'event') return '';
    return t(id.value, { ns: id.namespace });
  }).filter(Boolean).join(' + ');
};

const Item: React.FC<ItemProps> = ({ item }) => {
  const { removeItem, updateItemQuantity } = useShoppingCart();
  const { t } = useTranslation(['preorder', 'makeyourownbread', 'popup']);

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      updateItemQuantity(id, quantity);
    }
  };

  const displayName = item.metadata?.itemTitle || createTranslatedString(t, item.ids);

  return (
    <>
      <ItemDetails>
        <ItemName>{displayName}</ItemName>
      </ItemDetails>
      <ItemActions>
        <QuantityInput
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(item.name, parseInt(e.target.value))}
        />
        <span>€{(item.price * item.quantity).toFixed(2)}</span>
        <RemoveButton onClick={() => removeItem(item.name)}>
          <FaTrash />
        </RemoveButton>
      </ItemActions>
    </>
  );
};

export default Item;