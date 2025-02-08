import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { PageWrapper, Title, Content } from '../../components/StyledComponets';
import { Form, FormSection, Input, Label, SubmitButton } from '../../components/Form';
import { ThankYouCard, ThankYouText } from '../../components/Card';

interface FormData {
  email: string;
  items: { [key: string]: boolean };
}

const CreateOrder = () => {
  const location = useLocation();
  const { items } = location.state as { items: string[] } || { items: [] };
  const { register, handleSubmit } = useForm<FormData>();
  const [submitted, setSubmitted] = React.useState(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formUrl = 'https://docs.google.com/forms/d/1PfSTT692aHNyLe_F9tPLU8p6c_hE6jaTJhorWyXElQ4/formResponse';
    const formData = new FormData();
    
    formData.append('entry.1873621867', data.email);
    if (data.items['Classic Sourdough']) formData.append('entry.382611075', 'Classic Sourdough');
    if (data.items['Sunflower and Sesame Bread']) formData.append('entry.824005279', 'Sunflower and Sesame Bread');
    if (data.items['Olive Bread']) formData.append('entry.1490827537', 'Olive Bread');

    fetch(formUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    }).then(() => {
      console.log('Form submitted');
      setSubmitted(true);
    }).catch((error) => {
      console.error('Error submitting form:', error);
    });
  };

  return (
    <PageWrapper>
      <Title>Create Order</Title>
      <Content>
        <FormSection>
          {submitted ? (
            <ThankYouCard>
              <ThankYouText>Thank you for your order! We will contact you shortly.</ThankYouText>
            </ThankYouCard>
          ) : (
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ul>
              {items.map((item) => (
                <li>
                {item}
                  <Input type="hidden" {...register(`items.${item}`)} value={item} />
                </li>
              ))}
              </ul>
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register('email')} type="email" placeholder="Email" required />
              <SubmitButton type="submit">Submit Order</SubmitButton>
            </Form>
          )}
        </FormSection>
      </Content>
    </PageWrapper>
  );
};

export default CreateOrder;