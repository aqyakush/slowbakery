export type BreadDataItem = {
    id: string;
    title: string;
    image: string;
    description: string;
    ingredients: string;
    price: number;
  }
  
export const BREAD_ITEMS: BreadDataItem[] = [
  {
    id: 'Classic Sourdough',
    title: 'Classic Sourdough',
    image: 'https://www.theperfectloaf.com/wp-content/uploads/2015/12/theperfectloaf-mybestsourdoughrecipe-title-1.jpg',
    description: 'classicSourdoughDescription',
    ingredients: 'classicSourdoughIngredients',
    price: 5,
  },
  {
    id: 'Sunflower and Sesame Bread',
    title: 'Sunflower and Sesame Bread',
    image: 'https://hillviewfarms.com.au/cdn/shop/files/Black-Sesame-sunflower-1080x675-1_1024x1024.jpg?v=1720687434',
    description: 'sunflowerSesameBreadDescription',
    ingredients: 'sunflowerSesameBreadIngredients',
    price: 6,
  },
  {
    id: 'Olive Bread',
    title: 'Olive Bread',
    image: 'https://www.theperfectloaf.com/wp-content/uploads/2021/05/theperfectloaf-green-olive-and-herb-sourdough-bread-6.jpg',
    description: 'oliveBreadDescription',
    ingredients: 'oliveBreadIngredients',
    price: 7,
  },
];