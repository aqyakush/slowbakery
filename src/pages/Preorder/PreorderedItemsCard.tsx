import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

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

const PreorderedItem = styled(motion.p)`
  font-size: 1rem;
  color: #666;
  margin: 8px 0;
`;

const CreateOrderButton = styled(motion.button)`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 16px;
`;

interface PreorderedItemsCardProps {
  items: string[];
}

const PreorderedItemsCard: React.FC<PreorderedItemsCardProps> = ({ items }) => {
  const navigate = useNavigate();


  const handleCreateOrder = () => {
    navigate('/preorder/create-order', { state: { items } });
  };

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
          {items.map((item, index) => (
            <PreorderedItem
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              layout
            >
              {item}
            </PreorderedItem>
          ))}
            <CreateOrderButton onClick={handleCreateOrder} layout>
              Create Order
            </CreateOrderButton>
      </PreorderedCardWrapper>
    </AnimatePresence>
  );
};

export default PreorderedItemsCard;