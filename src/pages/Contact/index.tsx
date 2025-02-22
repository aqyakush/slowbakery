import React, { useState } from 'react';
import styled from "styled-components";
import { useForm } from 'react-hook-form';
import { PageWrapper, Title } from '../../components/StyledComponets';
import { Form, FormSection, FormWrapper, Input, Label, SubmitButton, TextArea } from '../../components/GoogleForm/Form';
import { useTranslation } from 'react-i18next';
import ThankyouMessage from '../../components/ThankyouMessage';
import { onFormSubmit } from '../../components/GoogleForm/utils';

const TextWrapper = styled.div`
  flex: 1;
  padding-left: 20px;
`;

type ContactFormData = {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const { t } = useTranslation('contact');
  const { register, handleSubmit } = useForm<ContactFormData>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: ContactFormData) => {
    setSubmitted(true);
    const formUrl = 'https://docs.google.com/forms/d/1JEPvg0ofPA2tOQGj5dloHb2dXdii6NTmpyKDgZSCpEM/formResponse';
    const formData = {
      'entry.1414558029': data.name,
      'entry.2001958713': data.email,
      'entry.1553879402': data.message
    }
    onFormSubmit(formData, formUrl)
  };

  return (
    <PageWrapper>
      <Title>{t('contactUsTitle')}</Title>
      {submitted ? (
        <ThankyouMessage message={t('thankYouMessage')} />
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

export default Contact;