import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => {
        console.log('✅ Product API response:', res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('❌ API error:', err.message);
      });
  }, []);

  return (
    <div className="page-background">
      <h2 className="page-title">🌟 Discover Trending Products</h2>

      {Array.isArray(products) && products.length === 0 ? (
        <p className="empty-text">No products available at the moment.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="card">
              <img
                src={product.image}
                alt={product.name}
                className="card-img"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x150?text=No+Image';
                }}
              />
              <h3 className="card-title">{product.name}</h3>
              <p className="card-price">₹{product.price}</p>
              <button
                className="btn-primary"
                              onClick={() => addToCart({
                id: product._id,
                name: product.name,
                price: product.price,
                quantity: 1
              })}

              >
                🛒 Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
