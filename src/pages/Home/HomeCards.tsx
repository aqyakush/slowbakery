import React from 'react';
import { Card, CardButton, CardWrapper } from "../../components/Card";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Section = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

const HomeCards: React.FC = () => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  return (
    <Section>
      <CardWrapper>
        <Card>
          <h3>{t('preorderTitle')}</h3>
          <p>{t('preorderDescription')}</p>
          <CardButton onClick={() => navigate('/preorder')}>{t('preorderButton')}</CardButton>
        </Card>
        <Card>
          <h3>{t('subscriptionTitle')}</h3>
          <p>{t('subscriptionDescription')}</p>
          <CardButton onClick={() => navigate('/subscription')}>{t('subscriptionButton')}</CardButton>
        </Card>
      </CardWrapper>
    </Section>
  );
};

export default HomeCards;