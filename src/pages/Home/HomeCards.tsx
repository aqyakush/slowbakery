import React from 'react';
import HomeCard from './HomeCard';

const cards = [
  {
    title: 'subscriptionTitle',
    description: 'subscriptionDescription',
    buttonText: 'subscriptionButton',
    imageSrc: 'https://bengbengsourdough.com/cdn/shop/files/Sourdough-Box.jpg',
    navigationPath: '/subscription',
    imageRight: false
  },
  {
    title: 'preorderTitle',
    description: 'preorderDescription',
    buttonText: 'preorderButton',
    imageSrc: 'https://www.mandai-design.com/cdn/shop/collections/bakery-shelving-bakery-display-bread-shelf-store-fixtures-mandai-design-8.jpg',
    navigationPath: '/preorder',
    imageRight: true
  },
  {
    title: 'makeYourOwnBreadTitle',
    description: 'makeYourOwnBreadDescription',
    buttonText: 'makeYourOwnBreadButton',
    imageSrc: 'https://goldbelly.imgix.net/uploads/showcase_media_asset/image/168467/GratefulBread-CYO-Header.jpg',
    navigationPath: '/make-your-own-bread',
    imageRight: false
  },
  {
    title: 'popUpShopTitle',
    description: 'popUpShopDescription',
    buttonText: 'popUpShopButton',
    imageSrc: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
    navigationPath: '/pop-up-shop',
    imageRight: true
  }
];
  


const HomeCards: React.FC = () => {  
  return (
    <>
      {cards.map((card, index) => (
        <HomeCard
          key={index}
          title={card.title}
          description={card.description}
          buttonText={card.buttonText}
          imageSrc={card.imageSrc}
          navigationPath={card.navigationPath}
          imageRight={card.imageRight}
        />
      ))}
    </>
  );
}

export default HomeCards;