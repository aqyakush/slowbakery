import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { styled } from 'styled-components';
import { Title } from '../../components/StyledComponets';

const Section = styled.div`
  display: flex;
  align-items: center;
`;

const ImageWrapper = styled.div`
  flex: 1;
`;

const TextWrapper = styled.div`
  flex: 1;
  padding-left: 20px;
`;

const HowItWorks: React.FC = () => {
  const { t } = useTranslation('subscription');
  return (
    <>
      <Title>{t('subscriptionTitle')}</Title><Section>
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
          <img src="https://previews.123rf.com/images/kos911/kos9111903/kos911190300146/121327295-vector-illustration-of-bread-truck-delivery-fresh-bread-delivery-icon-bakery-truck-or-emblem-with.jpg" alt="Slow Bakery" style={{ width: '100%', height: 'auto' }} />
        </ImageWrapper>
      </Section>
    </>
  );
};

export default HowItWorks;