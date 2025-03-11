import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PageWrapper, Title, Content } from '../../components/StyledComponets';
import { Form, FormSection, Input, Label, SubmitButton } from '../../components/GoogleForm/Form';
import { HorizontalLine, TotalRow } from '../Preorder/PreorderedItemsCard';
import styled from 'styled-components';
import { ShoppingCartItem, useShoppingCart } from '../../context/ShoppingCartContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThankyouMessage from '../../components/ThankyouMessage';
import { onFormSubmit } from '../../components/GoogleForm/utils';
import Item, { createTranslatedString } from './item';

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
  items: ShoppingCartItem[];
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

  const createOrderString = React.useCallback((items: ShoppingCartItem[]) => {
    return items.map(item => {
      if (item.ids) {
        // For custom breads
        const translatedName = createTranslatedString(t, item.ids);
        return `${item.quantity}x ${translatedName}`;
      } else {
        // For regular items
        return `${item.quantity}x ${item.name}`;
      }
    }).join(' | ');
  }, [t]);

  const onSubmit = (data: ShoppingCardFormData) => {
    const formUrl = 'https://docs.google.com/forms/d/15zKdvvE1dl6ztoKiKzzHRjkphRzpcDhnYm4Du4n-L-4/formResponse'; 

    const orderString = createOrderString(items);

    const formData: { [key: string]: string } = {
      'entry.660491507': data.email,
      'entry.227926969': orderString
    };

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
                    </StyledLi>
                  ));
                })}
              </ul>
              <Input type="hidden" {...register(`items`)} value={JSON.stringify(items)} />
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