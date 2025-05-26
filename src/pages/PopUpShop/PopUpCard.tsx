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
  disabled?: boolean;
};

interface PopUpCardProps {
  event: PopUpEvent;
}

const Card = styled.div<{ disabled?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  background: ${props => props.theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: transform 0.2s ease-in-out, filter 0.3s ease;
  opacity: ${props => props.disabled ? 0.85 : 1};
  position: relative;
  filter: ${props => props.disabled ? 'grayscale(100%)' : 'none'};

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-4px)'};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1rem;
  }
`;

const DisabledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${props => props.theme.textColor};
  font-weight: bold;
  filter: none !important;
  > span {
    background: ${props => props.theme.cardBackground};
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transform: scale(1);
    filter: grayscale(0%);
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
    if (!event.disabled) {
      navigate(`/pop-up-shop/${event.id}`);
    }
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
    <Card onClick={handleClick} disabled={event.disabled}>
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
      {event.disabled && (
        <DisabledOverlay>
          <span>Event Not Available</span>
        </DisabledOverlay>
      )}
    </Card>
  );
};

export default PopUpCard; 