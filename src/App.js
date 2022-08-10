import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar.js';
import Products from './pages/Products.js'
import Checkout from './pages/Checkout.js'
import { CartProvider } from './context/CartContext.js'

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
