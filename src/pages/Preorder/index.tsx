import React from 'react';
import { Content, PageWrapper, Title } from '../../components/StyledComponets';
import Card from './Cards';
import PreorderedItemsCard from './PreorderedItemsCard';

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
    description: 'A classic sourdough bread with a crispy crust and soft interior.',
    ingredients: 'Flour, Water, Salt, Sourdough Starter',
    price: 5,
  },
  {
    title: 'Sunflower and Sesame Bread',
    image: 'https://hillviewfarms.com.au/cdn/shop/files/Black-Sesame-sunflower-1080x675-1_1024x1024.jpg?v=1720687434',
    description: 'A delicious bread with sunflower and sesame seeds.',
    ingredients: 'Flour, Water, Salt, Sunflower Seeds, Sesame Seeds',
    price: 6,
  },
  {
    title: 'Olive Bread',
    image: 'https://www.theperfectloaf.com/wp-content/uploads/2021/05/theperfectloaf-green-olive-and-herb-sourdough-bread-6.jpg',
    description: 'A flavorful bread with olives.',
    ingredients: 'Flour, Water, Salt, Olives',
    price: 7,
  },
];

export type PreorderedItem = { 
  name: string; 
  price: number; 
  quantity: number 
}

export default function Preorder() {
  const [preorderedItems, setPreorderedItems] = React.useState<PreorderedItem[]>([]);

  const handlePreorder = (name: string, price: number, quantity: number) => {
    setPreorderedItems((prevItems) =>{
      const existingItem = prevItems.find((item) => item.name === name);
      if (existingItem) {
        // Remove the item if it exists
        return prevItems.filter((item) => item.name !== name);
      } else {
        // Add the item if it does not exist
        return [...prevItems, { name, price, quantity }];
      }
    });
  };

  return (
    <PageWrapper>
      <Title>Preorder</Title>
      <Content>
        <p>Welcome to our preorder page. Here you can place orders for special items or upcoming events.</p>
        {breadItems.map((item) => (
          <Card
            key={item.title}
            title={item.title}
            image={item.image}
            description={item.description}
            ingredients={item.ingredients}
            price={item.price}
            preordered={preorderedItems.some((preorderedItem) => preorderedItem.name === item.title)}
            onPreorder={(quantity: number) => handlePreorder(item.title, item.price, quantity)}
          />
        ))}
          {preorderedItems.length > 0 && <PreorderedItemsCard items={preorderedItems} />}
      </Content>
    </PageWrapper>
  );
}