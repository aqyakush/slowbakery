import React, { useState } from 'react';
import styled from "styled-components"
import { useForm } from 'react-hook-form';
import { PageWrapper, Title } from '../../components/StyledComponets';
import { Form, FormSection, FormWrapper, Input, Label, SubmitButton, TextArea } from '../../components/GoogleForm/Form';
import { useTranslation, Trans } from 'react-i18next';
import ThankyouMessage from '../../components/ThankyouMessage';
import { onFormSubmit } from '../../components/GoogleForm/utils';

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

type SubscriptionFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  dietaryRestrictions: string;
}


const Subscription: React.FC = () => {
  const { t } = useTranslation('subscription');
  const { register, handleSubmit } = useForm<SubscriptionFormData>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: SubscriptionFormData) => {
    setSubmitted(true);

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSccCeCBJiKT46qlXp3PVdaXn6wTzGL4WEdJVX1XTSFg7gO7ZQ/formResponse';
    const formData = {
      'entry.2046355118': data.name,
      'entry.1678340185': data.email,
      'entry.548497100': data.phone,
      'entry.1712509764': data.address,
      'entry.6677889900': data.dietaryRestrictions
    }

    onFormSubmit(formData, formUrl)
  };

  return (
    <PageWrapper>
      <Title>{t('subscriptionTitle')}</Title>
      <Section>
        <TextWrapper>
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
                  
                  {/* FIXME: modify dietaryRestrictions to accept only known fields */}
                  <Label htmlFor="dietaryRestrictions">{t('dietaryRestrictions')}</Label>
                  <TextArea id="dietaryRestrictions" {...register('dietaryRestrictions')} placeholder={t('dietaryRestrictions')} rows={4} />
                  
                  {/* FIXME: add additionla info fields */}
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

export default Subscription;