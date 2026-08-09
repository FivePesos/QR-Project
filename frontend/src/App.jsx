import React, { useState } from 'react';
import CustomerMenu from './pages/CustomerMenu';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [view, setView] = useState('customer'); // 'customer' | 'admin'

  return (
    <div>
      <div style={{ background: '#212529', color: 'white', padding: '6px 16px', textAlign: 'right', fontSize: '0.85rem' }}>
        <span>Switch View: </span>
        <button
          onClick={() => setView('customer')}
          style={{ background: view === 'customer' ? '#e63946' : 'transparent', color: 'white', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' }}
        >
          Customer View
        </button>
        <button
          onClick={() => setView('admin')}
          style={{ background: view === 'admin' ? '#e63946' : 'transparent', color: 'white', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Admin View
        </button>
      </div>

      {view === 'customer' ? <CustomerMenu /> : <AdminDashboard />}
    </div>
  );
}