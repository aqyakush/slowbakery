import React from 'react';
import { Content, PageWrapper, Title } from '../../components/StyledComponets';
import Card from './Cards';
import PreorderedItemsCard from './PreorderedItemsCard';

interface BreadItem {
  title: string;
  image: string;
  description: string;
  ingredients: string;
  price: string;
}

const breadItems: BreadItem[] = [
  {
    title: 'Classic Sourdough',
    image: 'https://www.theperfectloaf.com/wp-content/uploads/2015/12/theperfectloaf-mybestsourdoughrecipe-title-1.jpg',
    description: 'A classic sourdough bread with a crispy crust and soft interior.',
    ingredients: 'Flour, Water, Salt, Sourdough Starter',
    price: '€5.00',
  },
  {
    title: 'Sunflower and Sesame Bread',
    image: 'https://hillviewfarms.com.au/cdn/shop/files/Black-Sesame-sunflower-1080x675-1_1024x1024.jpg?v=1720687434',
    description: 'A delicious bread with sunflower and sesame seeds.',
    ingredients: 'Flour, Water, Salt, Sunflower Seeds, Sesame Seeds',
    price: '€6.00',
  },
  {
    title: 'Olive Bread',
    image: 'https://www.theperfectloaf.com/wp-content/uploads/2021/05/theperfectloaf-green-olive-and-herb-sourdough-bread-6.jpg',
    description: 'A flavorful bread with olives.',
    ingredients: 'Flour, Water, Salt, Olives',
    price: '€7.00',
  },
];

export default function Preorder() {
  const [preorderedItems, setPreorderedItems] = React.useState<string[]>([]);

  const handlePreorder = (item: string) => {
    setPreorderedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
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
            preordered={preorderedItems.includes(item.title)}
            onPreorder={() => handlePreorder(item.title)}
          />
        ))}
        {preorderedItems.length > 0 && <PreorderedItemsCard items={preorderedItems} />}
      </Content>
    </PageWrapper>
  );
}