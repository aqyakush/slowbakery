import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ShoppingCartItem } from '../../context/ShoppingCartContext';
import Item from './item';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const EventGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const EventHeader = styled.div`
  border-bottom: 2px solid ${props => props.theme.textColor}20;
  padding-bottom: 0.75rem;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const EventTitle = styled.h3`
  font-size: 1.2rem;
  color: ${props => props.theme.textColor};
  margin: 0;
  font-weight: 600;
  display: flex;
  align-items: baseline;
  letter-spacing: 0.02em;
`;

const EventDate = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.textColor}99;
  margin-left: 0.75rem;
  font-style: italic;
  font-weight: normal;
`;

const ItemsList = styled.ul`
  list-style: none;
  padding: 0 0 0 1.5rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const ItemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  color: ${props => props.theme.textColor};
  margin: 0;
  width: 100%;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${props => props.theme.textColor}10;

  &:last-child {
    border-bottom: none;
  }
`;

interface GroupedItems {
  [key: string]: {
    eventTitle: string;
    eventDate: string;
    items: ShoppingCartItem[];
  };
}

interface ShoppingCartItemsProps {
  items: ShoppingCartItem[];
}

const ShoppingCartItems: React.FC<ShoppingCartItemsProps> = ({ items }) => {
  const { t } = useTranslation('preorder');

  // Group items by event
  const groupedItems = items.reduce<GroupedItems>((acc, item) => {
    if (item.metadata?.eventTitle && item.metadata?.eventDate) {
      const key = `${item.metadata.eventTitle}-${item.metadata.eventDate}`;
      if (!acc[key]) {
        acc[key] = {
          eventTitle: item.metadata.eventTitle,
          eventDate: item.metadata.eventDate,
          items: []
        };
      }
      acc[key].items.push(item);
    }
    return acc;
  }, {});

  const nonEventItems = items.filter(item => !item.metadata?.eventTitle);

  return (
    <Container>
      {Object.entries(groupedItems).map(([key, event]) => (
        <EventGroup key={key}>
          <EventHeader>
            <EventTitle>
              {event.eventTitle}
              <EventDate>{event.eventDate}</EventDate>
            </EventTitle>
          </EventHeader>
          <ItemsList>
            {event.items.map((item) => (
              <ItemWrapper key={item.name}>
                <Item key={item.name} item={item} />
              </ItemWrapper>
            ))}
          </ItemsList>
        </EventGroup>
      ))}
      {nonEventItems.length > 0 && (
        <ItemsList>
          {nonEventItems.map((item) => (
            <ItemWrapper key={item.name}>
              <Item key={item.name} item={item} />
            </ItemWrapper>
          ))}
        </ItemsList>
      )}
    </Container>
  );
};

export default ShoppingCartItems; 