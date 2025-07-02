import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useUser();
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      login(res.data.user);
      alert('Logged in!');
      navigate('/products');
    } catch (err) {
      console.error('Login error:', err);
      alert(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="on">
      <h2>Login</h2>

      <label htmlFor="email">Email</label><br />
      <input
        type="email"
        name="email"
        id="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        autoComplete="email"
        required
      /><br />

      <label htmlFor="password">Password</label><br />
      <input
        type="password"
        name="password"
        id="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        autoComplete="current-password"
        required
      /><br />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
