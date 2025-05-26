import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type PopUpEvent = {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  description: string;
  imageSrc: string;
};

interface PopUpCardProps {
  event: PopUpEvent;
}

const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  background: ${props => props.theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1rem;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  color: ${props => props.theme.textColor};
`;

const Location = styled.p`
  margin: 0;
  color: ${props => props.theme.textColor};
  font-weight: bold;
`;

const DateTime = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: ${props => props.theme.secondaryColor};
`;

const Description = styled.p`
  margin: 0;
  color: ${props => props.theme.textColor};
  line-height: 1.6;
`;

const PopUpCard: React.FC<PopUpCardProps> = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pop-up-shop/${event.id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card onClick={handleClick}>
      <ImageContainer>
        <Image src={event.imageSrc} alt={event.title} />
      </ImageContainer>
      <Content>
        <Title>{event.title}</Title>
        <Location>{event.location}</Location>
        <DateTime>
          <span>{formatDate(event.date)}</span>
          <span>{event.time}</span>
        </DateTime>
        <Description>{event.description}</Description>
      </Content>
    </Card>
  );
};

export default PopUpCard; 