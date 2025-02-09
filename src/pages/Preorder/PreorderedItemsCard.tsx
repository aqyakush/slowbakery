import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { PreorderedItem } from './index';
import { NavLink } from 'react-router-dom';


const PreorderedCardWrapper = styled(motion.div)`
  position: fixed;
  top: 20px;
  left: 20px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
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
  background-color: #4CAF50;
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

interface PreorderedItemsCardProps {
  items: PreorderedItem[];
}

const PreorderedItemsCard: React.FC<PreorderedItemsCardProps> = ({ items }) => {
  const itemsText = items.map((item) => {
    const totalPrice = (item.price * item.quantity).toFixed(2);
    return (
      <>
        <span>{item.name}  {item.quantity}pcs</span>
        <span>{totalPrice}€</span>
      </>);
  } 
  );

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <AnimatePresence>
      <PreorderedCardWrapper
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', duration: 1, bounce: 0.5
      }}
        layout
      >
          <PreorderedTitle>Pre-ordered Items</PreorderedTitle>
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
            <span>Total:</span>
            <span>{totalPrice}€</span>
          </TotalRow>
          <ShoppingCardLink to="/shopping-cart">
            Go to shopping cart
          </ShoppingCardLink>
      </PreorderedCardWrapper>
    </AnimatePresence>
  );
};

export default PreorderedItemsCard;