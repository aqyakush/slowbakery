import React from "react"
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import styled from 'styled-components';
import PreorderedItemsCard from "../Preorder/PreorderedItemsCard";

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

const FlourTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
`;

const FlourTypeCard = styled.label<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 2px solid ${props => props.isSelected ? props.theme.primaryColor : '#ddd'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const FlourImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const FlourName = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
`;

const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
`;

const FLOUR_TYPES = [
  { id: 'wheat', name: 'Wheat Flour', image: 'https://www.thespruceeats.com/thmb/J1_oUODgxQi9Gm6iccam2LNYPpQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-126372385-58950f353df78caebc239b4d.jpg' },
  { id: 'rye', name: 'Rye Flour', image: 'https://livingskyfarms.ca/cdn/shop/files/Untitleddesign_90.png?v=1691545742' },
  { id: 'spelt', name: 'Spelt Flour', image: 'https://media.post.rvohealth.io/wp-content/uploads/2020/08/AN344-Spelt-Grain-Flour-732x549-thumb-1.jpg' }
];

const NAMESPACE = 'makeyourownbread';

const MakeYourOwnBread: React.FC = () => {
  const { t } = useTranslation(NAMESPACE);
  const { addItem, items, updateItemQuantity } = useShoppingCart();
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
    return (BASE_PRICE + fillingsPrice);
  };

  const onSubmit = (data: BreadFormData) => {
    const ids = [
      { namespace: NAMESPACE, value: `flourTypes.${data.flourType}` },
      ...data.fillings.map(f => ({ namespace: NAMESPACE, value: `fillings.${f}` }))
    ];
    
    const existingBread = items.find(item => {
      if (!item.ids || item.ids.length !== ids.length) return false;
      return ids.every((id, index) => 
        id.namespace === item.ids[index].namespace && 
          id.value === item.ids[index].value
      );
    });
    
    if (existingBread) {
      updateItemQuantity(existingBread.name, existingBread.quantity + 1);
    } else {
      const customBread = {
        ids,
        name: `custom-${Date.now()}`,
        price: calculateTotalPrice(),
        quantity: 1
      };
      addItem(customBread);
    }
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>{t('selectFlour')}</Label>
          <FlourTypeGrid>
            {FLOUR_TYPES.map(flour => (
              <FlourTypeCard 
                key={flour.id}
                isSelected={selectedFlourType === flour.id}
              >
                <HiddenRadio
                  type="radio"
                  value={flour.id}
                  {...register('flourType', { required: true })}
                />
                <FlourImage src={flour.image} alt={t(`flourTypes.${flour.id}`)} />
                <FlourName>{t(`flourTypes.${flour.id}`)}</FlourName>
              </FlourTypeCard>
            ))}
          </FlourTypeGrid>
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
      {items.length > 0 && <PreorderedItemsCard/>}
    </>
  );
};

export default MakeYourOwnBread;