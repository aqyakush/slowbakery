import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';
import { Section } from './HomeCards';

const ResponsiveSection = styled(Section)`
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem 1rem;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 2rem;
  }
`;

const TextWrapper = styled.div`
  flex: 1;
  padding-left: 20px;

  @media (max-width: 768px) {
    padding-left: 0;
    text-align: left;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const StyledParagraph = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const Welcome: React.FC = () => {
  const { t } = useTranslation('home');
  return (
    <ResponsiveSection>
      <ImageWrapper>
        <img 
          src="https://www.theperfectloaf.com/wp-content/uploads/2015/12/theperfectloaf-mybestsourdoughrecipe-title-1.jpg" 
          alt="Slow Bakery" 
          style={{ width: '100%', height: 'auto', borderRadius: '8px' }} 
        />
      </ImageWrapper>
      <TextWrapper>
        <SectionTitle>{t('homeTitle')}</SectionTitle>
        <StyledParagraph>{t('homeDescription1')}</StyledParagraph>
        <StyledParagraph>{t('homeDescription2')}</StyledParagraph>
        <StyledParagraph>{t('homeDescription3')}</StyledParagraph>
      </TextWrapper>
    </ResponsiveSection>
  );
};

export default Welcome;