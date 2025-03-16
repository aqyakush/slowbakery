/* eslint-disable indent */
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

const fillingOptions = [
  { id: 'sunflowerSeeds', name: 'Sunflower Seeds', price: 1.50, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT27NUy-lCwtaox7718sDYgr_itCGYMckM_cQ&s' },
  { id: 'pumpkinSeeds', name: 'Pumpkin Seeds', price: 1.50, image: 'https://healthwire.pk/wp-content/uploads/2022/04/health-benefits-of-pumpkin-seeds.jpg' },
  { id: 'walnuts', name: 'Walnuts', price: 2.00, image: 'https://trvcashews.com/shop/wp-content/uploads/2021/05/walnut-1.jpg' },
  { id: 'almonds', name: 'Almonds', price: 2.00, image: 'https://sweetpotatosoul.com/wp-content/uploads/2024/04/Crunchy-Tamari-Almonds.jpeg' },
  { id: 'raisins', name: 'Raisins', price: 1.00, image: 'https://media.post.rvohealth.io/wp-content/uploads/2020/09/raisins-732x549-thumbnail-732x549.jpg' },
  { id: 'cranberries', name: 'Dried Cranberries', price: 1.50, image: 'https://www.meghantelpner.com/wp-content/uploads/2009/04/Homemade-Dried-Cranberries.jpg' },
  { id: 'rosemary', name: 'Rosemary', price: 0.75, image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Rosemary-sprig-7d96e10.jpg' },
  { id: 'thyme', name: 'Thyme', price: 0.75, image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Thyme-sprig-96aeb6f.jpg' }
];


const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 800px;
  padding: 2rem;
`;

const AnimationContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  left: 2rem; 
  top: 50%;
  transform: translateY(-50%);
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.3s ease;
  width: 300px;

  img {
    width: 100%;
    border-radius: 8px;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
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

const FillingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const FillingCard = styled.label<{ isSelected: boolean; disabled?: boolean }>`
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

  ${props => props.disabled && `
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  `}
`;

const FillingImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
`;

const FillingName = styled.span`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin: 0.5rem 0;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
`;

const NAMESPACE = 'makeyourownbread';

const MakeYourOwnBread: React.FC = () => {
  const { t } = useTranslation(NAMESPACE);
  const { addItem, items, updateItemQuantity } = useShoppingCart();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<BreadFormData>();

  const selectedFillings =  watch('fillings') ?? [];
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
    <PageLayout>
      <AnimationContainer isVisible={!!selectedFlourType}>
            <img 
              src="/images/mixer.GIF" 
              alt="Bread making process"
            />
      </AnimationContainer>
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
          {errors.flourType && (
            <p style={{ color: 'red' }}>{t('flourTypeRequired')}</p>
          )}
        </FormGroup>

        <FormGroup>
          <Label>{t('selectFillings')}</Label>
          <FillingGrid>
            {fillingOptions.map(filling => {
              const isSelected = Array.isArray(selectedFillings) && selectedFillings.includes(filling.id);
              const isDisabled = Array.isArray(selectedFillings) && selectedFillings.length >= 3 && !isSelected;
        
              return (
                <FillingCard 
                  key={filling.id}
                  isSelected={isSelected}
                  disabled={isDisabled}
                >
                  <HiddenCheckbox
                    type="checkbox"
                    value={filling.id}
                    {...register('fillings', {
                      validate: value => !value || value.length <= 3
                    })}
                    disabled={isDisabled}
                  />
                  <FillingImage 
                    src={filling.image} 
                    alt={t(`fillings.${filling.id}`)} 
                  />
                  <FillingName>{t(`fillings.${filling.id}`)}</FillingName>
                  <PriceTag>+€{filling.price.toFixed(2)}</PriceTag>
                </FillingCard>
              );
            })}
          </FillingGrid>
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
    </PageLayout>
  );
};

export default MakeYourOwnBread;