import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { styled } from 'styled-components';
import { Title } from '../../components/StyledComponets';

const Section = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 2rem;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  padding: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

const TextWrapper = styled.div`
  flex: 1;
  padding-left: 20px;

  @media (max-width: 768px) {
    padding: 0;
    width: 100%;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 0.95rem;
    }
  }
`;

const ResponsiveTitle = styled(Title)`
  @media (max-width: 768px) {
    font-size: 1.75rem;
    text-align: center;
    margin: 1.5rem 0;
  }
`;

const HowItWorks: React.FC = () => {
  const { t } = useTranslation('subscription');
  return (
    <>
      <ResponsiveTitle>{t('subscriptionTitle')}</ResponsiveTitle>
      <Section>
        <TextWrapper>
          <p>
            <Trans i18nKey="weeklyDelivery" components={{ strong: <strong /> }} ns="subscription" />
          </p>
          <p>
            <Trans i18nKey="deliveryWindow" components={{ strong: <strong /> }} ns="subscription" />
          </p>
          <p>
            <Trans i18nKey="loafSelection" components={{ strong: <strong /> }} ns="subscription" />
          </p>
          <p>
            <Trans i18nKey="ingredients" components={{ strong: <strong /> }} ns="subscription" />
          </p>
          <p>
            <Trans i18nKey="cost" components={{ strong: <strong /> }} ns="subscription" />
          </p>
        </TextWrapper>
        <ImageWrapper>
          <img 
            src="https://previews.123rf.com/images/kos911/kos9111903/kos911190300146/121327295-vector-illustration-of-bread-truck-delivery-fresh-bread-delivery-icon-bakery-truck-or-emblem-with.jpg" 
            alt="Slow Bakery" 
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }} 
          />
        </ImageWrapper>
      </Section>
    </>
  );
};

export default HowItWorks;