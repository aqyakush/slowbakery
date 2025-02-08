import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Content, PageWrapper, Title } from '../../components/StyledComponets';
import { Form, FormSection, Input, Label, SubmitButton } from '../../components/Form';

interface FormData {
  email: string;
  items: { [key: string]: boolean };
}

const CreateOrder = () => {
  const location = useLocation();
  const { items } = location.state as { items: string[] } || { items: [] };
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formUrl = 'https://docs.google.com/forms/d/1PfSTT692aHNyLe_F9tPLU8p6c_hE6jaTJhorWyXElQ4/formResponse';
    const formData = new FormData();
    
    formData.append('entry.1873621867', data.email);
    if (data.items['Classic Sourdough']) formData.append('entry.382611075', 'Classic Sourdough');
    if (data.items['Sunflower and Sesame Bread']) formData.append('entry.824005279', 'Sunflower and Sesame Bread');
    if (data.items['Olive Bread']) formData.append('entry.1490827537', 'Olive Bread');

    console.log('Submitting form:', data);
    console.log('Form data:', formData);

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
      <Title>Create Order</Title>
      <Content>
        <FormSection>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Label>Items to be ordered</Label>
            <ul>
                {items.map((item) => (
                <li key={item}>
                    {item}
                    <Input type="hidden" {...register(`items.${item}`)} value={item} />
                </li>
                ))}
            </ul>
            
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register('email')} type="email" placeholder="Email" required />
            <SubmitButton type="submit">Submit Order</SubmitButton>
            </Form>
        </FormSection>
      </Content>
    </PageWrapper>
  );
};

export default CreateOrder;