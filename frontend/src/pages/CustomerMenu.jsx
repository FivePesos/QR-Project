import React, { useEffect, useState } from 'react';
import { getProducts, createOrder, updatePaymentStatus } from '../services/api';

import Navbar from '../components/Navbar';
import MenuList from '../components/MenuList';
import CartDrawer from '../components/CartDrawer';
import QRCodeModal from '../components/QRCodeModal';
import PaymentModal from '../components/PaymentModal';

export default function CustomerMenu() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      alert('Failed to load menu products');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product_id === product.product_id);
      if (existing) {
        return prevCart.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product_id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleCheckoutSubmit = async ({ customerName, status }) => {
    try {
      const payload = {
        customer_name: customerName,
        items: cart.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      };

      const res = await createOrder(payload);
      const createdOrderId = res.data.order.order_id;

      if (status !== 'Pending') {
        await updatePaymentStatus(createdOrderId, status);
      }

      alert(`Order #${createdOrderId} submitted successfully! Status: ${status}`);
      setCart([]);
      setIsPaymentOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Error processing order');
    }
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + Number(item.product_price) * item.quantity,
    0
  );

  return (
    <div>
      <Navbar title="📱 Mini QR Order" showQrButton onQrClick={() => setIsQrOpen(true)} />

      <main className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        <MenuList products={products} loading={loading} onAddToCart={addToCart} />
        <CartDrawer cart={cart} onUpdateQuantity={updateQuantity} onCheckout={() => setIsPaymentOpen(true)} />
      </main>

      <QRCodeModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
      <PaymentModal
        isOpen={isPaymentOpen}
        total={totalAmount}
        onSubmit={handleCheckoutSubmit}
        onClose={() => setIsPaymentOpen(false)}
      />
    </div>
  );
}