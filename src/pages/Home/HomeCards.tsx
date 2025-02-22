import React from 'react';
import { Card, CardButton, CardWrapper } from "../../components/Card";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Section = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ResponsiveCardWrapper = styled(CardWrapper)`
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const ResponsiveCard = styled(Card)`
  @media (max-width: 768px) {
    width: 85%;
    margin: 0;
    padding: 1.5rem;

    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
    }
  }
`;

const ResponsiveButton = styled(CardButton)`
  @media (max-width: 768px) {
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
  }
`;

const HomeCards: React.FC = () => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  
  return (
    <Section>
      <ResponsiveCardWrapper>
        <ResponsiveCard>
          <h3>{t('preorderTitle')}</h3>
          <p>{t('preorderDescription')}</p>
          <ResponsiveButton onClick={() => navigate('/preorder')}>
            {t('preorderButton')}
          </ResponsiveButton>
        </ResponsiveCard>
        <ResponsiveCard>
          <h3>{t('subscriptionTitle')}</h3>
          <p>{t('subscriptionDescription')}</p>
          <ResponsiveButton onClick={() => navigate('/subscription')}>
            {t('subscriptionButton')}
          </ResponsiveButton>
        </ResponsiveCard>
      </ResponsiveCardWrapper>
    </Section>
  );
};

export default HomeCards;