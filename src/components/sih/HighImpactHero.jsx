import React from 'react';

/**
 * HIGH-IMPACT HERO & ROLE SELECTION (SIH Feature 7, 9)
 * Features real farm photography, glassmorphism floating cards,
 * and clear SIH value proposition: "Sell Smarter. Earn More. Move Your Produce."
 */
export default function HighImpactHero({ onSelectRole, onAnalyseClick, formatCurrency }) {
  const farmPhotoUrl = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80";

  return (
    <div className="sih-hero-container" style={{ backgroundImage: `linear-gradient(180deg, rgba(18, 53, 36, 0.82) 0%, rgba(13, 40, 23, 0.92) 100%), url(${farmPhotoUrl})` }}>
      <div className="sih-hero-content">
        <div className="hero-left-editorial">
          <div className="sih-badge">
            <span className="badge-dot">●</span> INTELLIGENT AGRI-MARKETPLACE
          </div>

          <h1>Sell Smarter.<br />Earn More.<br />Move Your Produce.</h1>

          <p className="hero-editorial-sub">
            KisanSetu connects farmers with verified buyers and calculates your <strong>ACTUAL Net Realisation</strong> after transport, storage decay, and distance deductions.
          </p>

          <div className="hero-cta-group">
            <button className="primary-glass-btn" onClick={() => onSelectRole('FARMER')}>
              <span className="btn-icon">🌾</span>
              <div>
                <strong>I'm a Farmer</strong>
                <small>Get AI recommendations & net earnings</small>
              </div>
              <span className="arrow">→</span>
            </button>

            <button className="secondary-glass-btn" onClick={() => onSelectRole('BUYER')}>
              <span className="btn-icon">🛒</span>
              <div>
                <strong>I'm a Buyer</strong>
                <small>Discover verified produce lots</small>
              </div>
              <span className="arrow">→</span>
            </button>
          </div>

          <div className="hero-trust-row">
            <span>✓ 14,280+ Farmers Connected</span>
            <span>✓ 98.2% Escrow Guarantee</span>
            <span>✓ Shared Freight Savings</span>
          </div>
        </div>

        {/* FLOATING GLASS DECISION WIDGET OVER REAL PHOTOGRAPHY */}
        <div className="hero-right-widget">
          <div className="glass-decision-widget">
            <div className="widget-header">
              <span className="kicker-tag">TODAY'S NEXT BEST DECISION</span>
              <span className="live-status-pill">● LIVE MARKET</span>
            </div>

            <div className="widget-crop-row">
              <img 
                src="https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=200&q=80" 
                alt="Groundnut Crop" 
                className="widget-crop-img"
              />
              <div>
                <h3>Groundnut (Lot KS-GN-9402)</h3>
                <span className="widget-price">₹6,300/q <small className="positive">+6.4% trend</small></span>
              </div>
            </div>

            <div className="widget-recommendation-box">
              <div className="rec-badge-group">
                <span className="rec-action-badge">RECOMMENDED: HOLD / WAIT 3 DAYS</span>
                <span className="confidence-pill">86% Confidence</span>
              </div>

              <div className="rec-metrics">
                <div>
                  <span>Expected Price</span>
                  <strong>{formatCurrency(6550)}/q</strong>
                </div>
                <div>
                  <span>Potential Net Gain</span>
                  <strong className="positive-gain">+{formatCurrency(250)}/q</strong>
                </div>
              </div>

              <div className="widget-reasons-list">
                <span>✓ High buyer demand index (84/100)</span>
                <span>✓ 8 verified buyers active in Chevella hub</span>
                <span>✓ Shared transport cost currently favorable</span>
              </div>
            </div>

            <button className="widget-cta-button" onClick={onAnalyseClick}>
              Analyse Your Produce Lot →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

