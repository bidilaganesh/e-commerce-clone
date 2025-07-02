import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems = [], removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#5c27fe', marginBottom: '30px' }}>🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Your cart is empty.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cartItems.map((item, index) => (
            <li
              key={index}
              style={{
                background: '#fff',
                padding: '16px',
                marginBottom: '12px',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.07)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong>{item.name}</strong><br />
                <span style={{ color: '#28a745' }}>₹{item.price}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  min={1}
                  style={{ padding: '6px', width: '60px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <span>= ₹{item.price * item.quantity}</span>
                <button className="btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h3 style={{ textAlign: 'right', color: '#333' }}>Total: ₹{total}</h3>
      {cartItems.length > 0 && (
  <div style={{ textAlign: 'right', marginTop: '20px' }}>
    <button
      className="btn-primary"
      onClick={() => alert('Proceeding to checkout...')}
    >
      🛍️ Buy Now
    </button>
  </div>
)}

    </div>
  );
};

export default CartPage;