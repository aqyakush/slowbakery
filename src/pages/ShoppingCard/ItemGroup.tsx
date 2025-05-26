import React from 'react';
import styled from 'styled-components';
import { ShoppingCartItem } from '../../context/ShoppingCartContext';
import Item from './item';

const EventInfo = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${props => props.theme.textColor}20;
`;

const EventTitle = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.textColor};
  font-weight: 600;
`;

const EventDate = styled.span`
  font-size: 0.85rem;
  color: ${props => props.theme.textColor};
  opacity: 0.8;
  font-style: italic;
  margin-left: 0.5rem;
`;

const EventItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-left: 1rem;
  margin-bottom: 1.5rem;
`;

interface GroupedItems {
  [key: string]: {
    eventTitle: string;
    eventDate: string;
    items: ShoppingCartItem[];
  };
}

interface ItemGroupProps {
  items: ShoppingCartItem[];
}

const ItemGroup: React.FC<ItemGroupProps> = ({ items }) => {
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
    <>
      {Object.entries(groupedItems).map(([key, event]) => (
        <React.Fragment key={key}>
          <EventInfo>
            <EventTitle>{event.eventTitle}</EventTitle>
            <EventDate>{event.eventDate}</EventDate>
          </EventInfo>
          <EventItems>
            {event.items.map((item) => (
              <Item key={item.name} item={item} />
            ))}
          </EventItems>
        </React.Fragment>
      ))}
      {nonEventItems.map((item) => (
        <Item key={item.name} item={item} />
      ))}
    </>
  );
};

export default ItemGroup; 