
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
// Admin Imports
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductList from './pages/admin/ProductList';
import OrderList from './pages/admin/OrderList';
import CustomerList from './pages/admin/CustomerList';
import ScrollToTop from './components/ScrollToTop'; // We'll create this helper

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="customers" element={<CustomerList />} />
        </Route>

        {/* Store Routes */}
        <Route path="*" element={
          <div className="app">
            <Header onAuthClick={() => setIsAuthOpen(true)} />
            <CartDrawer />
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>

            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
