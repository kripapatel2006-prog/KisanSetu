import React, { useState } from 'react';
import { getCropImage } from '../../data/cropCatalogData';

/**
 * CATEGORIZED CROP CATALOG & FILTER
 * Uses single source of truth crop photography across all agricultural categories.
 */
export default function CropCatalogFilter({ selectedCrop, onSelectCrop }) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "ALL", label: "All Crops" },
    { id: "CEREALS", label: "Cereals (Rice, Wheat, Maize)" },
    { id: "PULSES", label: "Pulses (Tur, Moong, Urad, Chana)" },
    { id: "OILSEEDS", label: "Nuts & Oilseeds (Groundnut, Mustard)" },
    { id: "VEGETABLES", label: "Vegetables (Tomato, Onion, Potato)" },
    { id: "COMMERCIAL", label: "Commercial (Cotton, Turmeric, Coffee)" }
  ];

  const cropsCatalog = [
    { name: "Groundnut", category: "OILSEEDS", market: "Chevella Market", region: "Telangana / AP" },
    { name: "Tomato", category: "VEGETABLES", market: "Chevella Market", region: "Telangana / AP" },
    { name: "Onion", category: "VEGETABLES", market: "Nashik Yard", region: "Maharashtra" },
    { name: "Wheat", category: "CEREALS", market: "Ludhiana Market", region: "Punjab" },
    { name: "Rice", category: "CEREALS", market: "Warangal Yard", region: "Telangana" },
    { name: "Cotton", category: "COMMERCIAL", market: "Nagpur Yard", region: "Maharashtra" },
    { name: "Turmeric", category: "COMMERCIAL", market: "Nizamabad Yard", region: "Telangana" },
    { name: "Coffee", category: "COMMERCIAL", market: "Chikmagalur Yard", region: "Karnataka" },
    { name: "Green Gram (Moong)", category: "PULSES", market: "Latur Yard", region: "Maharashtra" },
    { name: "Red Gram (Tur)", category: "PULSES", market: "Gulbarga Hub", region: "Karnataka" }
  ];

  const filteredCrops = cropsCatalog.filter((c) => {
    const matchesCat = activeCategory === "ALL" || c.category === activeCategory;
    const matchesSearch = !searchQuery.trim() || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.market.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="crop-catalog-card">
      <div className="catalog-header">
        <span className="section-kicker">AGRICULTURAL CROP CATALOG</span>
        <h3>Select Crop Lot Identity</h3>
      </div>

      {/* Search Input */}
      <div className="catalog-search">
        <input 
          type="text" 
          placeholder="🔍 Search crops, pulse varieties, or market yards..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Pills */}
      <div className="category-chips-row">
        {categories.map((cat) => (
          <button 
            key={cat.id} 
            className={`chip ${activeCategory === cat.id ? 'chip-selected' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filtered Grid with Real Photography */}
      <div className="catalog-grid">
        {filteredCrops.map((item) => (
          <div 
            key={item.name} 
            className={`catalog-item-box ${selectedCrop === item.name ? 'active-crop' : ''}`}
            onClick={() => onSelectCrop(item.name)}
          >
            <div className="catalog-item-photo" style={{ backgroundImage: `url(${getCropImage(item.name)})` }} />
            <div className="catalog-item-details">
              <strong>{item.name}</strong>
              <small>📍 {item.market}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
