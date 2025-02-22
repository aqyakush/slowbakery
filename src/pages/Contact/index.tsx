import React, { useState } from 'react';
import styled from "styled-components";
import { useForm } from 'react-hook-form';
import { PageWrapper } from '../../components/StyledComponets';
import { Form, FormSection, FormWrapper, Input, Label, SubmitButton, TextArea } from '../../components/Form';
import { ThankYouCard, ThankYouText } from '../../components/Card';
import { useTranslation } from 'react-i18next';

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${(props) => props.theme.textColor};
`;

const TextWrapper = styled.div`
  flex: 1;
  padding-left: 20px;
`;

export default function Contact() {
  const { t } = useTranslation('contact');
  const { register, handleSubmit } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
    setSubmitted(true);

    // Example: Send data to Google Forms
    const formUrl = 'https://docs.google.com/forms/d/1JEPvg0ofPA2tOQGj5dloHb2dXdii6NTmpyKDgZSCpEM/formResponse';
    const formData = new FormData();
    formData.append('entry.1414558029', data.name);
    formData.append('entry.2001958713', data.email);
    formData.append('entry.1553879402', data.message);

    fetch(formUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    }).then(() => {
      console.log('Form successfully submitted');
    }).catch((error) => {
      console.error('Error submitting form:', error);
    });
  };

  return (
    <PageWrapper>
      <Title>{t('contactUsTitle')}</Title>
      {submitted ? (
        <ThankYouCard>
          <ThankYouText>{t('thankYouMessage')}</ThankYouText>
        </ThankYouCard>
      ) : (
        <TextWrapper>
            <FormWrapper>
                <FormSection>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                    <Label htmlFor="name">{t('name')}</Label>
                        <Input id="name" {...register('name', { required: true })} />
                        <Label htmlFor="email">{t('email')}</Label>
                        <Input id="email" type="email" {...register('email', { required: true })} />
                        <Label htmlFor="message">{t('message')}</Label>
                        <TextArea id="message" {...register('message', { required: true })} />
                        <SubmitButton type="submit">{t('submit')}</SubmitButton>
                    </Form>
                </FormSection>
            </FormWrapper>
        </TextWrapper>
        
      )}
    </PageWrapper>
  );
}