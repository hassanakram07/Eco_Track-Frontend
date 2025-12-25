import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import BuyingList from './pages/BuyingList';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

// Admin Imports
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import ManageMaterials from './pages/admin/ManageMaterials';
import ManageProducts from './pages/admin/ManageProducts';
import ManagePickups from './pages/admin/ManagePickups';
import ManageOrders from './pages/admin/ManageOrders';
import AdminRoute from './components/admin/AdminRoute';

import SellItemDetails from './pages/sell/SellItemDetails';
import SellPaymentDetails from './pages/sell/SellPaymentDetails';
import SellSuccess from './pages/sell/SellSuccess';
import MyOrders from './pages/user/MyOrders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="buying-list" element={<BuyingList />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="my-orders" element={<MyOrders />} />
        </Route>

        {/* Auth routes outside Layout */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />

        {/* Protected User Routes (Sell Flow) */}
        <Route path="sell/details" element={<SellItemDetails />} />
        <Route path="sell/payment" element={<SellPaymentDetails />} />
        <Route path="sell/success" element={<SellSuccess />} />

        {/* Admin Dashboard Routes (Protected) */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="materials" element={<ManageMaterials />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="pickups" element={<ManagePickups />} />
            <Route path="orders" element={<ManageOrders />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
