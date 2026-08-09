import React, { useState } from 'react';

export default function PaymentModal({ isOpen, total, onSubmit, onClose }) {
  const [customerName, setCustomerName] = useState('');
  const [simulatedStatus, setSimulatedStatus] = useState('Paid'); // 'Paid' or 'Failed'

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim()) return alert('Please enter your name');
    onSubmit({ customerName, status: simulatedStatus });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Checkout & Payment Simulation</h3>
        <p style={{ margin: '8px 0', color: 'var(--text-muted)' }}>
          Total Amount: <strong>${total.toFixed(2)}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ margin: '16px 0' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>Customer Name</label>
            <input
              type="text"
              required
              placeholder="e.g. John Doe"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ margin: '16px 0' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>Simulate Payment Outcome</label>
            <select
              value={simulatedStatus}
              onChange={(e) => setSimulatedStatus(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
            >
              <option value="Paid">Success (Mark as Paid)</option>
              <option value="Failed">Failure (Mark as Failed)</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Submit Order
            </button>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}