import React from "react"
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import styled from 'styled-components';
import { SubmitButton } from "../../components/GoogleForm/Form";

interface BreadFormData {
  flourType: string;
  fillings: string[];
}

const flourTypes = [
  { id: 'wheat' },
  { id: 'rye' },
  { id: 'spelt' }
];

const fillingOptions = [
  { id: 'sunflowerSeeds'},
  { id: 'pumpkinSeeds' },
  { id: 'walnuts' },
  { id: 'almonds' },
  { id: 'raisins' },
  { id: 'cranberries' },
  { id: 'rosemary'},
  { id: 'thyme' }
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

const MakeYourOwnBread: React.FC = () => {
  const { t } = useTranslation('makeyourownbread');
  const { addItem } = useShoppingCart();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<BreadFormData>();

  const selectedFillings = watch('fillings', []);

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
            <label key={filling.id}>
              <input
                type="checkbox"
                value={filling.id}
                {...register('fillings', { 
                  validate: value => !value || value.length <= 3 
                })}
                disabled={selectedFillings.length >= 3 && !selectedFillings.includes(filling.id)}
              />
              {t(`fillings.${filling.id}`)}
            </label>
          ))}
        </CheckboxGroup>
      </FormGroup>

      {errors.fillings && (
        <p style={{ color: 'red' }}>{t('maxFillingsError')}</p>
      )}

      <SubmitButton type="submit">{t('addToCart')}</SubmitButton>
    </FormContainer>
  );
};

export default MakeYourOwnBread;