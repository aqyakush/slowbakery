import React from 'react';
import styled from 'styled-components';
import PopUpCard from './PopUpCard';

// Sample data for pop-up shops
const popUpEvents = [
  {
    id: 1,
    title: 'Downtown Market Pop-up',
    location: '123 Market Street, Downtown',
    date: '2024-04-15',
    time: '10:00 AM - 4:00 PM',
    description: 'Join us at the vibrant downtown market for fresh sourdough bread and pastries.',
    imageSrc: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
    disabled: false,
  },
  {
    id: 2,
    title: 'Farmers Market Special',
    location: '456 Farm Road, Countryside',
    date: '2024-04-22',
    time: '8:00 AM - 2:00 PM',
    description: 'Experience our artisanal bread selection at the local farmers market.',
    imageSrc: 'https://images.unsplash.com/photo-1556471013-0001958d2f12?q=80&w=1000&auto=format&fit=crop',
    disabled: true,
  },
  {
    id: 3,
    title: 'Food Festival Pop-up',
    location: '789 Festival Plaza',
    date: '2024-04-29',
    time: '11:00 AM - 6:00 PM',
    description: 'Special bread varieties and demonstrations at the annual food festival.',
    imageSrc: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop',
    disabled: false,
  }
];

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PopUpCards: React.FC = () => {
  return (
    <CardsContainer>
      {popUpEvents.map((event) => (
        <PopUpCard
          key={event.id}
          event={event}
        />
      ))}
    </CardsContainer>
  );
};

export default PopUpCards; 