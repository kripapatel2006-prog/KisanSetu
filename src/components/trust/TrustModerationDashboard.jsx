import React, { useState } from "react";
import { INITIAL_DISPUTES, MODERATION_METRICS, DEMO_APPEAL_CASES } from "../../data/trustSafetyData";

export default function TrustModerationDashboard() {
  const [disputes, setDisputes] = useState(INITIAL_DISPUTES);
  const [appeals, setAppeals] = useState(DEMO_APPEAL_CASES);
  const [activeScenarioMsg, setActiveScenarioMsg] = useState("");

  const handleResolveDispute = (disputeId, optionId, optionLabel) => {
    setDisputes(disputes.map(d => {
      if (d.id === disputeId) {
        return {
          ...d,
          status: `Resolved (${optionLabel})`,
          timeline: [
            ...d.timeline,
            { stage: "Moderator Resolution", time: "Just Now", detail: `Case closed via rule resolution: ${optionLabel}` }
          ]
        };
      }
      return d;
    }));
    setActiveScenarioMsg(`✅ Case ${disputeId} resolved: "${optionLabel}". Audit trail updated.`);
  };

  const handleApproveAppeal = (appealId) => {
    setAppeals(appeals.map(a => {
      if (a.id === appealId) {
        return { ...a, reviewStatus: "Approved - Restriction Lifted" };
      }
      return a;
    }));
    setActiveScenarioMsg(`⚖️ Appeal ${appealId} Approved! User status restored to 🟢 Trusted.`);
  };

  return (
    <div style={containerStyle}>
      {/* Header Banner */}
      <div style={headerStyle}>
        <div>
          <span style={badgeStyle}>PROTOTYPE MODERATION & TRUST DASHBOARD</span>
          <h2 style={{ margin: "6px 0 0 0", fontSize: "1.4rem", color: "#ffffff", fontWeight: 800 }}>
            Marketplace Audit & Dispute Control Panel
          </h2>
        </div>
        <div style={{ textAlign: "right", fontSize: "0.8rem", color: "#c8e6c9" }}>
          Live Audit Trail Active
        </div>
      </div>

      {/* Interactive Hackathon Demo Scenario Runner */}
      <div style={scenarioCardStyle}>
        <h4 style={{ margin: "0 0 8px 0", color: "#1e3a2b", fontSize: "0.95rem" }}>
          ⚡ SIH Evaluator One-Click Scenario Controls:
        </h4>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => handleResolveDispute("DISP-2026-8801", "transport_damage", "Transport Weather Exposure")}
            style={scenarioButtonStyle}
          >
            ▶ Scenario 1: Resolve Quality Claim as Transport Damage
          </button>
          <button
            onClick={() => {
              setActiveScenarioMsg("▶ Scenario 2: Payment Delay Dispute opened for Farmer Ramesh. Escrow auto-verification triggered.");
            }}
            style={scenarioButtonStyle}
          >
            ▶ Scenario 2: Test Buyer Payment Delay Resolution
          </button>
          <button
            onClick={() => {
              setActiveScenarioMsg("▶ Scenario 3: Progressive Warning & Restriction Appeal loaded for Farmer Venkat Rao.");
            }}
            style={scenarioButtonStyle}
          >
            ▶ Scenario 3: Test Warning → Restriction → Appeal Flow
          </button>
        </div>

        {activeScenarioMsg && (
          <div style={scenarioFeedbackStyle}>
            {activeScenarioMsg}
          </div>
        )}
      </div>

      {/* Moderation Metrics Grid */}
      <div style={metricsGridStyle}>
        <div style={metricBoxStyle}>
          <span style={metricNumStyle}>{MODERATION_METRICS.openDisputes}</span>
          <span style={metricLabelStyle}>Open Disputes</span>
        </div>
        <div style={metricBoxStyle}>
          <span style={metricNumStyle}>{MODERATION_METRICS.underReview}</span>
          <span style={metricLabelStyle}>Under Review</span>
        </div>
        <div style={metricBoxStyle}>
          <span style={metricNumStyle}>{MODERATION_METRICS.resolvedToday}</span>
          <span style={metricLabelStyle}>Resolved Today</span>
        </div>
        <div style={metricBoxStyle}>
          <span style={metricNumStyle}>{MODERATION_METRICS.appealsPending}</span>
          <span style={metricLabelStyle}>Appeals Pending</span>
        </div>
      </div>

      {/* Active Disputes Moderation List */}
      <h3 style={sectionHeaderStyle}>📋 Active Dispute Review Queue</h3>
      {disputes.map(dispute => (
        <div key={dispute.id} style={caseCardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <strong style={{ fontSize: "1.05rem", color: "#112a1d" }}>
                {dispute.id} | {dispute.cropName} ({dispute.quantity})
              </strong>
              <p style={{ margin: "4px 0", fontSize: "0.82rem", color: "#4d6056" }}>
                Complainant: {dispute.raisedBy} • Respondent: {dispute.respondent}
              </p>
            </div>
            <span style={statusChipStyle(dispute.status)}>
              {dispute.status}
            </span>
          </div>

          <div style={evidenceSummaryStyle}>
            <strong>Farm Gate Moisture:</strong> {dispute.pickupCondition.moistureReading} (Verified Dry) |{" "}
            <strong>Warehouse Moisture:</strong> {dispute.deliveryCondition.moistureReading} (Elevated in Transit)
          </div>

          {dispute.status.includes("Awaiting") && (
            <div style={{ marginTop: "14px", paddingTop: "10px", borderTop: "1px solid #e2ebe4" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1b382b", marginBottom: "8px" }}>
                Moderator Resolution Options:
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {dispute.resolutionOptions.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleResolveDispute(dispute.id, opt.id, opt.label)}
                    style={resolveButtonStyle}
                  >
                    ✓ {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Pending Appeals Section */}
      <h3 style={sectionHeaderStyle}>⚖️ Pending Status Appeals</h3>
      {appeals.map(appeal => (
        <div key={appeal.id} style={caseCardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <strong style={{ fontSize: "1rem", color: "#112a1d" }}>{appeal.userName} ({appeal.userRole})</strong>
              <span style={{ marginLeft: "8px", fontSize: "0.78rem", background: "#fff3e0", color: "#e65100", padding: "2px 8px", borderRadius: "10px", fontWeight: 700 }}>
                {appeal.currentStatus}
              </span>
            </div>
            <span style={{ fontSize: "0.8rem", color: "#15803d", fontWeight: 700 }}>
              {appeal.reviewStatus}
            </span>
          </div>

          <p style={{ margin: "8px 0 4px 0", fontSize: "0.83rem", color: "#334155" }}>
            <strong>Restriction Reason:</strong> {appeal.restrictionReason}
          </p>
          <p style={{ margin: "0 0 10px 0", fontSize: "0.83rem", color: "#334155" }}>
            <strong>Appeal Argument:</strong> {appeal.appealReason}
          </p>

          {appeal.reviewStatus === "Under Review" && (
            <button onClick={() => handleApproveAppeal(appeal.id)} style={resolveButtonStyle}>
              🤝 Approve Appeal & Restore Trust Status
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

// Inline Styles
const containerStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "20px 10px"
};

const headerStyle = {
  background: "linear-gradient(135deg, #112a1d 0%, #1b5e20 100%)",
  padding: "20px 24px",
  borderRadius: "16px",
  color: "#ffffff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

const badgeStyle = {
  background: "rgba(255, 255, 255, 0.15)",
  color: "#a5d6a7",
  padding: "4px 10px",
  borderRadius: "12px",
  fontSize: "0.72rem",
  fontWeight: 800,
  letterSpacing: "0.5px"
};

const scenarioCardStyle = {
  background: "#e8f5e9",
  border: "1.5px solid #a5d6a7",
  borderRadius: "14px",
  padding: "16px 20px",
  marginBottom: "20px"
};

const scenarioButtonStyle = {
  background: "#1b5e20",
  color: "#ffffff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  fontSize: "0.8rem",
  fontWeight: 700,
  cursor: "pointer"
};

const scenarioFeedbackStyle = {
  marginTop: "12px",
  background: "#ffffff",
  border: "1px solid #81c784",
  padding: "10px 14px",
  borderRadius: "8px",
  fontSize: "0.83rem",
  color: "#1b5e20",
  fontWeight: 600
};

const metricsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: "12px",
  marginBottom: "24px"
};

const metricBoxStyle = {
  background: "#ffffff",
  border: "1px solid #d4e6db",
  borderRadius: "12px",
  padding: "14px",
  textAlign: "center"
};

const metricNumStyle = {
  display: "block",
  fontSize: "1.8rem",
  fontWeight: 900,
  color: "#2e7d32"
};

const metricLabelStyle = {
  fontSize: "0.75rem",
  color: "#526e60",
  fontWeight: 700,
  textTransform: "uppercase"
};

const sectionHeaderStyle = {
  fontSize: "1.1rem",
  color: "#112a1d",
  fontWeight: 800,
  marginBottom: "12px"
};

const caseCardStyle = {
  background: "#ffffff",
  border: "1px solid #d4e6db",
  borderRadius: "14px",
  padding: "18px",
  marginBottom: "14px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
};

const evidenceSummaryStyle = {
  background: "#f8fafc",
  padding: "8px 12px",
  borderRadius: "8px",
  fontSize: "0.8rem",
  color: "#334155",
  marginTop: "8px"
};

const resolveButtonStyle = {
  background: "#e8f5e9",
  color: "#1b5e20",
  border: "1px solid #a5d6a7",
  padding: "6px 12px",
  borderRadius: "6px",
  fontSize: "0.78rem",
  fontWeight: 700,
  cursor: "pointer"
};

const statusChipStyle = (status) => ({
  background: status.includes("Resolved") ? "#dcfce7" : "#fef3c7",
  color: status.includes("Resolved") ? "#166534" : "#92400e",
  padding: "4px 10px",
  borderRadius: "12px",
  fontSize: "0.75rem",
  fontWeight: 800
});
