import React, { useState } from 'react';

/**
 * ORDER LIFECYCLE & DISPUTE RESOLUTION (SIH Feature 12, 13, 14, 15, 16)
 * End-to-end status tracking from order confirmation to escrow payment release.
 */
export default function OrderLifecycle({ referenceId, crop, quantity, amount, buyerName, formatCurrency }) {
  const [currentStep, setCurrentStep] = useState(3); // 1 to 7
  const [showHandoverModal, setShowHandoverModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [disputeRaised, setDisputeRaised] = useState(false);

  const steps = [
    { id: 1, title: "Order Placed", desc: "Farmer accepted buyer match" },
    { id: 2, title: "Buyer Confirmed", desc: "Escrow funds locked in KisanSetu" },
    { id: 3, title: "Transport Assigned", desc: "Shared truck vehicle en route" },
    { id: 4, title: "Pickup Handover", desc: "Collection center weight verification" },
    { id: 5, title: "In Transit", desc: "GPS route tracking to buyer hub" },
    { id: 6, title: "Delivery Confirmed", desc: "Buyer quality acceptance" },
    { id: 7, title: "Payment Released", desc: "Funds transferred to farmer account" }
  ];

  return (
    <div className="order-lifecycle-card">
      <div className="lifecycle-header">
        <div>
          <span className="section-kicker">END-TO-END TRANSACTION LIFECYCLE</span>
          <h3>Order #{referenceId || 'KS-2026-9402'}</h3>
          <p>{crop} · {quantity} Quintals · Total Value: <strong>{formatCurrency(amount)}</strong></p>
        </div>
        <div className="buyer-callout-tag">
          Buyer: <strong>{buyerName || 'FreshKart Foods'}</strong>
        </div>
      </div>

      {/* Vertical/Horizontal Timeline */}
      <div className="lifecycle-timeline">
        {steps.map((step) => {
          const isDone = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          return (
            <div key={step.id} className={`timeline-step ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
              <div className="step-circle">
                {isDone ? '✓' : step.id}
              </div>
              <div className="step-info">
                <strong>{step.title}</strong>
                <small>{step.desc}</small>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Controls */}
      <div className="lifecycle-actions">
        {currentStep < 7 ? (
          <button 
            className="primary-button compact"
            onClick={() => setCurrentStep((prev) => Math.min(7, prev + 1))}
          >
            Simulate Next Lifecycle Step →
          </button>
        ) : (
          <div className="completed-banner">
            ✅ Transaction Successfully Completed & Funds Disbursed!
          </div>
        )}

        <button 
          className="secondary-button compact alert-btn"
          onClick={() => setShowDisputeModal(true)}
        >
          ⚠️ Raise Order Dispute
        </button>
      </div>

      {/* Dispute Modal */}
      {showDisputeModal && (
        <div className="modal-overlay">
          <div className="dispute-modal-card">
            <button className="close-button" onClick={() => setShowDisputeModal(false)}>×</button>
            <h3>Raise Quantity or Quality Dispute</h3>
            <p>Upload verification evidence if there is a weight discrepancy or grade mismatch during handover.</p>
            
            <div className="dispute-form-field">
              <label>Select Dispute Reason</label>
              <select value={disputeReason} onChange={(e) => setDisputeReason(e.target.value)}>
                <option value="Quantity Mismatch">Quantity / Weight Discrepancy</option>
                <option value="Grade Mismatch">Quality Grade Discrepancy</option>
                <option value="Delay">Pickup / Transport Delay</option>
              </select>
            </div>

            <div className="dispute-form-field">
              <label>Evidence Description</label>
              <textarea placeholder="Describe the issue at pickup or delivery..." rows="3" />
            </div>

            {disputeRaised ? (
              <div className="dispute-success">
                ✅ Dispute #DSP-9402 Opened! Escrow payment locked pending resolution.
              </div>
            ) : (
              <button className="primary-button" onClick={() => setDisputeRaised(true)}>
                Submit Dispute Evidence
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

