import React, { useState } from 'react';
import styled from "styled-components"
import { useForm } from 'react-hook-form';

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: #92400e;
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

const FormSection = styled.section`
  margin-bottom: 1rem;  
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormWrapper = styled.div`
  min-height: 600px; /* Adjust this value based on the form's height */
  `;

const Label = styled.label`
  margin-top: 10px;
  margin-bottom: 1px;
  color: #92400e; /* Better color for the label */
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  background-color: #92400e;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
  width: fit-content; /* Make the button smaller */
  align-self: center; /* Center the button */

  &:hover {
    background-color: #b45309;
  }
`;

const CenteredParagraph = styled.p`
  text-align: center;
`;

const ThankYouCard = styled.div`
  background-color: #FEE995;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ThankYouText = styled.p`
  font-weight: bold;
  color: #92400e;
`;


export default function Subscription() {
  const { register, handleSubmit } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
    setSubmitted(true);
  };

  return (
    <PageWrapper>
      <Section>
        <TextWrapper>
          <Title>Subscription</Title>
          <p>
              <strong>1. Weekly Delivery:</strong> You’ll receive a 450g–550g loaf of bread delivered to your door every Monday evening. - <strong>Exception for the first delivery:</strong> It will be on <strong>Tuesday, February 4th</strong>. If this doesn’t work for you, please let me know.
          </p>
          <p>
              <strong>2. Delivery Window:</strong> The bread will be delivered between <strong>7 PM and 8 PM</strong>. I’ll send a message with the estimated time on that day. If this timing isn’t suitable for you, please let me know!
          </p>
          <p>
              <strong>3. Loaf Selection:</strong> Each week alternates between a classic loaf and a special loaf from our menu (detailed below). The choice will be random, so please inform me of any dietary restrictions or allergies.
          </p>
          <p>
              <strong>4. Ingredients:</strong> We use only <strong>organic flours</strong> from small, local millers. This supports the environment, our community, and our health. In addition, all loaves are free from preservatives and chemicals.
          </p>
          <p>
              <strong>5. Cost:</strong> The monthly fee is <strong>X euros</strong>, which includes delivery.
          </p>
        </TextWrapper>
        <ImageWrapper>
          <img src="https://previews.123rf.com/images/kos911/kos9111903/kos911190300146/121327295-vector-illustration-of-bread-truck-delivery-fresh-bread-delivery-icon-bakery-truck-or-emblem-with.jpg" alt="Slow Bakery" style={{ width: '100%', height: 'auto' }} />
        </ImageWrapper>
      </Section>
      
      <TextWrapper>
        <FormWrapper>
      {submitted ? (
              <ThankYouCard>
                <ThankYouText>Thank you for showing interest in our subscription. Our team will contact you shortly.</ThankYouText>
              </ThankYouCard>
          ) : (
            <>
              <Section>
              <TextWrapper>
                <CenteredParagraph>Fill in the form above to start your subscription, and we’ll begin delivering delicious loaves to your door every week!</CenteredParagraph>
              </TextWrapper>
              </Section>
              <FormSection>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...register('name')} placeholder="Name" required />
                  
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" {...register('email')} type="email" placeholder="Email" required />
                  
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" {...register('phone')} type="tel" placeholder="Phone Number" required />
                  
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" {...register('address')} placeholder="Address" required />
                  
                  <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                  <TextArea id="dietaryRestrictions" {...register('dietaryRestrictions')} placeholder="Dietary Restrictions" rows={4} />
                  
                  <SubmitButton type="submit">Subscribe</SubmitButton>
                </Form>
              </FormSection>
             </>
          )}
        </FormWrapper>
     </TextWrapper>
      
    </PageWrapper>
  )
}

