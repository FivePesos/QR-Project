import React from 'react';
import { QrCode, RefreshCw } from 'lucide-react';

export default function Navbar({ title, showQrButton, onQrClick, showRefreshButton, onRefreshClick }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">{title}</div>
      <div className="nav-actions">
        {showQrButton && (
          <button className="btn btn-outline" onClick={onQrClick}>
            <QrCode size={18} /> Show QR
          </button>
        )}
        {showRefreshButton && (
          <button className="btn btn-outline btn-sm" onClick={onRefreshClick}>
            <RefreshCw size={14} /> Refresh
          </button>
        )}
      </div>
    </nav>
  );
}