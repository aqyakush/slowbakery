import React from 'react';
import styled from 'styled-components';

const PreorderedCardWrapper = styled.div`
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

const PreorderedItem = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 8px 0;
`;

interface PreorderedItemsCardProps {
  items: string[];
}

const PreorderedItemsCard: React.FC<PreorderedItemsCardProps> = ({ items }) => {
  return (
    <PreorderedCardWrapper>
      <PreorderedTitle>Pre-ordered Items</PreorderedTitle>
      {items.map((item, index) => (
        <PreorderedItem key={index}>{item}</PreorderedItem>
      ))}
    </PreorderedCardWrapper>
  );
};

export default PreorderedItemsCard;