import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { PageWrapper } from "../../components/StyledComponets"
import { Card, CardButton, CardWrapper } from "../../components/Card";
import { useTranslation } from "react-i18next";

const Section = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

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
  color: #92400e;
  margin-bottom: 1rem;
`

export default function Home() {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Section>
        <ImageWrapper>
          <img src="https://www.theperfectloaf.com/wp-content/uploads/2015/12/theperfectloaf-mybestsourdoughrecipe-title-1.jpg" alt="Slow Bakery" style={{ width: '100%', height: 'auto' }} />
        </ImageWrapper>
        <TextWrapper>
          <SectionTitle>{t('homeTitle')}</SectionTitle>
          <p>{t('homeDescription1')}</p>
          <p>{t('homeDescription2')}</p>
          <p>{t('homeDescription3')}</p>
        </TextWrapper>
      </Section>

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
    </PageWrapper>
  )
}

