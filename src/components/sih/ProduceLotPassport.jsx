import React, { useState } from 'react';

/**
 * PRODUCE LOT & HARVEST/STORAGE PASSPORT (SIH Feature 1, 2, 3, 4)
 * Solves the real-world problem of produce age, moisture & storage decay.
 * Calculates Quality Confidence % transparently.
 */
export default function ProduceLotPassport({ crop, quantity, quality, location, onPassportUpdate }) {
  const [harvestDays, setHarvestDays] = useState(23);
  const [storageType, setStorageType] = useState("Farmer Storage");
  const [moisture, setMoisture] = useState("8.7");
  const [hasLabTest, setHasLabTest] = useState(false);
  const [pestStatus, setPestStatus] = useState("None Observed");

  // Generate Lot ID
  const lotId = `KS-${crop.substring(0, 3).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  // Determine Storage Passport Category
  let passportBadge = { label: "FRESH", color: "green", desc: "Harvested within 30 days" };
  if (harvestDays > 180) {
    passportBadge = { label: "QUALITY VERIFICATION RECOMMENDED", color: "red", desc: "Storage exceeds 6 months" };
  } else if (harvestDays > 90) {
    passportBadge = { label: "LONG STORED", color: "orange", desc: "Stored between 3-6 months" };
  } else if (harvestDays > 30) {
    passportBadge = { label: "STORED", color: "yellow", desc: "Stored between 1-3 months" };
  }

  // Calculate Quality Confidence Score
  let confidenceScore = 60;
  if (harvestDays <= 30) confidenceScore += 15;
  if (moisture) confidenceScore += 10;
  if (hasLabTest) confidenceScore += 15;

  return (
    <div className="produce-passport-card">
      <div className="passport-header">
        <div>
          <span className="section-kicker">FEATURED PASSPORT</span>
          <h3>Harvest & Storage Passport</h3>
          <p className="lot-id-tag">LOT ID: <strong>{lotId}</strong></p>
        </div>
        <div className={`passport-badge badge-${passportBadge.color}`}>
          <span>● {passportBadge.label}</span>
          <small>{passportBadge.desc}</small>
        </div>
      </div>

      <div className="passport-grid">
        <div className="passport-field">
          <label>Days Since Harvest</label>
          <div className="range-input-group">
            <input 
              type="range" 
              min="1" 
              max="200" 
              value={harvestDays} 
              onChange={(e) => setHarvestDays(Number(e.target.value))} 
            />
            <strong>{harvestDays} Days Ago</strong>
          </div>
        </div>

        <div className="passport-field">
          <label>Storage Method</label>
          <select value={storageType} onChange={(e) => setStorageType(e.target.value)}>
            <option value="Farmer Storage">Farm Shed / Granary</option>
            <option value="Warehouse">State Warehouse (CWD)</option>
            <option value="Cold Storage">Cold Storage Facility</option>
          </select>
        </div>

        <div className="passport-field">
          <label>Grain Moisture (%)</label>
          <input 
            type="number" 
            step="0.1"
            value={moisture}
            onChange={(e) => setMoisture(e.target.value)}
            placeholder="e.g. 8.7"
          />
        </div>

        <div className="passport-field">
          <label>Pest Observation</label>
          <select value={pestStatus} onChange={(e) => setPestStatus(e.target.value)}>
            <option value="None Observed">None Observed ✓</option>
            <option value="Minor Damage">Minor Grain Damage</option>
            <option value="Treated">Fumigated / Treated</option>
          </select>
        </div>
      </div>

      {/* Quality Confidence Bar */}
      <div className="confidence-meter-container">
        <div className="confidence-meter-header">
          <span>Quality Confidence Score</span>
          <strong>{confidenceScore}%</strong>
        </div>
        <div className="confidence-track">
          <div className="confidence-fill" style={{ width: `${confidenceScore}%` }} />
        </div>
        <div className="confidence-breakdown">
          <span>Harvest Info: ✓</span>
          <span>Storage Method: ✓</span>
          <span>Moisture Test: {moisture ? '✓' : 'Pending'}</span>
          <span>Lab Certification: {hasLabTest ? 'Verified ✓' : 'Not Uploaded'}</span>
        </div>
      </div>

      {/* Lab Report Status */}
      <div className="lab-test-box">
        <div>
          <strong>Quality Lab Report</strong>
          <p>{hasLabTest ? 'Verified Laboratory Test Attached' : 'No Lab Report Attached (Optional)'}</p>
        </div>
        <button 
          className="secondary-button compact"
          onClick={() => setHasLabTest(!hasLabTest)}
        >
          {hasLabTest ? 'Remove Test' : '+ Attach Lab Report'}
        </button>
      </div>
    </div>
  );
}

