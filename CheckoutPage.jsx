import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cartItems } = useCart();

  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    pincode: ''
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    console.log('Placing order with:', { address, cartItems, totalAmount });
    alert('Order placed! (This is a dummy implementation)');
  };

  return (
    <div style={{ display: 'flex', gap: '40px', padding: '20px' }}>
      {/* Address Form */}
      <div style={{ flex: 1 }}>
        <h2>Shipping Address</h2>
        <input name="name" placeholder="Full Name" value={address.name} onChange={handleChange} /><br />
        <input name="phone" placeholder="Phone Number" value={address.phone} onChange={handleChange} /><br />
        <input name="street" placeholder="Street Address" value={address.street} onChange={handleChange} /><br />
        <input name="city" placeholder="City" value={address.city} onChange={handleChange} /><br />
        <input name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} /><br /><br />
        <button onClick={handlePlaceOrder}>Place Order</button>
      </div>

      {/* Cart Summary */}
      <div style={{ flex: 1 }}>
        <h2>Order Summary</h2>
        {cartItems.map(item => (
          <div key={item.id}>
            <p>{item.name} x {item.quantity} — ₹{item.price * item.quantity}</p>
          </div>
        ))}
        <h3>Total: ₹{totalAmount}</h3>
      </div>
    </div>
  );
};

export default CheckoutPage;
