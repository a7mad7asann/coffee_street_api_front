import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App.jsx';
import { CartProvider } from "./context/CartContext"; // ✅ استيراد مزود العربة

const rootElement = document.getElementById('root'); 
const root = ReactDOM.createRoot(rootElement)        

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);


