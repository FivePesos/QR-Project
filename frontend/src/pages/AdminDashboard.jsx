import React, { useEffect, useState } from 'react';
import { getOrders, updatePaymentStatus } from '../services/api';
import { RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch (err) {
      alert('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updatePaymentStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.order_id === orderId ? { ...o, payment_status: newStatus } : o))
      );
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand">🛠️ Admin Dashboard</div>
        <button className="btn btn-outline btn-sm" onClick={fetchOrders}>
          <RefreshCw size={14} /> Refresh
        </button>
      </nav>

      <main className="container">
        <h2>Customer Orders</h2>
        {loading ? (
          <p style={{ marginTop: '16px' }}>Loading orders...</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total Amount</th>
                  <th>Date</th>
                  <th>Payment Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.order_id}>
                    <td>#{order.order_id}</td>
                    <td>{order.customer_name}</td>
                    <td>${Number(order.total_amount).toFixed(2)}</td>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                    <td>
                      <span className={`badge badge-${order.payment_status}`}>
                        {order.payment_status}
                      </span>
                    </td>
                    <td>
                      <select
                        value={order.payment_status}
                        onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}