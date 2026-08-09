import React from 'react';
import { Plus } from 'lucide-react';

export default function MenuList({ products, loading, onAddToCart }) {
  if (loading) return <p>Loading products...</p>;

  return (
    <section>
      <h2>Menu</h2>
      <div className="product-grid">
        {products.map((prod) => (
          <div className="product-card" key={prod.product_id}>
            <div>
              <h4>{prod.product_name}</h4>
              <p className="product-price">${Number(prod.product_price).toFixed(2)}</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => onAddToCart(prod)}>
              <Plus size={16} /> Add to Order
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}