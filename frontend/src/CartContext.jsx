/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useMemo } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // each item: { id?, title, author, price, src, quantity }

  // Add book: if present -> increment quantity, else push with quantity 1
  const addToCart = (book) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.title === book.title); // use unique key (id if available)
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: (updated[idx].quantity || 1) + 1 };
        return updated;
      } else {
        return [...prev, { ...book, quantity: 1 }];
      }
    });
  };

  // Remove by index (safe) or by title
  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Update quantity by index
  const updateQuantity = (index, newQty) => {
    setCart((prev) => {
      if (newQty < 1) return prev; // don't allow below 1
      const updated = [...prev];
      updated[index] = { ...updated[index], quantity: newQty };
      return updated;
    });
  };

  const clearCart = () => setCart([]);

  // Derived value: total items (sum of quantities)
  const totalItems = useMemo(() => cart.reduce((s, it) => s + (it.quantity || 0), 0), [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
