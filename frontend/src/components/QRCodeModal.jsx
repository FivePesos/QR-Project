import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X } from 'lucide-react';

export default function QRCodeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // Uses current page URL so scanning opens the ordering app directly
  const currentUrl = window.location.href;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3>Table QR Code</h3>
          <button className="btn btn-outline btn-sm" onClick={onClose}><X size={16} /></button>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
          Scan to view menu and place an order:
        </p>
        <div style={{ background: 'white', padding: '16px', inlineSize: 'fit-content', margin: '0 auto' }}>
          <QRCodeSVG value={currentUrl} size={200} />
        </div>
        <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '12px' }}>{currentUrl}</p>
      </div>
    </div>
  );
}