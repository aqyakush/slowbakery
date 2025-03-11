import React from 'react';
import { Content, PageWrapper, Title } from '../../components/StyledComponets';
import Card from './Cards';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useTranslation } from 'react-i18next';
import { BREAD_ITEMS } from '../../data/bread';
import PreorderedItemsCard from './PreorderedItemsCard';
import { styled } from 'styled-components';

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1.5rem;
  }
`;

export type PreorderedItem = { 
  name: string; 
  price: number; 
  quantity: number 
}

const NAMESPACE = 'preorder';

const Preorder: React.FC = () => {
  const { items, addItem, removeItem } = useShoppingCart();
  const { t } = useTranslation(NAMESPACE);

  const handlePreorder = (name: string, price: number, quantity: number) => {
    const existingItem = items.find((item) => item.name === name);
    if (existingItem) {
      removeItem(name);
    } else {
      const ids = [ { namespace: NAMESPACE, value: name} ]
      addItem({ ids, name, price, quantity });
    }
  };

  return (
    <PageWrapper>
      <Title>{t('preorderTitle')}</Title>
      <Content>
        <p>{t('preorderWelcomeMessage')}</p>
        <CardGrid>
          {BREAD_ITEMS.map((item) => (
            <Card
              key={item.title}
              item={item}
              preordered={items.some((preorderedItem) => preorderedItem.name === item.title)}
              onPreorder={(quantity: number) => handlePreorder(item.title, item.price, quantity)}
            />
          ))}
          {items.length > 0 && <PreorderedItemsCard/>}
        </CardGrid>
      </Content>
    </PageWrapper>
  );
}

export default Preorder;