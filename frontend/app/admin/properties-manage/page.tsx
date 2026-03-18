"use client";
// ============================================================
// TARGET: frontend/app/admin/properties-manage/page.tsx
// ============================================================

import { useState } from "react";
import { Search, Edit2, Trash2, MapPin, Star, Filter, Eye } from "lucide-react";
import Link from "next/link";
import { properties as initialProperties } from "@/lib/mockData";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function ManagePropertiesPage() {
  const [propList, setPropList] = useState(initialProperties);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const types = ["All", ...Array.from(new Set(propList.map(p => p.type)))];

  const filtered = propList.filter(p => {
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.hostName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    const matchType = typeFilter === "All" || p.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const handleDelete = (id: number) => {
    setPropList(prev => prev.filter(p => p.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div style={{ padding: "28px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 4, fontSize: "1.5rem" }}>Manage Properties</h1>
        <p style={{ color: "#64748b", margin: 0 }}>All properties listed on the platform</p>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[
          { label: "Total", value: propList.length, color: "#2563EB", bg: "#eff6ff" },
          { label: "Approved", value: propList.filter(p => p.status === "Approved").length, color: "#16a34a", bg: "#dcfce7" },
          { label: "Pending", value: propList.filter(p => p.status === "Pending").length, color: "#d97706", bg: "#fef3c7" },
          { label: "Rejected", value: propList.filter(p => p.status === "Rejected").length, color: "#dc2626", bg: "#fee2e2" },
        ].map(s => (
          <div key={s.label} className="col-6 col-md-3">
            <div style={{ background: s.bg, borderRadius: 10, padding: "14px 18px", textAlign: "center" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: "0.8rem", color: s.color, fontWeight: 600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input className="hs-form-control" placeholder="Search by title, location, or host..."
            style={{ paddingLeft: 36 }} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <Filter size={14} color="#64748b" />
          {["All", "Approved", "Pending", "Rejected"].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} style={{
              padding: "6px 12px", borderRadius: 20, fontSize: "0.8rem",
              border: `1.5px solid ${statusFilter === s ? "#2563EB" : "#e2e8f0"}`,
              background: statusFilter === s ? "#eff6ff" : "#fff",
              color: statusFilter === s ? "#2563EB" : "#64748b",
              fontWeight: statusFilter === s ? 700 : 500, cursor: "pointer"
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="hs-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "12px 20px", borderBottom: "1px solid #e2e8f0", fontSize: "0.85rem", color: "#64748b" }}>
          Showing {filtered.length} of {propList.length} properties
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="hs-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Host</th>
                <th>Location</th>
                <th>Type</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "48px", color: "#94a3b8" }}>
                    No properties found
                  </td>
                </tr>
              ) : filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <img src={p.image} alt="" style={{ width: 46, height: 46, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.88rem", maxWidth: 160, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {p.title}
                        </div>
                        <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>
                          {p.bedrooms} beds · {p.maxGuests} guests max
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: "0.87rem", color: "#475569" }}>{p.hostName}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.85rem", color: "#64748b" }}>
                      <MapPin size={12} color="#94a3b8" /> {p.city}
                    </div>
                  </td>
                  <td>
                    <span style={{ background: "#eff6ff", color: "#2563EB", fontSize: "0.75rem", fontWeight: 700, padding: "3px 9px", borderRadius: 20 }}>{p.type}</span>
                  </td>
                  <td style={{ fontWeight: 700, color: "#1e293b" }}>${p.price}<span style={{ color: "#94a3b8", fontWeight: 400, fontSize: "0.77rem" }}>/night</span></td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Star size={13} fill="#f59e0b" color="#f59e0b" />
                      <span style={{ fontWeight: 700, fontSize: "0.87rem" }}>{p.rating}</span>
                      <span style={{ color: "#94a3b8", fontSize: "0.77rem" }}>({p.reviews})</span>
                    </div>
                  </td>
                  <td><StatusBadge status={p.status} /></td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Link href={`/user/explore`}>
                        <button style={{ padding: "6px 9px", borderRadius: 7, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center" }}>
                          <Eye size={13} color="#64748b" />
                        </button>
                      </Link>
                      <Link href={`/admin/edit-property/${p.id}`}>
                        <button style={{ padding: "6px 9px", borderRadius: 7, border: "none", background: "#eff6ff", cursor: "pointer", display: "flex", alignItems: "center" }}>
                          <Edit2 size={13} color="#2563EB" />
                        </button>
                      </Link>
                      {deleteConfirm === p.id ? (
                        <div style={{ display: "flex", gap: 4 }}>
                          <button onClick={() => handleDelete(p.id)} style={{ padding: "5px 8px", borderRadius: 7, border: "none", background: "#dc2626", color: "#fff", fontSize: "0.77rem", fontWeight: 700, cursor: "pointer" }}>Yes</button>
                          <button onClick={() => setDeleteConfirm(null)} style={{ padding: "5px 8px", borderRadius: 7, border: "none", background: "#f1f5f9", color: "#64748b", fontSize: "0.77rem", cursor: "pointer" }}>No</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(p.id)} style={{ padding: "6px 9px", borderRadius: 7, border: "none", background: "#fee2e2", cursor: "pointer", display: "flex", alignItems: "center" }}>
                          <Trash2 size={13} color="#dc2626" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
