import { BrowserRouter, Routes, Route } from "react-router-dom"

import ProductPage from "./pages/Product"
import CategoryPage from "./pages/CategoryPage"
import Checkout from "./pages/Checkout"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollTop from "./components/ScrollTop"

import Home from "./pages/Home"
import Cart from "./pages/Cart"
import OrderSuccess from "./pages/OrderSuccess"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import SignUp from "./pages/SignUp"

import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Profile from "./pages/Profile"

import Orders from "./pages/Orders"
import Admin from "./pages/Admin"
import AdminRoute from "./components/AdminRoute"


function App() {
  return (
    <BrowserRouter>
    <ScrollTop />

      <Navbar />

      <Routes>
        <Route
  path="/admin"
  element={
    <AdminRoute>
      <Admin />
    </AdminRoute>
  }
/>
        <Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
        <Route
  path="/login"
  element={<Login />}
/>
        <Route path="/signUp" element={<SignUp />} />
        <Route
  path="/product/:id"
  element={<ProductPage />}
/>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route
  path="/category/:categoryName"
  element={<CategoryPage />}
/>  <Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>
      <Route
  path="/order-success"
  element={<OrderSuccess />}
/>
      
      
      </Routes>
      <ToastContainer />


      

      <Footer />

    </BrowserRouter>
  )
}

export default App