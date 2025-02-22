import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';
import { Section } from './HomeCards';

const ImageWrapper = styled.div`
  flex: 1;
`;

const TextWrapper = styled.div`
  flex: 1;
  padding-left: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 1rem;
`

const Welcome: React.FC = () => {
  const { t } = useTranslation('home');
  return (
    <Section>
      <ImageWrapper>
        <img src="https://www.theperfectloaf.com/wp-content/uploads/2015/12/theperfectloaf-mybestsourdoughrecipe-title-1.jpg" alt="Slow Bakery" style={{ width: '100%', height: 'auto' }} />
      </ImageWrapper><TextWrapper>
        <SectionTitle>{t('homeTitle')}</SectionTitle>
        <p>{t('homeDescription1')}</p>
        <p>{t('homeDescription2')}</p>
        <p>{t('homeDescription3')}</p>
      </TextWrapper>
    </Section>

        
  );
};

export default Welcome;