import React, { useState } from 'react';

/**
 * BUYER DISCOVERY & LOT DETAIL VIEW (SIH Feature 15, 16)
 * Dedicated buyer experience for finding verified produce lots.
 */
export default function BuyerMarketplaceLotDetail({ formatCurrency }) {
  const [selectedLot, setSelectedLot] = useState(null);

  const produceLots = [
    {
      id: "KS-GN-2026-00124",
      crop: "Groundnut",
      quantity: 10,
      grade: "Grade A",
      price: 6300,
      farmer: "Ramesh Kumar (Verified Farmer)",
      location: "Chevella, Telangana",
      distance: "18 km",
      harvestAge: "23 days ago",
      storage: "Farm Warehouse",
      confidence: 88,
      img: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "KS-TM-2026-00381",
      crop: "Tomato",
      quantity: 15,
      grade: "Premium A+",
      price: 2420,
      farmer: "Suresh Reddy",
      location: "Shamshabad, Telangana",
      distance: "24 km",
      harvestAge: "2 days ago",
      storage: "Fresh Picked",
      confidence: 94,
      img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "KS-RC-2026-00912",
      crop: "Rice (Sona Masoori)",
      quantity: 25,
      grade: "Grade A",
      price: 2800,
      farmer: "Anitha Devi",
      location: "Warangal Hub",
      distance: "62 km",
      harvestAge: "45 days ago",
      storage: "State Warehouse",
      confidence: 91,
      img: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="buyer-marketplace-container">
      <div className="buyer-hero-header">
        <span className="section-kicker">BUYER PROCUREMENT ENGINE</span>
        <h2>Find Verified Produce Lots</h2>
        <p>Direct procurement from verified farmers with transparent harvest passports & escrow payment protection.</p>
      </div>

      {/* Lot Listings Grid */}
      <div className="lots-grid">
        {produceLots.map((lot) => (
          <div key={lot.id} className="lot-card-item">
            <div className="lot-card-img" style={{ backgroundImage: `url(${lot.img})` }}>
              <span className="lot-id-badge">{lot.id}</span>
              <span className="confidence-chip">{lot.confidence}% Quality Confidence</span>
            </div>

            <div className="lot-card-body">
              <div className="lot-crop-title">
                <h3>{lot.crop} ({lot.quantity} Quintals)</h3>
                <span className="grade-badge">{lot.grade}</span>
              </div>

              <p className="lot-farmer-line">👨‍🌾 {lot.farmer} · 📍 {lot.location} ({lot.distance})</p>

              <div className="lot-passport-summary">
                <span>Harvested: <strong>{lot.harvestAge}</strong></span>
                <span>Storage: <strong>{lot.storage}</strong></span>
              </div>

              <div className="lot-price-footer">
                <div>
                  <small>Price per Quintal</small>
                  <strong>{formatCurrency(lot.price)}/q</strong>
                </div>
                <button 
                  className="primary-button compact"
                  onClick={() => setSelectedLot(lot)}
                >
                  View Lot Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lot Detail Modal */}
      {selectedLot && (
        <div className="modal-overlay">
          <div className="lot-detail-modal">
            <button className="close-button" onClick={() => setSelectedLot(null)}>×</button>

            <div className="modal-top-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(18,53,36,0.95) 100%), url(${selectedLot.img})` }}>
              <span className="lot-modal-id">LOT #{selectedLot.id}</span>
              <h2>{selectedLot.crop} — {selectedLot.quantity} Quintals</h2>
            </div>

            <div className="modal-content-grid">
              <div className="modal-section">
                <h4>Harvest & Storage Passport</h4>
                <div className="passport-detail-box">
                  <div className="detail-row"><span>Harvest Age:</span> <strong>{selectedLot.harvestAge}</strong></div>
                  <div className="detail-row"><span>Storage Method:</span> <strong>{selectedLot.storage}</strong></div>
                  <div className="detail-row"><span>Quality Confidence:</span> <strong>{selectedLot.confidence}% Verified ✓</strong></div>
                  <div className="detail-row"><span>Photos Attached:</span> <strong>3 Live Photos ✓</strong></div>
                </div>
              </div>

              <div className="modal-section">
                <h4>Net Procurement Cost Breakdown</h4>
                <div className="cost-breakdown-box">
                  <div className="detail-row"><span>Produce Total ({selectedLot.quantity}q @ {formatCurrency(selectedLot.price)}):</span> <strong>{formatCurrency(selectedLot.price * selectedLot.quantity)}</strong></div>
                  <div className="detail-row"><span>Estimated Transport ({selectedLot.distance}):</span> <strong>+{formatCurrency(1500)}</strong></div>
                  <div className="detail-row total-cost-row"><span>Total Purchase Cost:</span> <strong>{formatCurrency((selectedLot.price * selectedLot.quantity) + 1500)}</strong></div>
                </div>
              </div>
            </div>

            <div className="modal-cta-footer">
              <button className="primary-button" onClick={() => { alert(`Order placed for Lot ${selectedLot.id}! Funds held safely in Escrow.`); setSelectedLot(null); }}>
                Place Escrow Order ({formatCurrency((selectedLot.price * selectedLot.quantity) + 1500)}) →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

