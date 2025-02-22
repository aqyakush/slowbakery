import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PageWrapper, Title, Content } from '../../components/StyledComponets';
import { Form, FormSection, Input, Label, SubmitButton } from '../../components/Form';
import { ThankYouCard, ThankYouText } from '../../components/Card';
import { HorizontalLine, TotalRow } from '../Preorder/PreorderedItemsCard';
import styled from 'styled-components';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  color: #666;
  margin: 8px 0;
`;

const QuantityInput = styled.input`
  width: 50px;
  padding: 5px;
  margin-right: 10px;
  font-size: 1rem;
  text-align: center;
`;

const RemoveIcon = styled(FaTrash)`
  color: ${(props) => props.theme.removeItem};
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 10px;
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
`;

const ItemName = styled.span`
  width: 300px;
  margin-right: 10px;
`;

interface FormData {
  email: string;
  items: { [key: string]: boolean };
}

const ShoppingCard = () => {
  const { t } = useTranslation(['shoppingcard', 'preorder']);
  const { items, removeItem, updateItemQuantity, clearCart } = useShoppingCart();
  const { register, handleSubmit } = useForm<FormData>();
  const [submitted, setSubmitted] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0 && !submitted) {
      navigate('/preorder');
    }
  }, [items, navigate]);

  const handleQuantityChange = (name: string, quantity: number) => {
    updateItemQuantity(name, quantity);
  };

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
      clearCart();
    }).catch((error) => {
      console.error('Error submitting form:', error);
    });
  };

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);


  return (
    <PageWrapper>
      <Title>{t('createOrderTitle')}</Title>
      <Content>
        <FormSection>
          {submitted ? (
            <ThankYouCard>
              <ThankYouText>{t('thankYouMessage')}</ThankYouText>
            </ThankYouCard>
          ) : (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <HorizontalLine/>
              <ul>
              {items.map((item) => {
                const totalPrice = (item.price * item.quantity).toFixed(2);
                return ((
                  <StyledLi key={item.name}>
                  <ItemDetails>
                    <ItemName>{t(item.name, { ns: 'preorder' })}</ItemName>
                    <QuantityInput
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(item.name, Number(e.target.value))}
                    />
                  </ItemDetails>
                  <div>
                    <span>€{totalPrice}</span>
                    <RemoveIcon onClick={() => removeItem(item.name)} />
                  </div>
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