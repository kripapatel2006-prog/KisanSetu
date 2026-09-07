import React from 'react';

/**
 * CORE DIFFERENTIATOR WIDGET (SIH Feature 9, 22)
 * Signature KisanSetu visual component showing HIGHEST OFFER ≠ HIGHEST FARMER EARNINGS.
 */
export default function CoreDifferentiatorWidget({ formatCurrency }) {
  const buyersComparison = [
    {
      name: "Buyer A (GreenBasket Retail)",
      offer: 6500,
      transport: 180,
      storageRisk: 40,
      net: 6280,
      distance: "48 km",
      isWinner: false,
      note: "Highest quoted price, but heavy transport deduction"
    },
    {
      name: "Buyer B (FreshKart Foods - BEST MATCH)",
      offer: 6480,
      transport: 70,
      storageRisk: 40,
      net: 6370,
      distance: "18 km",
      isWinner: true,
      note: "Highest actual net realization for farmer!"
    },
    {
      name: "Buyer C (AgriCorp Wholesale)",
      offer: 6250,
      transport: 40,
      storageRisk: 40,
      net: 6170,
      distance: "12 km",
      isWinner: false,
      note: "Closest distance, lower gross price"
    }
  ];

  return (
    <div className="core-differentiator-card">
      <div className="differentiator-header">
        <span className="section-kicker">SIGNATURE KISANSETU INNOVATION</span>
        <h2>Highest Quoted Offer ≠ Highest Farmer Earnings</h2>
        <p>A quoted price of ₹6,500/q yields LESS net earnings than a ₹6,480/q offer due to transport & distance factors:</p>
      </div>

      <div className="comparison-editorial-grid">
        {buyersComparison.map((item) => (
          <div key={item.name} className={`comparison-card-box ${item.isWinner ? 'winner-card' : ''}`}>
            {item.isWinner && (
              <div className="best-value-ribbon">
                🏆 BEST OVERALL NET VALUE: {formatCurrency(item.net)}/q
              </div>
            )}
            
            <h4>{item.name}</h4>
            <span className="distance-sub">Distance: <strong>{item.distance}</strong></span>
            
            <div className="calc-row">
              <span>Quoted Offer Price:</span>
              <strong>{formatCurrency(item.offer)}/q</strong>
            </div>

            <div className="calc-row deduction">
              <span>Transport Cost:</span>
              <strong>−{formatCurrency(item.transport)}/q</strong>
            </div>

            <div className="calc-row deduction">
              <span>Storage Decay Risk:</span>
              <strong>−{formatCurrency(item.storageRisk)}/q</strong>
            </div>

            <div className="calc-row total-net-line">
              <span>Actual Net Realisation:</span>
              <strong>{formatCurrency(item.net)}/q</strong>
            </div>

            <p className="item-explanation-note">{item.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

