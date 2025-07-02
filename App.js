import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Login from './pages/Login';
import CartPage from './pages/cartpage';
import CheckoutPage from './pages/CheckoutPage';
import { useUser } from './context/UserContext'; // 🧠 import context
import './theme.css';

const App = () => {
  const { user, logout } = useUser(); // 🎯 use context instead of localStorage

  return (
    <Router>
      <nav style={{ padding: '10px', display: 'flex', gap: '15px' }}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        {!user && <Link to="/register">Register</Link>}
        {!user && <Link to="/login">Login</Link>}

        {user ? (
  <>
    <Link to="/cart">Cart</Link>
    <span style={{ marginLeft: '10px' }}>Hi, {user?.name || 'User'}</span>
    <button onClick={logout}>Logout</button>
  </>
) : (
  <Link to="/login">Login to view Cart</Link>
)}

      </nav>

      <Routes>
        <Route path="/" element={<h2>Welcome to the E-Commerce Clone</h2>} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" />} />
        <Route path="/checkout" element={user ? <CheckoutPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
