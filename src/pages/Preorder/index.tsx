import React from 'react';
import { Content, PageWrapper, Title } from '../../components/StyledComponets';
import Card from './Cards';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useTranslation } from 'react-i18next';
import { BREAD_ITEMS } from '../../data/bread';
import PreorderedItemsCard from './PreorderedItemsCard';

export type PreorderedItem = { 
  name: string; 
  price: number; 
  quantity: number 
}

const Preorder: React.FC = () => {
  const { items, addItem, removeItem } = useShoppingCart();
  const { t } = useTranslation('preorder');

  const handlePreorder = (name: string, price: number, quantity: number) => {
    const existingItem = items.find((item) => item.name === name);
    if (existingItem) {
      removeItem(name);
    } else {
      addItem({ name, price, quantity });
    }
  };

  return (
    <PageWrapper>
      <Title>{t('preorderTitle')}</Title>
      <Content>
        <p>{t('preorderWelcomeMessage')}</p>
        {BREAD_ITEMS.map((item) => (
          <Card
            key={item.title}
            item={item}
            preordered={items.some((preorderedItem) => preorderedItem.name === item.title)}
            onPreorder={(quantity: number) => handlePreorder(item.title, item.price, quantity)}
          />
        ))}
        {items.length > 0 && <PreorderedItemsCard/>}
      </Content>
    </PageWrapper>
  );
}

export default Preorder;