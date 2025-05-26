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
import ShoppingCartItems from './ShoppingCartItems';

const CartContent = styled(Content)`
  max-width: 1200px;
  width: 100%;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const CartForm = styled(Form)`
  width: 100%;
`;

const EmailSection = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const EmailInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const EmailLabel = styled(Label)`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => props.theme.textColor};
  margin: 0;
  min-width: 120px;
  white-space: nowrap;
`;

const EmailInput = styled(Input)`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.textColor}20;
  border-radius: 6px;
  font-size: 1rem;
  flex: 1;
  min-width: 0;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.textColor}60;
  }

  &::placeholder {
    color: ${props => props.theme.textColor}60;
  }
`;

const SubmitOrderButton = styled(SubmitButton)`
  background-color: ${props => props.theme.textColor};
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;

  &:hover {
    opacity: 0.9;
  }
`;

const OrderSummary = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid ${props => props.theme.textColor}20;
  border-radius: 8px;
`;

const SummaryTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.textColor};
  margin: 0 0 1rem 0;
  letter-spacing: 0.02em;
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
        const translatedName = item.metadata?.itemTitle || item.name;
        return `${item.quantity}x ${translatedName}${item.metadata?.eventTitle ? ` (${item.metadata.eventTitle})` : ''}`;
      } else {
        // For regular items
        return `${item.quantity}x ${item.name}`;
      }
    }).join(' | ');
  }, []);

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
      <CartContent>
        {submitted ? (
          <ThankyouMessage message={t('thankYouMessage')} />
        ) : (
          <CartForm onSubmit={handleSubmit(onSubmit)}>
            <ShoppingCartItems items={items} />
            <Input type="hidden" {...register(`items`)} value={JSON.stringify(items)} />
            <HorizontalLine/>
            <TotalRow>
              <span>{t('total', { ns: 'preorder' })}:</span>
              <span>{totalPrice}€</span>
            </TotalRow>
            <EmailSection>
              <EmailInputGroup>
                <EmailLabel htmlFor="email">{t('email')}</EmailLabel>
                <EmailInput 
                  id="email" 
                  {...register('email')} 
                  type="email" 
                  placeholder={t('emailPlaceholder', { defaultValue: 'Enter your email address' })} 
                  required 
                />
              </EmailInputGroup>
              <SubmitOrderButton type="submit">
                {t('submitOrder')}
              </SubmitOrderButton>
            </EmailSection>
          </CartForm>
        )}
      </CartContent>
    </PageWrapper>
  );
};

export default ShoppingCard;