import React from "react"
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import styled from 'styled-components';

type BreadFormData = {
  flourType: string;
  fillings: string[];
}

const BASE_PRICE = 5.99;

const flourTypes = [
  { id: 'wheat' },
  { id: 'rye' },
  { id: 'spelt' }
];

const fillingOptions = [
  { id: 'sunflowerSeeds', name: 'Sunflower Seeds', price: 1.50 },
  { id: 'pumpkinSeeds', name: 'Pumpkin Seeds', price: 1.50 },
  { id: 'walnuts', name: 'Walnuts', price: 2.00 },
  { id: 'almonds', name: 'Almonds', price: 2.00 },
  { id: 'raisins', name: 'Raisins', price: 1.00 },
  { id: 'cranberries', name: 'Dried Cranberries', price: 1.50 },
  { id: 'rosemary', name: 'Rosemary', price: 0.75 },
  { id: 'thyme', name: 'Thyme', price: 0.75 }
];
  

const FormContainer = styled.form`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const FillingLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const PriceTag = styled.span`
  color: ${props => props.theme.secondaryColor};
  font-size: 0.9em;
  margin-left: auto;
`;

const TotalPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  padding: 10px;
  background-color: ${props => props.theme.backgroundLight};
  border-radius: 4px;
`;

const TotalPriceLabel = styled.span`
  font-weight: bold;
`;

const TotalPriceAmount = styled.span`
  font-size: 1.2em;
  font-weight: bold;
  color: ${props => props.theme.primaryColor};
`;

const SubmitButton = styled.button<{ disabled: boolean }>`
  background-color: ${props => props.disabled ? '#cccccc' : props.theme.textColor};
  color: ${props => props.theme.buttonText};
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  opacity: ${props => props.disabled ? 0.7 : 1};
  transition: all 0.2s ease;
  width: 100%;
  max-width: 200px;
  font-size: 1rem;
  margin: 1rem auto;
  display: block;

  &:hover {
    background-color: ${props => !props.disabled && props.theme.hoverTextColor};
  }
`;

const MakeYourOwnBread: React.FC = () => {
  const { t } = useTranslation('makeyourownbread');
  const { addItem } = useShoppingCart();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<BreadFormData>();

  const selectedFillings = watch('fillings', []);
  const selectedFlourType = watch('flourType');

  const calculateTotalPrice = () => {
    let fillingsPrice = 0;
    if (selectedFillings) {
      fillingsPrice = selectedFillings.reduce((total, fillingId) => {
        const filling = fillingOptions.find(f => f.id === fillingId);
        return total + (filling?.price || 0);
      }, 0);
    }
    return (BASE_PRICE + fillingsPrice).toFixed(2);
  };

  const onSubmit = (data: BreadFormData) => {
    const customBread = {
      name: `custom-${Date.now()}`,
      title: t('title', { flourType: t(`flourTypes.${data.flourType}`) }),
      price: 8.99,
      description: t('makeyourownbread.description', { 
        fillings: data.fillings.map(f => t(`makeyourownbread.fillings.${f}`)).join(', ') 
      }),
      quantity: 1
    };
    addItem(customBread);
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label>{t('selectFlour')}</Label>
        <Select {...register('flourType', { required: true })}>
          <option value="">{t('selectFlourType')}</option>
          {flourTypes.map(flour => (
            <option key={flour.id} value={flour.id}>
              {t(`flourTypes.${flour.id}`)}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <Label>{t('selectFillings')}</Label>
        <CheckboxGroup>
          {fillingOptions.map(filling => (
            <FillingLabel key={filling.id}>
              <input
                type="checkbox"
                value={filling.id}
                {...register('fillings', { 
                  validate: value => !value || value.length <= 3 
                })}
                disabled={selectedFillings.length >= 3 && !selectedFillings.includes(filling.id)}
              />
              <span>{t(`fillings.${filling.id}`)}</span>
              <PriceTag>+€{filling.price.toFixed(2)}</PriceTag>
            </FillingLabel>
          ))}
        </CheckboxGroup>
      </FormGroup>

      {errors.fillings && (
        <p style={{ color: 'red' }}>{t('maxFillingsError')}</p>
      )}

      <TotalPriceContainer>
        <TotalPriceLabel>{t('totalPrice')}:</TotalPriceLabel>
        <TotalPriceAmount>€{calculateTotalPrice()}</TotalPriceAmount>
      </TotalPriceContainer>

      <SubmitButton type="submit" disabled={!selectedFlourType}>{t('addToCart')}</SubmitButton>
    </FormContainer>
  );
};

export default MakeYourOwnBread;