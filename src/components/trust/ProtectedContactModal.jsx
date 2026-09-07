import React, { useState } from "react";
import { SAMPLE_CONTACT_LOGS } from "../../data/trustSafetyData";

export default function ProtectedContactModal({ isOpen, onClose, targetUser, cropName, quantity }) {
  const [selectedReason, setSelectedReason] = useState("Confirm quantity and pickup schedule");
  const [customNotes, setCustomNotes] = useState("");
  const [callState, setCallState] = useState("idle"); // 'idle' | 'requesting' | 'connected' | 'ended'
  const [logs, setLogs] = useState(SAMPLE_CONTACT_LOGS);

  if (!isOpen) return null;

  const isBuyerCalling = targetUser?.role === "Farmer";
  const recipientName = targetUser?.name || (isBuyerCalling ? "Ramesh Kumar" : "FreshKart Foods");
  const recipientRole = targetUser?.role || (isBuyerCalling ? "Farmer" : "Corporate Buyer");

  const callReasons = isBuyerCalling
    ? [
        "Confirm quantity and pickup schedule",
        "Discuss produce quality & moisture level",
        "Inquire about harvest & storage age",
        "Clarify farm gate location directions",
        "Negotiate price / bulk volume discount"
      ]
    : [
        "Confirm order acceptance & pickup time",
        "Inquire about logistics truck arrival",
        "Clarify delivery destination warehouse",
        "Discuss payment escrow release",
        "Confirm quantity loading status"
      ];

  const handleInitiateCall = () => {
    setCallState("requesting");
    
    // Simulate connection delay
    setTimeout(() => {
      setCallState("connected");
      
      // Add new call log entry
      const newLog = {
        id: `LOG-${Date.now()}`,
        timestamp: "Just Now",
        orderId: "KS-LOT-2026-9402",
        crop: cropName || "Groundnut (Pod)",
        buyerName: isBuyerCalling ? "FreshKart Foods" : recipientName,
        farmerName: isBuyerCalling ? recipientName : "Ramesh Kumar",
        initiatedBy: isBuyerCalling ? "Buyer" : "Farmer",
        reason: selectedReason,
        type: "Protected Call",
        status: "Completed (Demo)",
        duration: "0m 45s",
        notes: customNotes || "Simulated masked telephony session."
      };
      setLogs([newLog, ...logs]);
    }, 2000);
  };

  const handleEndCall = () => {
    setCallState("ended");
    setTimeout(() => {
      setCallState("idle");
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay" style={overlayStyle}>
      <div className="modal-card trust-modal" style={modalCardStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "24px" }}>🛡️</span>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.15rem", color: "#1b382b", fontWeight: 700 }}>
                KisanSetu Protected Contact
              </h3>
              <span style={{ fontSize: "0.75rem", color: "#4d6056", fontWeight: 500 }}>
                PROTOTYPE MASKED TELEPHONY SERVICE
              </span>
            </div>
          </div>
          <button onClick={onClose} style={closeButtonStyle}>✕</button>
        </div>

        {/* Content depending on call state */}
        {callState === "idle" && (
          <div style={{ padding: "20px" }}>
            {/* Target Profile Card */}
            <div style={userCardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: "1.05rem", color: "#112a1d" }}>{recipientName}</h4>
                  <p style={{ margin: "4px 0", fontSize: "0.85rem", color: "#4d6056" }}>
                    ● {recipientRole} | Chevella Region
                  </p>
                </div>
                <span className="trust-badge-chip" style={badgeChipStyle}>
                  92/100 Trust Score
                </span>
              </div>
              <div style={{ marginTop: "10px", fontSize: "0.82rem", color: "#2c483a", background: "#f2f7f4", padding: "8px 12px", borderRadius: "8px" }}>
                🌾 <strong>Lot:</strong> {cropName || "Groundnut (Pod)"} ({quantity || "10 Quintals"})
              </div>
            </div>

            {/* Privacy Protection Notice */}
            <div style={privacyNoticeStyle}>
              <span>🔒</span>
              <div style={{ fontSize: "0.8rem", color: "#2d5240", lineHeight: 1.4 }}>
                <strong>Personal Phone Numbers Are Masked.</strong> Neither party sees personal mobile numbers.
                Calls are routed through KisanSetu's secure virtual exchange for safety & recording.
              </div>
            </div>

            {/* Call Reason Selector */}
            <div style={{ marginTop: "16px" }}>
              <label style={labelStyle}>Select Contact Purpose (Required):</label>
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                style={selectStyle}
              >
                {callReasons.map((r, i) => (
                  <option key={i} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div style={{ marginTop: "12px" }}>
              <label style={labelStyle}>Optional Note / Question:</label>
              <input
                type="text"
                placeholder="e.g. Asking about moisture certificate before dispatch"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <button
                onClick={handleInitiateCall}
                style={primaryCallButtonStyle}
              >
                📞 Initiate Protected Call
              </button>
              <button
                onClick={() => {
                  alert(`Message sent to ${recipientName}: "${selectedReason}"`);
                  onClose();
                }}
                style={secondaryMessageButtonStyle}
              >
                💬 Send Protected Message
              </button>
            </div>

            {/* Activity History Log */}
            <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #e2ebe6" }}>
              <h5 style={{ margin: "0 0 10px 0", fontSize: "0.85rem", color: "#3a5647", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Recent Contact Activity Log
              </h5>
              <div style={{ maxHeight: "120px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
                {logs.map((log) => (
                  <div key={log.id} style={logItemStyle}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 600 }}>
                      <span>{log.initiatedBy === "Buyer" ? "FreshKart Foods" : "Ramesh Kumar"}</span>
                      <span style={{ color: "#2e7d32" }}>{log.status}</span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#556b60", marginTop: "2px" }}>
                      {log.reason} • {log.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Calling In Progress Screen */}
        {(callState === "requesting" || callState === "connected" || callState === "ended") && (
          <div style={callingScreenStyle}>
            <div style={pulseAvatarStyle}>
              <span>{callState === "connected" ? "🎙️" : callState === "ended" ? "✅" : "📞"}</span>
            </div>
            <h4 style={{ margin: "16px 0 4px 0", fontSize: "1.2rem", color: "#112a1d" }}>
              {callState === "requesting" && `Connecting to ${recipientName}...`}
              {callState === "connected" && `Connected with ${recipientName}`}
              {callState === "ended" && `Call Ended Safely`}
            </h4>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#4d6056" }}>
              {callState === "requesting" && "Routing through KisanSetu Masked Telephony Relay..."}
              {callState === "connected" && "00:45 | Encrypted & Masked Virtual Line Active"}
              {callState === "ended" && "Call summary logged to Order Evidence Vault"}
            </p>

            <div style={disclaimerChipStyle}>
              🛡️ "Do not share sensitive bank OTPs or financial passwords during call."
            </div>

            {callState === "connected" && (
              <button onClick={handleEndCall} style={endCallButtonStyle}>
                🔴 End Protected Call
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Inline styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
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
  maxWidth: "520px",
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
  color: "#2e7d32",
  padding: "4px 8px"
};

const userCardStyle = {
  background: "#f9fcfb",
  border: "1px solid #d0e1d7",
  borderRadius: "12px",
  padding: "14px"
};

const badgeChipStyle = {
  background: "#1b5e20",
  color: "#ffffff",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "0.75rem",
  fontWeight: 700
};

const privacyNoticeStyle = {
  marginTop: "12px",
  background: "#eef7f2",
  borderLeft: "4px solid #2e7d32",
  padding: "10px 12px",
  borderRadius: "0 8px 8px 0",
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const labelStyle = {
  display: "block",
  fontSize: "0.82rem",
  fontWeight: 700,
  color: "#274436",
  marginBottom: "6px"
};

const selectStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #b2cfbe",
  fontSize: "0.85rem",
  color: "#183324",
  outline: "none"
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #b2cfbe",
  fontSize: "0.85rem",
  color: "#183324",
  outline: "none",
  boxSizing: "border-box"
};

const primaryCallButtonStyle = {
  flex: 1,
  background: "#2e7d32",
  color: "#ffffff",
  border: "none",
  padding: "12px 16px",
  borderRadius: "10px",
  fontWeight: 700,
  fontSize: "0.9rem",
  cursor: "pointer"
};

const secondaryMessageButtonStyle = {
  flex: 1,
  background: "#e8f5e9",
  color: "#1b5e20",
  border: "1px solid #a5d6a7",
  padding: "12px 16px",
  borderRadius: "10px",
  fontWeight: 700,
  fontSize: "0.88rem",
  cursor: "pointer"
};

const logItemStyle = {
  background: "#f4f8f6",
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #e0eae4"
};

const callingScreenStyle = {
  padding: "40px 20px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const pulseAvatarStyle = {
  width: "72px",
  height: "72px",
  borderRadius: "50%",
  background: "#e8f5e9",
  border: "3px solid #2e7d32",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2rem",
  boxShadow: "0 0 0 10px rgba(46, 125, 50, 0.15)"
};

const disclaimerChipStyle = {
  marginTop: "20px",
  background: "#fff3e0",
  color: "#e65100",
  padding: "8px 14px",
  borderRadius: "20px",
  fontSize: "0.75rem",
  fontWeight: 600
};

const endCallButtonStyle = {
  marginTop: "24px",
  background: "#d32f2f",
  color: "#ffffff",
  border: "none",
  padding: "12px 24px",
  borderRadius: "24px",
  fontWeight: 700,
  fontSize: "0.9rem",
  cursor: "pointer"
};

