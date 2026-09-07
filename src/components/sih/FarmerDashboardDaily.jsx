import React from 'react';
import { getCropImage } from '../../data/cropCatalogData';

/**
 * FARMER DAILY DASHBOARD ("WHAT SHOULD I DO TODAY?")
 * Consumes single source of truth crop photography and active sale tracker.
 */
export default function FarmerDashboardDaily({ farmerName, location, activeCrop, quantity, onActionClick, formatCurrency }) {
  const currentCropName = activeCrop || "Groundnut";
  const currentQty = quantity || 10;

  const cropTiles = [
    {
      name: "Groundnut",
      price: 6300,
      trend: "+6.4%",
      buyers: 18,
      img: getCropImage("Groundnut")
    },
    {
      name: "Tomato",
      price: 2420,
      trend: "+12.0%",
      buyers: 24,
      img: getCropImage("Tomato")
    },
    {
      name: "Wheat",
      price: 2280,
      trend: "+3.2%",
      buyers: 14,
      img: getCropImage("Wheat")
    },
    {
      name: "Rice",
      price: 2800,
      trend: "+4.1%",
      buyers: 20,
      img: getCropImage("Rice")
    }
  ];

  return (
    <div className="farmer-daily-dashboard">
      {/* Welcome Banner */}
      <div className="dashboard-welcome-banner">
        <div>
          <h2>Good morning, {farmerName || 'Ramesh'} 🌾</h2>
          <span className="location-pill">📍 {location || 'Chevella, Telangana'} · Regional Market Hub</span>
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
          <h3>Market Snapshot (Regional Hub)</h3>
          <span className="sub-tag">Illustrative Market Data near Chevella</span>
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

      {/* Active Sale Tracker - Synchronized with Single Source of Truth */}
      <div className="active-sale-card">
        <div className="sale-card-header">
          <div>
            <span className="section-kicker">ACTIVE PRODUCE LOT</span>
            <h3>{currentCropName} (Lot KS-2026-9402) · {currentQty} Quintals</h3>
          </div>
          <span className="status-badge-active">● Transport Assigned</span>
        </div>

        <div className="active-sale-details">
          <div>
            <span>Buyer Match</span>
            <strong>FreshKart Foods (18 km)</strong>
          </div>
          <div>
            <span>Expected Net Realisation</span>
            <strong>{formatCurrency(currentCropName === 'Tomato' ? 22160 : 63700)}</strong>
          </div>
          <div>
            <span>Escrow Lock State</span>
            <strong className="positive">🔒 Escrow Pending Transfer</strong>
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
