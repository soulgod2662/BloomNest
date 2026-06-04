import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CartProvider from "./context/CartContext"
import App from './App.jsx'
import AuthProvider from "./context/AuthContext"

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <CartProvider>
    <AuthProvider>
  <App />
</AuthProvider>
</CartProvider>
  </StrictMode>,
)
