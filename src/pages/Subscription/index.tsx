import React, { useState } from 'react';
import styled from "styled-components"
import { useForm } from 'react-hook-form';
import { PageWrapper } from '../../components/StyledComponets';
import { Form, FormSection, FormWrapper, Input, Label, SubmitButton, TextArea } from '../../components/Form';
import { useTranslation, Trans } from 'react-i18next';
import ThankyouMessage from '../../components/ThankyouMessage';

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${(props) => props.theme.textColor};
`

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

const CenteredParagraph = styled.p`
  text-align: center;
`;


export default function Subscription() {
  const { t } = useTranslation('subscription');
  const { register, handleSubmit } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: any) => {
    // Handle form submission
    console.log(data);
    setSubmitted(true);

    // Example: Send data to Google Forms
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSccCeCBJiKT46qlXp3PVdaXn6wTzGL4WEdJVX1XTSFg7gO7ZQ/formResponse';
    const formData = new FormData();
    formData.append('entry.2046355118', data.name);
    formData.append('entry.1678340185', data.email);
    formData.append('entry.548497100', data.phone);
    formData.append('entry.1712509764', data.address);
    formData.append('entry.6677889900', data.dietaryRestrictions);

    fetch(formUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    }).then(() => {
      console.log('Form submitted');
    }).catch((error) => {
      console.error('Error submitting form:', error);
    });
  };

  return (
    <PageWrapper>
      <Section>
        <TextWrapper>
          <Title>{t('subscriptionTitle')}</Title>
            <p>
              <Trans i18nKey="weeklyDelivery" components={{ strong: <strong /> }} ns="subscription"/>
            </p>
            <p>
              <Trans i18nKey="deliveryWindow" components={{ strong: <strong /> }} ns="subscription"/>
            </p>
            <p>
              <Trans i18nKey="loafSelection" components={{ strong: <strong /> }} ns="subscription"/>
            </p>
            <p>
              <Trans i18nKey="ingredients" components={{ strong: <strong /> }} ns="subscription"/>
            </p>
            <p>
              <Trans i18nKey="cost" components={{ strong: <strong /> }} ns="subscription"/>
            </p>
        </TextWrapper>
        <ImageWrapper>
          <img src="https://previews.123rf.com/images/kos911/kos9111903/kos911190300146/121327295-vector-illustration-of-bread-truck-delivery-fresh-bread-delivery-icon-bakery-truck-or-emblem-with.jpg" alt="Slow Bakery" style={{ width: '100%', height: 'auto' }} />
        </ImageWrapper>
      </Section>
      
      <TextWrapper>
        <FormWrapper>
      {submitted ? (
               <ThankyouMessage message={t('thankYouSubscriptionMessage')} />
          ) : (
            <>
              <Section>
              <TextWrapper>
                <CenteredParagraph>{t('subscriptionFormDescription')}</CenteredParagraph>
              </TextWrapper>
              </Section>
              <FormSection>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Label htmlFor="name">{t('name')}</Label>
                  <Input id="name" {...register('name')} placeholder={t('name')} required />
                  
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input id="email" {...register('email')} type="email" placeholder={t('email')} required />
                  
                  <Label htmlFor="phone">{t('phone')}</Label>
                  <Input id="phone" {...register('phone')} type="tel" placeholder={t('phone')} required />
                  
                  <Label htmlFor="address">{t('address')}</Label>
                  <Input id="address" {...register('address')} placeholder={t('address')} required />
                  
                  <Label htmlFor="dietaryRestrictions">{t('dietaryRestrictions')}</Label>
                  <TextArea id="dietaryRestrictions" {...register('dietaryRestrictions')} placeholder={t('dietaryRestrictions')} rows={4} />
                  
                  <SubmitButton type="submit">{t('subscribe')}</SubmitButton>
                </Form>
              </FormSection>
             </>
          )}
        </FormWrapper>
     </TextWrapper>
      
    </PageWrapper>
  )
}

