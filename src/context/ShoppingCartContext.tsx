import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

const CART_STORAGE_KEY = 'shopping-cart';

export type CartItemId = {
  namespace: string; 
  value: string; 
}

export type ShoppingCartItem = {
  name: string;
  ids: CartItemId[];
  price: number;
  quantity: number;
}

type ShoppingCartContextProps = {
  items: ShoppingCartItem[];
  addItem: (item: ShoppingCartItem) => void;
  removeItem: (name: string) => void;
  updateItemQuantity: (name: string, quantity: number) => void;
  clearCart: () => void;
  isShoppingCardVisible: boolean;
  setIsShoppingCardVisible: (isVisible: boolean) => void;
}

const saveToLocalStorage = (items: ShoppingCartItem[]) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

const loadFromLocalStorage = (): ShoppingCartItem[] => {
  const items = localStorage.getItem(CART_STORAGE_KEY);
  return items ? JSON.parse(items) : [];
};

const ShoppingCartContext = createContext<ShoppingCartContextProps | undefined>(undefined);

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }
  return context;
};

type ShoppingCartProviderProps ={
    children: ReactNode;
  }

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<ShoppingCartItem[]>(loadFromLocalStorage());
  const [isShoppingCardVisible, setIsShoppingCardVisible] = React.useState(false);
  const prevItemsLength = useRef(items.length);

  const addItem = (item: ShoppingCartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.name === item.name);
      if (existingItem) {
        return prevItems.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  useEffect(() => {
    saveToLocalStorage(items);
  }, [items]);

  useEffect(() => {
    if (items.length != prevItemsLength.current) {
      setIsShoppingCardVisible(true);
    }
    prevItemsLength.current = items.length;
  }, [items]);

  const removeItem = (name: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.name !== name));
  };

  const updateItemQuantity = (name: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.name === name ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <ShoppingCartContext.Provider value={{ items, addItem, removeItem, clearCart, updateItemQuantity, isShoppingCardVisible, setIsShoppingCardVisible }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};