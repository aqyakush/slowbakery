import React from 'react';
import { ShoppingCartItem, useShoppingCart } from '../../context/ShoppingCartContext';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';

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

const Item: React.FC<ItemProps> = ({ item }) => {
  const { removeItem, updateItemQuantity } = useShoppingCart();
  const { t } = useTranslation('preorder');

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      updateItemQuantity(id, quantity);
    }
  };

  const totalPrice = (item.price * item.quantity).toFixed(2);
  return (
    <>
      <ItemDetails>
        <span>{t(item.name)}</span>
        <QuantityInput
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(item.name, parseInt(e.target.value))}
        />
      </ItemDetails>
      <ItemActions>
        <span>{totalPrice}€</span>
        <RemoveButton onClick={() => removeItem(item.name)}>
          <FaTrash />
        </RemoveButton>
      </ItemActions>
    </>
  );
};


export default Item;