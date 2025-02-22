import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import { QuantityInput } from './Cards';


const PreorderedCardWrapper = styled(motion.div)`
  position: fixed;
  top: 130px;
  right: 20px;
  width: 350px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PreorderedTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 16px 0;
`;

const PreorderedItemP = styled(motion.p)`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: #666;
  margin: 8px 0;
`;

export const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 16px 0;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 16px;
`;

const ShoppingCardLink = styled(NavLink)`
  display: inline-block;
  background-color: ${(props) => props.theme.textColor};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 16px;
  text-decoration: none;
  text-align: center;
`;

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

const PreorderedItemsCard: React.FC = () => {
  const { items, removeItem, updateItemQuantity } = useShoppingCart();
  const { t } = useTranslation('preorder');

  const handleRemoveItem = (name: string) => {
    removeItem(name);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      updateItemQuantity(id, quantity);
    }
  };
  
  const itemsText = items.map((item) => {
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
          <span>{totalPrice}€</span>
        </ItemDetails>
        <ItemActions>
          <RemoveButton onClick={() => handleRemoveItem(item.name)}>
            <FaTrash />
          </RemoveButton>
        </ItemActions>
      </>
    );
  } 
  );

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  return (
    <AnimatePresence>
      <PreorderedCardWrapper
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', duration: 1, bounce: 0.5
        }}
        layout
      >
        <PreorderedTitle>{t('preorderedItemsTitle')}</PreorderedTitle>
        <HorizontalLine />
        {itemsText.map((item, index) => (
          <PreorderedItemP
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            layout
          >
            {item}
          </PreorderedItemP>
        ))}
        <HorizontalLine />
        <TotalRow>
          <span>{t('total')}:</span>
          <span>{totalPrice}€</span>
        </TotalRow>
        <ShoppingCardLink to="/shopping-cart">
          {t('goToShoppingCart')}
        </ShoppingCardLink>
      </PreorderedCardWrapper>
    </AnimatePresence>
  );
};

export default PreorderedItemsCard;