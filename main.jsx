import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      {/* Your routes or components */}
    </CartProvider>
  );
}

