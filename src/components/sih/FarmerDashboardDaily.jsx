import React from 'react';

/**
 * FARMER DAILY DASHBOARD ("WHAT SHOULD I DO TODAY?") (SIH Feature 8)
 * Uses real crop photography tiles and active order tracking cards.
 */
export default function FarmerDashboardDaily({ farmerName, location, onActionClick, formatCurrency }) {
  const cropTiles = [
    {
      name: "Groundnut",
      price: 6300,
      trend: "+6.4%",
      buyers: 18,
      img: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Tomato",
      price: 2420,
      trend: "+12.0%",
      buyers: 24,
      img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Wheat",
      price: 2280,
      trend: "+3.2%",
      buyers: 14,
      img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Rice",
      price: 2800,
      trend: "+4.1%",
      buyers: 20,
      img: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="farmer-daily-dashboard">
      {/* Welcome Banner */}
      <div className="dashboard-welcome-banner">
        <div>
          <h2>Good morning, {farmerName || 'Ramesh'} 🌾</h2>
          <span className="location-pill">📍 {location || 'Chevella, Telangana'} · Region Hub</span>
        </div>
        <div className="banner-date-badge">
          Today: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </div>

      {/* Quick Action Pills */}
      <div className="quick-actions-row">
        <button className="action-pill-btn" onClick={() => onActionClick('dashboard')}>
          <span>📊</span> Analyse Produce
        </button>
        <button className="action-pill-btn" onClick={() => onActionClick('buyers')}>
          <span>🛒</span> Find Buyers
        </button>
        <button className="action-pill-btn" onClick={() => onActionClick('market')}>
          <span>🚚</span> Arrange Transport
        </button>
        <button className="action-pill-btn" onClick={() => onActionClick('insights')}>
          <span>💡</span> Market Insights
        </button>
      </div>

      {/* Real Photography Crop Tiles */}
      <div className="crop-snapshot-section">
        <div className="snapshot-header">
          <h3>Live Regional Market Snapshot</h3>
          <span className="sub-tag">Real-time buyer demand near Chevella</span>
        </div>

        <div className="crop-tiles-grid">
          {cropTiles.map((crop) => (
            <div key={crop.name} className="photo-crop-tile">
              <div className="tile-img-container" style={{ backgroundImage: `url(${crop.img})` }}>
                <span className="tile-trend-badge">{crop.trend}</span>
              </div>
              <div className="tile-info">
                <h4>{crop.name}</h4>
                <div className="tile-price-row">
                  <strong>{formatCurrency(crop.price)}/q</strong>
                  <small>{crop.buyers} buyers</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Sale Tracker */}
      <div className="active-sale-card">
        <div className="sale-card-header">
          <div>
            <span className="section-kicker">ACTIVE SALE IN PROGRESS</span>
            <h3>Groundnut (Lot KS-GN-9402) · 10 Quintals</h3>
          </div>
          <span className="status-badge-active">● Transport Assigned</span>
        </div>

        <div className="active-sale-details">
          <div>
            <span>Buyer Name</span>
            <strong>FreshKart Foods (18 km)</strong>
          </div>
          <div>
            <span>Expected Net Realisation</span>
            <strong>{formatCurrency(63700)}</strong>
          </div>
          <div>
            <span>Escrow Lock</span>
            <strong className="positive">🔒 Verified & Locked</strong>
          </div>
          <div>
            <span>Est. Pickup</span>
            <strong>Tomorrow, 8:30 AM</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

