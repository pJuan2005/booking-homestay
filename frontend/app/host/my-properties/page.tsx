"use client";
// ============================================================
// TARGET: frontend/app/host/my-properties/page.tsx
// ============================================================

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Star, MapPin, Eye, AlertTriangle } from "lucide-react";
import { properties as initialProperties } from "@/lib/mockData";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function MyPropertiesPage() {
  const [props, setProps] = useState(initialProperties.filter(p => p.hostId === 2));
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setProps(prev => prev.filter(p => p.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div style={{ padding: "28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 4, fontSize: "1.5rem" }}>My Properties</h1>
          <p style={{ color: "#64748b", margin: 0 }}>{props.length} properties listed</p>
        </div>
        <Link href="/host/add-property">
          <button className="btn-primary-hs" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Plus size={16} /> Add New Property
          </button>
        </Link>
      </div>

      {/* Property Cards Grid */}
      <div className="row g-4">
        {props.length === 0 ? (
          <div className="col-12" style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>🏠</div>
            <h3 style={{ color: "#1e293b" }}>No properties yet</h3>
            <p style={{ color: "#64748b" }}>Start by adding your first property</p>
            <Link href="/host/add-property">
              <button className="btn-primary-hs" style={{ marginTop: 12 }}>Add Property</button>
            </Link>
          </div>
        ) : props.map(p => (
          <div key={p.id} className="col-xl-4 col-lg-6">
            <div className="hs-card" style={{ position: "relative" }}>
              {/* Status Banner */}
              <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2 }}>
                <StatusBadge status={p.status} />
              </div>

              <div style={{ overflow: "hidden" }}>
                <img src={p.image} alt={p.title} style={{ width: "100%", height: 190, objectFit: "cover" }} />
              </div>

              <div style={{ padding: "16px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <h3 style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.97rem", flex: 1, marginRight: 8, lineHeight: 1.35 }}>
                    {p.title}
                  </h3>
                  <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#1e293b", whiteSpace: "nowrap" }}>${p.price}<span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 400 }}>/night</span></span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
                  <MapPin size={12} color="#94a3b8" />
                  <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{p.location}</span>
                </div>

                <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", color: "#64748b" }}>
                    <Star size={12} fill="#f59e0b" color="#f59e0b" /> {p.rating} ({p.reviews})
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    👥 Max {p.maxGuests} guests
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    🛏️ {p.bedrooms} beds
                  </div>
                </div>

                {p.status === "Pending" && (
                  <div style={{ background: "#fef3c7", borderRadius: 8, padding: "8px 12px", marginBottom: 12, display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "#92400e" }}>
                    <AlertTriangle size={13} />
                    Awaiting admin approval
                  </div>
                )}
                {p.status === "Rejected" && (
                  <div style={{ background: "#fee2e2", borderRadius: 8, padding: "8px 12px", marginBottom: 12, display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "#991b1b" }}>
                    <AlertTriangle size={13} />
                    Property rejected — please review guidelines
                  </div>
                )}

                <div style={{ display: "flex", gap: 8 }}>
                  <Link href={`/property/${p.id}`} style={{ flex: 1 }}>
                    <button style={{ width: "100%", background: "#f1f5f9", border: "none", borderRadius: 8, padding: "8px", fontSize: "0.82rem", color: "#475569", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                      <Eye size={13} /> View
                    </button>
                  </Link>
                  <Link href={`/host/edit-property/${p.id}`} style={{ flex: 1 }}>
                    <button style={{ width: "100%", background: "#eff6ff", border: "none", borderRadius: 8, padding: "8px", fontSize: "0.82rem", color: "#2563EB", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                      <Edit2 size={13} /> Edit
                    </button>
                  </Link>
                  
                  {deleteConfirm === p.id ? (
                    <div style={{ display: "flex", gap: 4, flex: 1 }}>
                      <button onClick={() => handleDelete(p.id)} style={{ flex: 1, background: "#dc2626", border: "none", borderRadius: 8, padding: "8px 10px", fontSize: "0.8rem", color: "#fff", fontWeight: 700, cursor: "pointer" }}>
                        Delete
                      </button>
                      <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, background: "#f1f5f9", border: "none", borderRadius: 8, padding: "8px 10px", fontSize: "0.8rem", color: "#64748b", cursor: "pointer" }}>
                        No
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(p.id)} style={{ background: "#fee2e2", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Trash2 size={14} color="#dc2626" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
