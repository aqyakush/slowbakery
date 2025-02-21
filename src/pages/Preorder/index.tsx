import React from 'react';
import { Content, PageWrapper, Title } from '../../components/StyledComponets';
import Card from './Cards';
import PreorderedItemsCard from './PreorderedItemsCard';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useTranslation } from 'react-i18next';

interface BreadItem {
  title: string;
  image: string;
  description: string;
  ingredients: string;
  price: number;
}

const breadItems: BreadItem[] = [
  {
    title: 'Classic Sourdough',
    image: 'https://www.theperfectloaf.com/wp-content/uploads/2015/12/theperfectloaf-mybestsourdoughrecipe-title-1.jpg',
    description: 'classicSourdoughDescription',
    ingredients: 'classicSourdoughIngredients',
    price: 5,
  },
  {
    title: 'Sunflower and Sesame Bread',
    image: 'https://hillviewfarms.com.au/cdn/shop/files/Black-Sesame-sunflower-1080x675-1_1024x1024.jpg?v=1720687434',
    description: 'sunflowerSesameBreadDescription',
    ingredients: 'sunflowerSesameBreadIngredients',
    price: 6,
  },
  {
    title: 'Olive Bread',
    image: 'https://www.theperfectloaf.com/wp-content/uploads/2021/05/theperfectloaf-green-olive-and-herb-sourdough-bread-6.jpg',
    description: 'oliveBreadDescription',
    ingredients: 'oliveBreadIngredients',
    price: 7,
  },
];

export type PreorderedItem = { 
  name: string; 
  price: number; 
  quantity: number 
}

export default function Preorder() {
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
        {breadItems.map((item) => (
          <Card
            key={item.title}
            title={item.title}
            image={item.image}
            description={item.description}
            ingredients={item.ingredients}
            price={item.price}
            preordered={items.some((preorderedItem) => preorderedItem.name === item.title)}
            onPreorder={(quantity: number) => handlePreorder(item.title, item.price, quantity)}
          />
        ))}
          {items.length > 0 && <PreorderedItemsCard/>}
      </Content>
    </PageWrapper>
  );
}