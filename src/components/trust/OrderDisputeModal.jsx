import React, { useState } from "react";
import { INITIAL_DISPUTES } from "../../data/trustSafetyData";

export default function OrderDisputeModal({ isOpen, onClose, userRole, initialDisputeId }) {
  const [activeDisputes, setActiveDisputes] = useState(INITIAL_DISPUTES);
  const [selectedDispute, setSelectedDispute] = useState(INITIAL_DISPUTES[0]);
  const [farmerResponseText, setFarmerResponseText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newCategory, setNewCategory] = useState("Spoiled / Quality Claim");
  const [newDescription, setNewDescription] = useState("");
  const [activeTab, setActiveTab] = useState("view"); // 'view' | 'create'

  if (!isOpen) return null;

  const handleFarmerRespond = (action) => {
    setIsSubmitted(true);
    setTimeout(() => {
      const updated = {
        ...selectedDispute,
        status: action === "accept" ? "Resolved (Farmer Accepted Adjustment)" : "Under Review (Farmer Evidence Submitted)",
        timeline: [
          ...selectedDispute.timeline,
          {
            stage: "Farmer Response Registered",
            time: "Just Now",
            detail: action === "accept" ? "Farmer accepted price adjustment." : `Farmer note: "${farmerResponseText || 'Pickup gate photos verified dry.'}"`
          }
        ]
      };
      setSelectedDispute(updated);
      setIsSubmitted(false);
    }, 1200);
  };

  const handleCreateDispute = (e) => {
    e.preventDefault();
    const created = {
      id: `DISP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: "KS-LOT-2026-9402",
      lotId: "KS-GN-2026-9402",
      cropName: "Groundnut (Pod)",
      quantity: "10 Quintals",
      raisedBy: userRole === "farmer" ? "Farmer (Ramesh Kumar)" : "Buyer (FreshKart Foods)",
      respondent: userRole === "farmer" ? "Buyer (FreshKart Foods)" : "Farmer (Ramesh Kumar)",
      dateOpened: "Just Now",
      category: newCategory,
      claimedIssue: newDescription || "Quality discrepancy flagged post-delivery.",
      status: "Awaiting Respondent",
      possibleCause: "Under Evidence Analysis",
      pickupCondition: {
        timestamp: "Today, 8:15 AM (At Farm Gate, Chevella)",
        quantityConfirmed: "10.0 Quintals",
        gradeConfirmed: "Grade A Pods",
        moistureReading: "10.2% (Dry)",
        photoUrl: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80",
        inspectedBy: "KisanSetu Field Agent"
      },
      deliveryCondition: {
        timestamp: "Today, 11:15 AM (At Buyer Warehouse)",
        quantityConfirmed: "9.8 Quintals",
        gradeClaimed: "Grade B",
        moistureReading: "13.5%",
        photoUrl: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&w=600&q=80",
        inspectedBy: "Receiving Agent"
      },
      timeline: [
        { stage: "Dispute Logged", time: "Just Now", detail: "Case registered into KisanSetu Evidence Vault." }
      ]
    };
    setActiveDisputes([created, ...activeDisputes]);
    setSelectedDispute(created);
    setActiveTab("view");
  };

  return (
    <div className="modal-overlay" style={overlayStyle}>
      <div className="modal-card trust-dispute-modal" style={modalCardStyle}>
        {/* Modal Header */}
        <div style={headerStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "24px" }}>⚖️</span>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.15rem", color: "#1b382b", fontWeight: 800 }}>
                KisanSetu Fair Dispute & Evidence Vault
              </h3>
              <span style={{ fontSize: "0.75rem", color: "#4d6056", fontWeight: 600 }}>
                EVIDENCE-BASED TWO-SIDED RESOLUTION SYSTEM
              </span>
            </div>
          </div>
          <button onClick={onClose} style={closeButtonStyle}>✕</button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", background: "#f0f7f2", borderBottom: "1px solid #d4e6db" }}>
          <button
            onClick={() => setActiveTab("view")}
            style={{ ...tabButtonStyle, borderBottom: activeTab === "view" ? "3px solid #2e7d32" : "none", color: activeTab === "view" ? "#1b5e20" : "#556e60" }}
          >
            📋 Active Cases ({activeDisputes.length})
          </button>
          <button
            onClick={() => setActiveTab("create")}
            style={{ ...tabButtonStyle, borderBottom: activeTab === "create" ? "3px solid #2e7d32" : "none", color: activeTab === "create" ? "#1b5e20" : "#556e60" }}
          >
            ➕ Report New Dispute / Issue
          </button>
        </div>

        {activeTab === "view" && selectedDispute && (
          <div style={{ padding: "20px", maxHeight: "75vh", overflowY: "auto" }}>
            {/* Case Selector Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div>
                <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#2e7d32" }}>
                  CASE ID: {selectedDispute.id}
                </span>
                <h4 style={{ margin: "2px 0 0 0", fontSize: "1.05rem", color: "#112a1d" }}>
                  {selectedDispute.cropName} ({selectedDispute.quantity})
                </h4>
              </div>
              <span style={statusChipStyle(selectedDispute.status)}>
                {selectedDispute.status}
              </span>
            </div>

            {/* Claim Summary Box */}
            <div style={claimSummaryBoxStyle}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#854d0e", marginBottom: "4px" }}>
                🚩 Category: {selectedDispute.category}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#334155", lineHeight: 1.4 }}>
                <strong>Issue Description:</strong> {selectedDispute.claimedIssue}
              </div>
              <div style={{ marginTop: "8px", fontSize: "0.78rem", color: "#64748b" }}>
                Raised by: {selectedDispute.raisedBy} | Date: {selectedDispute.dateOpened}
              </div>
            </div>

            {/* Signature Evidence Vault: Pickup vs Delivery Comparison */}
            <h5 style={sectionTitleStyle}>
              📸 Farm Gate Pickup vs Destination Delivery Evidence
            </h5>
            <div style={comparisonGridStyle}>
              {/* Pickup Photo & Data */}
              <div style={evidenceBoxStyle}>
                <div style={evidenceHeaderStyle}>
                  <span>📍 BEFORE TRANSPORT (Farm Gate)</span>
                </div>
                <img
                  src={selectedDispute.pickupCondition.photoUrl}
                  alt="Pickup Proof"
                  style={evidenceImgStyle}
                />
                <div style={{ padding: "10px", fontSize: "0.78rem", color: "#1e293b" }}>
                  <div><strong>Inspected:</strong> {selectedDispute.pickupCondition.timestamp}</div>
                  <div><strong>Quantity:</strong> {selectedDispute.pickupCondition.quantityConfirmed}</div>
                  <div><strong>Moisture:</strong> {selectedDispute.pickupCondition.moistureReading}</div>
                  <div style={{ color: "#15803d", fontWeight: 700, marginTop: "4px" }}>
                    ✓ Verified at Farm Pickup
                  </div>
                </div>
              </div>

              {/* Delivery Photo & Data */}
              <div style={evidenceBoxStyle}>
                <div style={{ ...evidenceHeaderStyle, background: "#fff7ed", color: "#9a3412" }}>
                  <span>🚚 AFTER DELIVERY (Warehouse)</span>
                </div>
                <img
                  src={selectedDispute.deliveryCondition.photoUrl}
                  alt="Delivery Proof"
                  style={evidenceImgStyle}
                />
                <div style={{ padding: "10px", fontSize: "0.78rem", color: "#1e293b" }}>
                  <div><strong>Inspected:</strong> {selectedDispute.deliveryCondition.timestamp}</div>
                  <div><strong>Quantity:</strong> {selectedDispute.deliveryCondition.quantityConfirmed}</div>
                  <div><strong>Moisture:</strong> {selectedDispute.deliveryCondition.moistureReading}</div>
                  <div style={{ color: "#c2410c", fontWeight: 700, marginTop: "4px" }}>
                    ⚠️ Buyer Reported Moisture Shift
                  </div>
                </div>
              </div>
            </div>

            {/* Transport Cause Analysis Disclaimer */}
            <div style={causeNoticeStyle}>
              <span>💡</span>
              <div style={{ fontSize: "0.8rem", color: "#1e3a2b" }}>
                <strong>Fair Analysis:</strong> Moisture level increased during 3-hour transit in open truck bed.
                KisanSetu algorithms flag transport weather exposure as the probable root cause. Neither farmer nor buyer is assigned fault.
              </div>
            </div>

            {/* 7-Stage Timeline */}
            <h5 style={sectionTitleStyle}>
              ⏳ Dispute Timeline & Audit Trail
            </h5>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
              {selectedDispute.timeline.map((step, idx) => (
                <div key={idx} style={timelineItemStyle}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#2e7d32", marginTop: "2px" }} />
                  <div>
                    <strong style={{ fontSize: "0.82rem", color: "#112a1d" }}>{step.stage}</strong> ({step.time})
                    <p style={{ margin: "2px 0 0 0", fontSize: "0.78rem", color: "#556e60" }}>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Farmer Action Form */}
            {userRole === "farmer" && selectedDispute.status.includes("Awaiting") && (
              <div style={responseActionBoxStyle}>
                <h5 style={{ margin: "0 0 10px 0", fontSize: "0.9rem", color: "#1b382b" }}>
                  Farmer Response Panel
                </h5>
                <textarea
                  placeholder="Explain pickup conditions or upload additional harvest gate photo proof..."
                  value={farmerResponseText}
                  onChange={(e) => setFarmerResponseText(e.target.value)}
                  style={textareaStyle}
                />
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button
                    onClick={() => handleFarmerRespond("respond")}
                    disabled={isSubmitted}
                    style={primaryButtonStyle}
                  >
                    {isSubmitted ? "Submitting Response..." : "📤 Submit Farm Gate Proof"}
                  </button>
                  <button
                    onClick={() => handleFarmerRespond("accept")}
                    disabled={isSubmitted}
                    style={secondaryButtonStyle}
                  >
                    🤝 Accept Minor Adjustment
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Create Dispute Tab */}
        {activeTab === "create" && (
          <form onSubmit={handleCreateDispute} style={{ padding: "20px" }}>
            <h4 style={{ margin: "0 0 16px 0", fontSize: "1.05rem", color: "#112a1d" }}>
              Lodge a Marketplace Dispute / Quality Claim
            </h4>

            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>Dispute Category:</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                style={selectStyle}
              >
                <option value="Spoiled / Quality Claim">Spoiled / Damaged Produce Claim</option>
                <option value="Quantity Mismatch">Quantity / Weight Shortage</option>
                <option value="Payment Issue">Buyer Refused Payment</option>
                <option value="Transport Spoilage">Transport Transit Damage</option>
                <option value="Harassment / Misconduct">Unprofessional Communication / Harassment</option>
              </select>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>Detailed Description of Issue:</label>
              <textarea
                required
                placeholder="Provide details about what went wrong, crop moisture, or weight differences..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                style={{ ...textareaStyle, height: "90px" }}
              />
            </div>

            <div style={uploadBoxStyle}>
              <span>📷 Attach Photographic Evidence / Lab Report</span>
              <p style={{ margin: "4px 0 0 0", fontSize: "0.75rem", color: "#64748b" }}>
                Upload photos taken at unloading. Mandatory for spoilage claims.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button type="submit" style={primaryButtonStyle}>
                🚀 Submit Dispute to Evidence Vault
              </button>
              <button type="button" onClick={() => setActiveTab("view")} style={secondaryButtonStyle}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// Inline Styles
const overlayStyle = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  background: "rgba(10, 24, 17, 0.75)",
  backdropFilter: "blur(6px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  padding: "20px"
};

const modalCardStyle = {
  background: "#ffffff",
  borderRadius: "16px",
  width: "100%",
  maxWidth: "680px",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
  overflow: "hidden",
  border: "1px solid rgba(46, 125, 50, 0.2)"
};

const headerStyle = {
  padding: "16px 20px",
  background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
  borderBottom: "1px solid #a5d6a7",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const closeButtonStyle = {
  background: "none",
  border: "none",
  fontSize: "1.2rem",
  cursor: "pointer",
  color: "#2e7d32"
};

const tabButtonStyle = {
  flex: 1,
  padding: "12px",
  background: "none",
  border: "none",
  fontWeight: 700,
  fontSize: "0.88rem",
  cursor: "pointer"
};

const claimSummaryBoxStyle = {
  background: "#fefce8",
  border: "1px solid #fef08a",
  borderRadius: "10px",
  padding: "12px",
  marginBottom: "16px"
};

const sectionTitleStyle = {
  margin: "18px 0 10px 0",
  fontSize: "0.9rem",
  color: "#1b382b",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.5px"
};

const comparisonGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "14px",
  marginBottom: "14px"
};

const evidenceBoxStyle = {
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  overflow: "hidden",
  background: "#f8fafc"
};

const evidenceHeaderStyle = {
  background: "#f1f5f9",
  padding: "6px 10px",
  fontSize: "0.72rem",
  fontWeight: 800,
  color: "#334155"
};

const evidenceImgStyle = {
  width: "100%",
  height: "120px",
  objectFit: "cover",
  display: "block"
};

const causeNoticeStyle = {
  background: "#f0fdf4",
  border: "1px solid #bbf7d0",
  borderRadius: "8px",
  padding: "10px 12px",
  display: "flex",
  gap: "10px",
  alignItems: "center",
  marginBottom: "16px"
};

const timelineItemStyle = {
  display: "flex",
  gap: "10px",
  background: "#f8fafc",
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #e2e8f0"
};

const responseActionBoxStyle = {
  background: "#f0f7f2",
  border: "1px solid #c2e0cb",
  borderRadius: "12px",
  padding: "14px",
  marginTop: "16px"
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "0.85rem",
  boxSizing: "border-box",
  fontFamily: "inherit"
};

const primaryButtonStyle = {
  background: "#2e7d32",
  color: "#ffffff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  fontWeight: 700,
  fontSize: "0.85rem",
  cursor: "pointer"
};

const secondaryButtonStyle = {
  background: "#ffffff",
  color: "#2e7d32",
  border: "1px solid #2e7d32",
  padding: "10px 16px",
  borderRadius: "8px",
  fontWeight: 700,
  fontSize: "0.85rem",
  cursor: "pointer"
};

const uploadBoxStyle = {
  border: "2px dashed #cbd5e1",
  borderRadius: "10px",
  padding: "16px",
  textAlign: "center",
  color: "#475569",
  background: "#f8fafc",
  cursor: "pointer",
  marginBottom: "16px"
};

const labelStyle = {
  display: "block",
  fontSize: "0.82rem",
  fontWeight: 700,
  color: "#1e293b",
  marginBottom: "6px"
};

const selectStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "0.85rem"
};

const statusChipStyle = (status) => ({
  background: status.includes("Resolved") ? "#dcfce7" : "#fef3c7",
  color: status.includes("Resolved") ? "#166534" : "#92400e",
  padding: "4px 10px",
  borderRadius: "16px",
  fontSize: "0.75rem",
  fontWeight: 800
});

