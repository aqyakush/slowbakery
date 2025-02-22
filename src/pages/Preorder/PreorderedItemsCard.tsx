import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useTranslation } from 'react-i18next';


const PreorderedCardWrapper = styled(motion.div)`
  position: fixed;
  top: 130px;
  right: 20px;
  width: 300px;
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
  background-color: ${(props) => props.theme.shoppingCardLink};
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

const PreorderedItemsCard: React.FC = () => {
  const { items } = useShoppingCart();
  const { t } = useTranslation('preorder');
  const itemsText = items.map((item) => {
    const totalPrice = (item.price * item.quantity).toFixed(2);
    return (
      <>
        <span>{t(item.name)}  {item.quantity}pcs</span>
        <span>{totalPrice}€</span>
      </>);
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
          {/* FIXME: Add posibility to remove items from the preordered list and change amount */}
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