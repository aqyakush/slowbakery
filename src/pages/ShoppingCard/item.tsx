import React from 'react';
import { CartItemId, ShoppingCartItem, useShoppingCart } from '../../context/ShoppingCartContext';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import { TFunction } from 'i18next';

const ItemDetails = styled.div`
  display: flex;
  flex-direction: row; /* Changed to row to align items in a line */
  align-items: center;
  gap: 8px; 
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ItemName = styled.span`
`;

const ActionButton = styled.button`
  background-color: ${(props) => props.theme.removeItem};
  color: ${(props) => props.theme.textColor};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 4px 8px;
`;

const RemoveButton = styled(ActionButton)`
  color: ${(props) => props.theme.removeItem};;
  background-color: white
`;

const QuantityInput = styled.input`
  width: 50px;
  padding: 5px;
  margin-right: 10px;
  font-size: 1rem;
  text-align: center;
`;

type ItemProps = {
    item: ShoppingCartItem;
    key: string;
}

export const createTranslatedString = (t: TFunction, ids: CartItemId[]) => {
  const flourType = ids[0];
  const flourTranslation = t(flourType.value, { ns: flourType.namespace });
  
  const fillings = ids.slice(1);
  if (fillings.length === 0) {
    return flourTranslation;
  }

  const fillingTranslations = fillings.map(id => 
    t(id.value, { ns: id.namespace })
  ).join(', ');

  return t('customBreadWithFillings', { 
    flourType: flourTranslation,
    fillings: fillingTranslations,
    ns: 'makeyourownbread'
  });
};

const Item: React.FC<ItemProps> = ({ item }) => {
  const { removeItem, updateItemQuantity } = useShoppingCart();
  const { t } = useTranslation(['preorder', 'makeyourownbread']);

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      updateItemQuantity(id, quantity);
    }
  };

  const name = React.useMemo(() => createTranslatedString(t, item.ids), [item.ids, t]);

  const totalPrice = (item.price * item.quantity).toFixed(2);
  return (
    <>
      <ItemDetails>
        <ItemName>{name}</ItemName>
      </ItemDetails>
      <ItemActions>
        <QuantityInput
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(item.name, parseInt(e.target.value))}
        />
        <span>{totalPrice}€</span>
        <RemoveButton onClick={() => removeItem(item.name)}>
          <FaTrash />
        </RemoveButton>
      </ItemActions>
    </>
  );
};


export default Item;