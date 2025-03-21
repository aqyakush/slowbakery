import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import Item from '../ShoppingCard/item';

const PreorderedCardWrapper = styled(motion.div)`
  position: fixed;
  width: 350px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  /* Desktop positioning */
  @media (min-width: 769px) {
    top: 130px;
    right: 20px;
  }

  /* Mobile positioning */
  @media (max-width: 768px) {
    width: 80%;
    left: 5%;
    bottom: 20px;
    transform: translateX(-50%);
    max-height: 80vh;
    overflow-y: auto;
  }
`;

const PreorderedTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 16px 0;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const PreorderedItemP = styled(motion.p)`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: #666;
  margin: 8px 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
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

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
`;

const TextButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.linkColor || '#0066cc'};
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    opacity: 0.8;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const PreorderedItemsCard: React.FC = () => {
  const { items, isShoppingCardVisible, setIsShoppingCardVisible } = useShoppingCart();
  const { t } = useTranslation('preorder');
  
  const itemComponents = React.useMemo(() => items.map((item) => {
    return (
      <Item item={item} key={item.name} />
    );
  }), [items]);

  if (!isShoppingCardVisible) return null;

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
        {itemComponents.map((item, index) => (
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
        <ButtonsContainer>
          <ShoppingCardLink to="/shopping-cart">
            {t('goToShoppingCart')}
          </ShoppingCardLink>
          <TextButton onClick={() => setIsShoppingCardVisible(false)}>
            {t('continueShopping')}
          </TextButton>
        </ButtonsContainer>
      </PreorderedCardWrapper>
    </AnimatePresence>
  );
};

export default PreorderedItemsCard;