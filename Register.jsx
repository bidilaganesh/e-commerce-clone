import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      alert(res.data.message || 'Registered! Now login.');
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      console.error('Registration error:', err);
      alert(err.response?.data?.message || err.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '20px auto' }} autoComplete="on">
      <h2>Register</h2>

      <label htmlFor="name">Name</label><br />
      <input
        type="text"
        name="name"
        id="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        autoComplete="name"
        required
      /><br />

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
        autoComplete="new-password"
        required
      /><br />

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
