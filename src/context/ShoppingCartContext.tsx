import React, { createContext, ReactNode, useContext, useState } from 'react';

type ShoppingCartItem = {
  name: string;
  price: number;
  quantity: number;
}

type ShoppingCartContextProps = {
  items: ShoppingCartItem[];
  addItem: (item: ShoppingCartItem) => void;
  removeItem: (name: string) => void;
  updateItemQuantity: (name: string, quantity: number) => void;
  clearCart: () => void;
}

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
  const [items, setItems] = useState<ShoppingCartItem[]>([]);

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
    <ShoppingCartContext.Provider value={{ items, addItem, removeItem, clearCart, updateItemQuantity }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};