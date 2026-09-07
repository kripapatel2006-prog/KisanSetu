import React, { useState } from 'react';

/**
 * LOGISTICS & SHARED TRANSPORT MODULE (SIH Feature 5, 6, 23)
 * First-class transportation calculator that models individual vs shared transport.
 */
export default function LogisticsTransport({ buyerName, distance, quantity, location, formatCurrency }) {
  const [selectedTransport, setSelectedTransport] = useState("shared");

  // Cost estimates
  const distNumber = Number(distance || 20);
  const qtyNumber = Number(quantity || 10);
  
  const individualCost = Math.round(600 + distNumber * 40 + qtyNumber * 25);
  const sharedCost = Math.round(individualCost * 0.58);
  const savings = individualCost - sharedCost;

  return (
    <div className="logistics-card">
      <div className="logistics-header">
        <span className="section-kicker">FIRST-CLASS LOGISTICS</span>
        <h3>Arrange Produce Transportation</h3>
        <p>Pickup: <strong>{location}</strong> → Destination: <strong>{buyerName} Hub ({distance} km)</strong></p>
      </div>

      <div className="transport-options-grid">
        {/* Shared Transport Option (RECOMMENDED) */}
        <div 
          className={`transport-option-box ${selectedTransport === 'shared' ? 'selected' : ''}`}
          onClick={() => setSelectedTransport('shared')}
        >
          <div className="option-badge">🌱 RECOMMENDED LOGISTICS</div>
          <div className="option-top">
            <h4>Shared Freight Pooling</h4>
            <span className="savings-tag">Save {formatCurrency(savings)}</span>
          </div>
          <p>Consolidates your {qtyNumber} quintals with 2 nearby farmers (Ramesh & Suresh) taking the same route.</p>
          <div className="option-price">
            <strong>{formatCurrency(sharedCost)}</strong>
            <small>Est. Pickup Tomorrow Morning</small>
          </div>
        </div>

        {/* Individual Vehicle Option */}
        <div 
          className={`transport-option-box ${selectedTransport === 'individual' ? 'selected' : ''}`}
          onClick={() => setSelectedTransport('individual')}
        >
          <div className="option-top">
            <h4>Dedicated Mini Truck</h4>
            <span className="type-tag">10–15 Quintal Capacity</span>
          </div>
          <p>Dedicated vehicle assigned exclusively for your produce shipment.</p>
          <div className="option-price">
            <strong>{formatCurrency(individualCost)}</strong>
            <small>Est. Pickup Today Evening</small>
          </div>
        </div>
      </div>

      {/* Sustainable Logistics Callout */}
      {selectedTransport === 'shared' && (
        <div className="sustainability-callout">
          <span className="callout-icon">🚛</span>
          <div>
            <strong>Consolidated Trip Impact</strong>
            <p>Combining 3 farmer loads reduces partial-truck trips, saving 14.2 kg CO₂ emissions and improving farmer net profit!</p>
          </div>
        </div>
      )}
    </div>
  );
}

