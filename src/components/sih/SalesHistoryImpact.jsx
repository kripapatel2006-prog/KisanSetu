import React from 'react';

/**
 * FARMER SALES HISTORY & KISANSETU IMPACT DASHBOARD (SIH Feature 21, 22, 27)
 * Displays completed sales history and SIH platform impact metrics with clear demo labels.
 */
export default function SalesHistoryImpact({ formatCurrency }) {
  const salesHistory = [
    { id: "KS-2026-8801", crop: "Groundnut", quantity: 10, amount: 68200, buyer: "FreshKart Foods", date: "28 Aug 2026", status: "Completed ✓" },
    { id: "KS-2026-7742", crop: "Tomato", quantity: 8, amount: 19400, buyer: "Hyderabad Fresh Market", date: "14 Aug 2026", status: "Completed ✓" },
    { id: "KS-2026-6631", crop: "Rice", quantity: 15, amount: 42000, buyer: "GreenBasket Retail", date: "02 Jul 2026", status: "Completed ✓" }
  ];

  return (
    <div className="sales-history-impact-container">
      {/* Demo Mode Credibility Banner */}
      <div className="sih-demo-banner">
        <span className="demo-icon">ℹ️</span>
        <div>
          <strong>PROTOTYPE DEMO DATA MODE</strong>
          <p>KisanSetu clearly distinguishes real user inputs from simulated platform metrics for transparency.</p>
        </div>
      </div>

      {/* Impact Dashboard Grid */}
      <div className="impact-metrics-grid">
        <div className="impact-card">
          <span className="impact-number">14,280+</span>
          <span className="impact-label">Farmers Connected</span>
          <small>Across Telangana, AP & Maharashtra</small>
        </div>
        <div className="impact-card">
          <span className="impact-number">85,400</span>
          <span className="impact-label">Quintals Traded</span>
          <small>Transparent direct transactions</small>
        </div>
        <div className="impact-card">
          <span className="impact-number">₹18.4 Lakhs</span>
          <span className="impact-label">Transport Savings</span>
          <small>Via Shared Freight Pooling</small>
        </div>
        <div className="impact-card">
          <span className="impact-number">98.2%</span>
          <span className="impact-label">Escrow Fulfillment</span>
          <small>Zero payment default rate</small>
        </div>
      </div>

      {/* Sales History List */}
      <div className="my-sales-card">
        <div className="my-sales-header">
          <span className="section-kicker">FARMER TRANSACTION HISTORY</span>
          <h3>My Completed Sales</h3>
        </div>

        <div className="sales-list">
          {salesHistory.map((item) => (
            <div className="sales-item-row" key={item.id}>
              <div className="item-crop-icon">🌾</div>
              <div className="item-main-info">
                <strong>{item.crop} ({item.quantity} Quintals)</strong>
                <small>Buyer: {item.buyer} · {item.date}</small>
              </div>
              <div className="item-ref-badge">{item.id}</div>
              <div className="item-amount-info">
                <strong>{formatCurrency(item.amount)}</strong>
                <span className="completed-tag">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

