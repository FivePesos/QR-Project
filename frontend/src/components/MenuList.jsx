import React from 'react';
import { Plus } from 'lucide-react';

const BACKEND_URL = 'https://d7ab-113-19-181-82.ngrok-free.app';

export default function MenuList({ products, loading, onAddToCart }) {
  if (loading) return <p>Loading products...</p>;

  return (
    <section>
      <h2>Menu</h2>
      <div className="product-grid">
        {products.map((prod) => {
          // Fallback image map if local ngrok static fails
          const fallbackImages = {
            "Classic Burger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
            "Cheese Burger": "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400",
            "French Fries": "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=400",
            "Coke": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400"
          };

          const fullImageUrl = `${BACKEND_URL}${prod.image_url}`;

          return (
            <div className="product-card" key={prod.product_id}>
              <img 
                src={fullImageUrl} 
                alt={prod.product_name} 
                style={{
                  width: '100%',
                  height: '140px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '12px'
                }}
                onError={(e) => {
                  // If Ngrok blocks local image GET, swap to Unsplash fallback image!
                  e.target.src = fallbackImages[prod.product_name] || 'https://via.placeholder.com/200?text=Food+Item';
                }}
              />
              <div>
                <h4>{prod.product_name}</h4>
                <p className="product-price">₱{Number(prod.product_price).toFixed(2)}</p>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => onAddToCart(prod)}>
                <Plus size={16} /> Add to Order
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}