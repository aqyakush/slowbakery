import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { CardButton } from '../../components/Card';

const ResponsiveCard = styled.div<{ imageRight?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: calc(100% - 2rem);
  max-width: 1200px;
  margin: 1rem auto;
  gap: 2rem;
  padding: 2rem;
  background: ${props => props.theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 400px;

  @media (max-width: 768px) {
    width: calc(100% - 3rem);
    grid-template-columns: 1fr;
    height: auto;
    gap: 1rem;
    padding: 1rem;
    margin: 0.5rem;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 768px) {
    max-height: 250px;
  }
`;

const CardContent = styled.div<{ imageRight?: boolean }>`
  order: ${props => props.imageRight ? 1 : 0};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  max-width: 500px;

  @media (max-width: 768px) {
    order: 1;
    padding: 0;
  }
`;

const ResponsiveButton = styled(CardButton)`
 width: auto;
  max-width: 200px;
  padding: 0.8rem 1.5rem;
  align-self: flex-start;

  @media (max-width: 768px) {
    align-self: center;
    padding: 0.8rem 1.2rem;
  }
`;

type HomeCardProps = {
    title: string;
    description: string;
    buttonText: string;
    imageSrc: string;
    navigationPath: string;
    imageRight?: boolean;
  }

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  description,
  buttonText,
  imageSrc,
  navigationPath,
  imageRight = false
}) => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();

  return (
    <ResponsiveCard imageRight={imageRight}>
      <CardContent imageRight={imageRight}>
        <h3>{t(title)}</h3>
        <p>{t(description)}</p>
        <ResponsiveButton onClick={() => navigate(navigationPath)}>
          {t(buttonText)}
        </ResponsiveButton>
      </CardContent>
      <CardImage 
        src={imageSrc}  
        alt={t(title)}
      />
    </ResponsiveCard>
  );
};

export default HomeCard;