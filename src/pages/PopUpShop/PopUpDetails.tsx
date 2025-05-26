import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PageWrapper } from '../../components/StyledComponets';
import { POP_UP_EVENTS } from '../../data/popUpShop';
import PreorderedItemsCard from '../Preorder/PreorderedItemsCard';
import PopUpItemCard from './PopUpItemCard';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
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

const EventHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
    gap: 1rem;
  }
`;

const HeroImageWrapper = styled.div`
  height: 250px;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const Sidebar = styled.div`
  background: ${props => props.theme.cardBackground};
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    height: auto;
    min-height: 200px;
    padding: 1.25rem;
  }
`;

const DetailItem = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  h3 {
    margin: 0 0 0.5rem 0;
    color: ${props => props.theme.textColor};
    font-size: 1.1rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: ${props => props.theme.secondaryColor};
    font-size: 1rem;
    line-height: 1.4;
  }
`;

const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const MainContent = styled.div`
  h1 {
    margin: 0 0 1rem 0;
    color: ${props => props.theme.textColor};
    font-size: 1.8rem;
  }

  p {
    line-height: 1.6;
    color: ${props => props.theme.textColor};
    margin: 0;
    font-size: 1rem;
  }
`;

const MapContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
  min-height: 200px;
  background: ${props => props.theme.cardBackground};
  
  iframe {
    width: 100%;
    height: 100%;
    min-height: 200px;
    border: none;
  }
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 2rem auto;
  max-width: 1000px;
  padding: 0 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(250px, 350px));
    justify-content: center;
  }
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.textColor};
  margin: 2rem 0 1rem;
  font-size: 1.5rem;
`;

const PopUpDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = POP_UP_EVENTS.find(e => e.id === Number(id));

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
        <EventHeader>
          <HeroImageWrapper>
            <HeroImage src={event.imageSrc} alt={event.title} />
          </HeroImageWrapper>
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
        </EventHeader>
        <ContentSection>
          <MainContent>
            <h1>{event.title}</h1>
            <p>{event.fullDescription}</p>
          </MainContent>
          <MapContainer>
            <iframe
              src={event.mapLocation}
              title="Event Location"
              allowFullScreen
            />
          </MapContainer>
        </ContentSection>
        <SectionTitle>Available Items for Pre-order</SectionTitle>
        <ItemsGrid>
          {event.items.map((item) => (
            <PopUpItemCard
              key={item.id}
              item={item}
              eventId={event.id}
              eventTitle={event.title}
              eventDate={formatDate(event.date)}
            />
          ))}
        </ItemsGrid>
        <PreorderedItemsCard />
      </Container>
    </PageWrapper>
  );
};

export default PopUpDetails; 