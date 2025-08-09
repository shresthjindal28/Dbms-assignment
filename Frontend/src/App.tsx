

import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './contexts/CartContext';

const App = () => {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
};

export default App;
