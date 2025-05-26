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