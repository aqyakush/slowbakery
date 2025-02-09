import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { PageWrapper, Title, Content } from '../../components/StyledComponets';
import { Form, FormSection, Input, Label, SubmitButton } from '../../components/Form';
import { ThankYouCard, ThankYouText } from '../../components/Card';
import { PreorderedItem } from '../Preorder';
import { HorizontalLine, TotalRow } from '../Preorder/PreorderedItemsCard';
import styled from 'styled-components';
import { useShoppingCart } from '../../context/ShoppingCartContext';

const StyledLi = styled.h2`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;

interface FormData {
  email: string;
  items: { [key: string]: boolean };
}

const CreateOrder = () => {
  const { items } = useShoppingCart();
  const { register, handleSubmit } = useForm<FormData>();
  const [submitted, setSubmitted] = React.useState(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formUrl = 'https://docs.google.com/forms/d/1PfSTT692aHNyLe_F9tPLU8p6c_hE6jaTJhorWyXElQ4/formResponse';
    const formData = new FormData();
    
    formData.append('entry.1873621867', data.email);
    items.forEach((item) => {
      if (item.name === 'Classic Sourdough') {
        formData.append('entry.382611075', `${item.name} ${item.quantity}pcs`);
      } else if (item.name === 'Sunflower and Sesame Bread') {
        formData.append('entry.824005279', `${item.name} ${item.quantity}pcs`);
      } else if (item.name === 'Olive Bread') {
        formData.append('entry.1490827537', `${item.name} ${item.quantity}pcs`);
      }
    });

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

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);


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
              <HorizontalLine/>
              <ul>
              {items.map((item) => {
                const totalPrice = (item.price * item.quantity).toFixed(2);
                return ((
                  <StyledLi>
                    <span>{item.name}  {item.quantity}pcs</span>
                    <span>{totalPrice}€</span>
                    <Input type="hidden" {...register(`items.${item}`)} value={item.name} />
                  </StyledLi>
                ));
              })}
              </ul>
              <HorizontalLine/>
              <TotalRow>
                <span>Total:</span>
                <span>{totalPrice}€</span>
              </TotalRow>
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