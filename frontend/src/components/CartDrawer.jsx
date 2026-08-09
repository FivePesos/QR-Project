import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

export default function CartDrawer({ cart, onUpdateQuantity, onCheckout }) {
  const total = cart.reduce(
    (sum, item) => sum + Number(item.product_price) * item.quantity,
    0
  );

  return (
    <section style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', height: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <ShoppingCart size={20} />
        <h3>Your Cart</h3>
      </div>

      {cart.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>Cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.product_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{item.product_name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  ${Number(item.product_price).toFixed(2)} x {item.quantity}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button className="btn btn-outline btn-sm" onClick={() => onUpdateQuantity(item.product_id, -1)}>
                  {item.quantity === 1 ? <Trash2 size={12} color="red" /> : <Minus size={12} />}
                </button>
                <span>{item.quantity}</span>
                <button className="btn btn-outline btn-sm" onClick={() => onUpdateQuantity(item.product_id, 1)}>
                  <Plus size={12} />
                </button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '2px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}