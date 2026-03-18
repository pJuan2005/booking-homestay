"use client";
// ============================================================
// TARGET: frontend/app/(public)/listings/page.tsx
// ============================================================

import { useState } from "react";
import { Search, SlidersHorizontal, MapPin, X } from "lucide-react";
import { properties } from "@/lib/mockData";
import { PropertyCard } from "@/components/shared/PropertyCard";

const TYPES = ["All", "Villa", "Apartment", "Cabin", "Cottage", "Studio", "House", "Penthouse"];
const LOCATIONS = ["Bali, Indonesia", "Aspen, Colorado, USA", "Manhattan, New York, USA", "Phuket, Thailand", "Bergen, Norway", "Paris, France", "Tokyo, Japan"];

export default function ListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceMax, setPriceMax] = useState(500);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const approvedProperties = properties.filter(p => p.status === "Approved");

  const filtered = approvedProperties.filter(p => {
    const matchSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPrice = p.price <= priceMax;
    const matchType = selectedType === "All" || p.type === selectedType;
    const matchRating = p.rating >= selectedRating;
    const matchLocation = selectedLocations.length === 0 || selectedLocations.some(l => p.location.includes(l.split(",")[0]));
    return matchSearch && matchPrice && matchType && matchRating && matchLocation;
  });

  const toggleLocation = (loc: string) => {
    setSelectedLocations(prev => prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setPriceMax(500);
    setSelectedType("All");
    setSelectedRating(0);
    setSelectedLocations([]);
  };

  const FilterSidebar = () => (
    <div className="hs-filter-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h5 style={{ fontWeight: 700, color: "#1e293b", margin: 0, fontSize: "1rem" }}>
          <SlidersHorizontal size={16} style={{ marginRight: 6, verticalAlign: "middle", color: "#2563EB" }} />
          Filters
        </h5>
        <button onClick={clearFilters} style={{ background: "none", border: "none", color: "#2563EB", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
          <X size={13} /> Clear All
        </button>
      </div>

      {/* Price Range */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <label className="hs-form-label" style={{ marginBottom: 0 }}>Price Per Night</label>
          <span style={{ color: "#2563EB", fontWeight: 700, fontSize: "0.9rem" }}>Up to ${priceMax}</span>
        </div>
        <input
          type="range" min={30} max={500} step={10}
          value={priceMax}
          onChange={e => setPriceMax(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#2563EB" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#94a3b8", marginTop: 4 }}>
          <span>$30</span><span>$500+</span>
        </div>
      </div>

      {/* Property Type */}
      <div style={{ marginBottom: 22 }}>
        <label className="hs-form-label">Property Type</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {TYPES.map(type => (
            <button key={type} onClick={() => setSelectedType(type)} style={{
              padding: "5px 12px", borderRadius: 20, fontSize: "0.8rem",
              border: `1.5px solid ${selectedType === type ? "#2563EB" : "#e2e8f0"}`,
              background: selectedType === type ? "#eff6ff" : "#fff",
              color: selectedType === type ? "#2563EB" : "#64748b",
              fontWeight: selectedType === type ? 700 : 500,
              cursor: "pointer", transition: "all 0.15s"
            }}>
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div style={{ marginBottom: 22 }}>
        <label className="hs-form-label">Location</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {LOCATIONS.map(loc => (
            <label key={loc} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: "0.85rem", color: "#475569" }}>
              <input
                type="checkbox"
                checked={selectedLocations.includes(loc)}
                onChange={() => toggleLocation(loc)}
                style={{ accentColor: "#2563EB" }}
              />
              <MapPin size={12} color="#94a3b8" />
              {loc}
            </label>
          ))}
        </div>
      </div>

      {/* Min Rating */}
      <div>
        <label className="hs-form-label">Minimum Rating</label>
        <div style={{ display: "flex", gap: 8 }}>
          {[0, 4.0, 4.5, 4.8].map(r => (
            <button key={r} onClick={() => setSelectedRating(r)} style={{
              flex: 1, padding: "6px 4px", borderRadius: 6, fontSize: "0.78rem",
              border: `1.5px solid ${selectedRating === r ? "#2563EB" : "#e2e8f0"}`,
              background: selectedRating === r ? "#eff6ff" : "#fff",
              color: selectedRating === r ? "#2563EB" : "#64748b",
              fontWeight: selectedRating === r ? 700 : 500,
              cursor: "pointer"
            }}>
              {r === 0 ? "Any" : `${r}+⭐`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* Page Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "28px 0" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div>
              <h1 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 4, fontSize: "1.6rem" }}>
                Explore Homestays
              </h1>
              <p style={{ color: "#64748b", margin: 0, fontSize: "0.9rem" }}>
                {filtered.length} properties available
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ position: "relative", minWidth: 260 }}>
                <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  className="hs-form-control"
                  placeholder="Search by name or location..."
                  style={{ paddingLeft: 36 }}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                className="d-md-none btn-outline-hs"
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px" }}
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <SlidersHorizontal size={15} /> Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "28px 16px" }}>
        <div className="row g-4">
          {/* Filter Sidebar */}
          <div className="col-lg-3 col-md-4 d-none d-md-block">
            <FilterSidebar />
          </div>

          {/* Mobile Filter */}
          {filterOpen && (
            <div className="col-12 d-md-none">
              <FilterSidebar />
            </div>
          )}

          {/* Properties Grid */}
          <div className="col-lg-9 col-md-8">
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>🔍</div>
                <h3 style={{ color: "#1e293b", fontWeight: 700 }}>No properties found</h3>
                <p style={{ color: "#64748b" }}>Try adjusting your filters</p>
                <button className="btn-primary-hs" onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : (
              <div className="row g-4">
                {filtered.map(property => (
                  <div key={property.id} className="col-xl-4 col-lg-6 col-md-12 col-sm-6">
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
