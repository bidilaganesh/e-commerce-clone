import React, { useEffect, useState, createContext, useContext } from 'react';
import axios from 'axios';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  // 🧠 Load user's cart on login
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const res = await axios.get(`http://localhost:5000/api/cart/${user._id}`);
          setCartItems(res.data.items || []);
        } catch (err) {
          console.error('Failed to fetch cart:', err);
        }
      }
    };
    fetchCart();
  }, [user]);

  // 🔄 Sync cart with backend on change
  useEffect(() => {
    const syncCart = async () => {
      if (user && cartItems.length > 0) {
        try {
          await axios.post('http://localhost:5000/api/cart/save', {
            userId: user._id,
            items: cartItems,
          });
        } catch (err) {
          console.error('Failed to sync cart:', err);
        }
      }
    };
    syncCart();
  }, [cartItems, user]);

  // ✅ Add product with quantity
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};