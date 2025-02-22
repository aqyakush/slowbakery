import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PageWrapper, Title, Content } from '../../components/StyledComponets';
import { Form, FormSection, Input, Label, SubmitButton } from '../../components/GoogleForm/Form';
import { HorizontalLine, TotalRow } from '../Preorder/PreorderedItemsCard';
import styled from 'styled-components';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThankyouMessage from '../../components/ThankyouMessage';
import { onFormSubmit } from '../../components/GoogleForm/utils';
import Item from './item';

const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  color: #666;
  margin: 8px 0;
`;



type ShoppingCardFormData = {
  email: string;
  items: { [key: string]: string };
}

const ShoppingCard: React.FC = () => {
  const { t } = useTranslation(['shoppingcard', 'preorder']);
  const { items, clearCart } = useShoppingCart();
  const { register, handleSubmit } = useForm<ShoppingCardFormData>();
  const [submitted, setSubmitted] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0 && !submitted) {
      navigate('/preorder');
    }
  }, [items, navigate]);

  const onSubmit = (data: ShoppingCardFormData) => {
    const formUrl = 'https://docs.google.com/forms/d/1PfSTT692aHNyLe_F9tPLU8p6c_hE6jaTJhorWyXElQ4/formResponse';
    let formData: { [key: string]: string } = {
      'entry.1873621867': data.email
    };
    
    items.forEach((item) => {
      if (item.name === 'Classic Sourdough') {
        formData = {...formData, 'entry.382611075': `${item.name} ${item.quantity}pcs`}
      } else if (item.name === 'Sunflower and Sesame Bread') {
        formData = {...formData, 'entry.824005279': `${item.name} ${item.quantity}pcs`}
      } else if (item.name === 'Olive Bread') {
        formData = {...formData, 'entry.1490827537': `${item.name} ${item.quantity}pcs`}
      }
    });

    onFormSubmit(formData, formUrl)
    clearCart();
    setSubmitted(true);
  };

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);


  return (
    <PageWrapper>
      <Title>{t('createOrderTitle')}</Title>
      <Content>
        <FormSection>
          {submitted ? (
            <ThankyouMessage message={t('thankYouMessage')} />
          ) : (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <HorizontalLine/>
              <ul>
                {items.map((item) => {
                  return ((
                    <StyledLi key={item.name}>
                      <Item item={item} key={item.name}/>
                      <Input type="hidden" {...register(`items.${item.name}`)} value={item.name} />
                    </StyledLi>
                  ));
                })}
              </ul>
              <HorizontalLine/>
              <TotalRow>
                <span>{t('total', { ns: 'preorder' })}:</span>
                <span>{totalPrice}€</span>
              </TotalRow>
              <Label htmlFor="email">{t('email')}</Label>
              <Input id="email" {...register('email')} type="email" placeholder={t('email')} required />
              <SubmitButton type="submit">{t('submitOrder')}</SubmitButton>
            </Form>
          )}
        </FormSection>
      </Content>
    </PageWrapper>
  );
};

export default ShoppingCard;