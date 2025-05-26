import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PageWrapper } from '../../components/StyledComponets';

// Using the same sample data from PopUpCards
const popUpEvents = [
  {
    id: 1,
    title: 'Downtown Market Pop-up',
    location: '123 Market Street, Downtown',
    date: '2024-04-15',
    time: '10:00 AM - 4:00 PM',
    description: 'Join us at the vibrant downtown market for fresh sourdough bread and pastries.',
    imageSrc: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
    fullDescription: 'Experience the warmth and aroma of freshly baked bread at our downtown market pop-up. We\'ll be featuring our signature sourdough varieties, artisanal pastries, and special market-day treats. Come early for the best selection, as our products tend to sell out quickly!',
    mapLocation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71774937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2sBrooklyn%20Bridge!5b1!3m2!1sen!2sus!4v1579814256969!5m2!1sen!2sus'
  },
  {
    id: 2,
    title: 'Farmers Market Special',
    location: '456 Farm Road, Countryside',
    date: '2024-04-22',
    time: '8:00 AM - 2:00 PM',
    description: 'Experience our artisanal bread selection at the local farmers market.',
    imageSrc: 'https://images.unsplash.com/photo-1556471013-0001958d2f12?q=80&w=1000&auto=format&fit=crop',
    fullDescription: 'Join us at the local farmers market for a special selection of our artisanal breads. We\'ll be bringing our popular country loaf, whole grain varieties, and seasonal specials. Perfect opportunity to pair our breads with fresh local produce!',
    mapLocation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71774937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2sBrooklyn%20Bridge!5b1!3m2!1sen!2sus!4v1579814256969!5m2!1sen!2sus'
  },
  {
    id: 3,
    title: 'Food Festival Pop-up',
    location: '789 Festival Plaza',
    date: '2024-04-29',
    time: '11:00 AM - 6:00 PM',
    description: 'Special bread varieties and demonstrations at the annual food festival.',
    imageSrc: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop',
    fullDescription: 'We\'re excited to be part of this year\'s food festival! Stop by our booth for bread-making demonstrations, tastings, and special festival-only offerings. Learn about our baking process and the story behind our sourdough starter.',
    mapLocation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71774937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2sBrooklyn%20Bridge!5b1!3m2!1sen!2sus!4v1579814256969!5m2!1sen!2sus'
  }
];

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.textColor};
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const EventInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  h1 {
    margin: 0 0 1rem 0;
    color: ${props => props.theme.textColor};
  }

  p {
    line-height: 1.6;
    color: ${props => props.theme.textColor};
    margin-bottom: 1.5rem;
  }
`;

const Sidebar = styled.div`
  background: ${props => props.theme.cardBackground};
  padding: 1.5rem;
  border-radius: 8px;
  height: fit-content;
`;

const DetailItem = styled.div`
  margin-bottom: 1rem;

  h3 {
    margin: 0 0 0.5rem 0;
    color: ${props => props.theme.textColor};
  }

  p {
    margin: 0;
    color: ${props => props.theme.secondaryColor};
  }
`;

const MapContainer = styled.div`
  margin-top: 2rem;
  
  iframe {
    width: 100%;
    height: 300px;
    border: none;
    border-radius: 8px;
  }
`;

const PopUpDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = popUpEvents.find(e => e.id === Number(id));

  if (!event) {
    return (
      <PageWrapper>
        <Container>
          <h1>Event not found</h1>
          <BackButton onClick={() => navigate('/pop-up-shop')}>← Back to Pop-up Shops</BackButton>
        </Container>
      </PageWrapper>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <PageWrapper>
      <Container>
        <BackButton onClick={() => navigate('/pop-up-shop')}>← Back to Pop-up Shops</BackButton>
        <HeroImage src={event.imageSrc} alt={event.title} />
        <EventInfo>
          <MainContent>
            <h1>{event.title}</h1>
            <p>{event.fullDescription}</p>
          </MainContent>
          <Sidebar>
            <DetailItem>
              <h3>Date</h3>
              <p>{formatDate(event.date)}</p>
            </DetailItem>
            <DetailItem>
              <h3>Time</h3>
              <p>{event.time}</p>
            </DetailItem>
            <DetailItem>
              <h3>Location</h3>
              <p>{event.location}</p>
            </DetailItem>
          </Sidebar>
        </EventInfo>
        <MapContainer>
          <iframe
            src={event.mapLocation}
            title="Event Location"
            allowFullScreen
          />
        </MapContainer>
      </Container>
    </PageWrapper>
  );
};

export default PopUpDetails; 