"use client";
// ============================================================
// TARGET: frontend/app/admin/property-approvals/page.tsx
// ============================================================

import { useState } from "react";
import { CheckCircle, XCircle, Eye, MapPin, Star, Users, Bed, Bath, X } from "lucide-react";
import { properties as initialProperties } from "@/lib/mockData";
import type { Property } from "@/lib/mockData";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function PropertyApprovalsPage() {
  const [propList, setPropList] = useState(initialProperties);
  const [viewModal, setViewModal] = useState<Property | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectModal, setRejectModal] = useState<Property | null>(null);

  const pending = propList.filter(p => p.status === "Pending");
  const recentlyHandled = propList.filter(p => p.status !== "Pending").slice(0, 5);

  const approve = (id: number) => {
    setPropList(prev => prev.map(p => p.id === id ? { ...p, status: "Approved" as const } : p));
    if (viewModal?.id === id) setViewModal(null);
  };

  const reject = (id: number) => {
    setPropList(prev => prev.map(p => p.id === id ? { ...p, status: "Rejected" as const } : p));
    setRejectModal(null);
    setRejectReason("");
  };

  return (
    <div style={{ padding: "28px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 4, fontSize: "1.5rem" }}>Property Approvals</h1>
        <p style={{ color: "#64748b", margin: 0 }}>Review and approve pending property listings</p>
      </div>

      {/* Summary */}
      <div className="row g-3 mb-4">
        {[
          { label: "Pending Review", value: pending.length, color: "#d97706", bg: "#fef3c7" },
          { label: "Approved", value: propList.filter(p => p.status === "Approved").length, color: "#16a34a", bg: "#dcfce7" },
          { label: "Rejected", value: propList.filter(p => p.status === "Rejected").length, color: "#dc2626", bg: "#fee2e2" },
          { label: "Total", value: propList.length, color: "#2563EB", bg: "#eff6ff" },
        ].map(s => (
          <div key={s.label} className="col-6 col-md-3">
            <div style={{ background: s.bg, borderRadius: 10, padding: "16px 18px", textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: "0.82rem", color: s.color, fontWeight: 600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Pending Properties */}
      <div className="hs-card" style={{ overflow: "hidden", marginBottom: 24 }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#d97706" }} />
          <h3 style={{ fontWeight: 700, color: "#1e293b", margin: 0, fontSize: "1rem" }}>
            Pending Properties ({pending.length})
          </h3>
        </div>

        {pending.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px", color: "#64748b" }}>
            <CheckCircle size={40} color="#16a34a" style={{ marginBottom: 12 }} />
            <div style={{ fontWeight: 700, color: "#1e293b" }}>All caught up!</div>
            <div style={{ fontSize: "0.87rem" }}>No pending properties to review</div>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="hs-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Host</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Capacity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pending.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img src={p.image} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
                        <div>
                          <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.88rem", maxWidth: 160, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                          <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>ID #{p.id}</div>
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
                    <td style={{ fontWeight: 700, color: "#1e293b" }}>${p.price}<span style={{ color: "#94a3b8", fontWeight: 400, fontSize: "0.78rem" }}>/night</span></td>
                    <td style={{ fontSize: "0.85rem", color: "#64748b" }}>
                      <div><Users size={12} style={{ verticalAlign: "middle" }} /> {p.maxGuests} max</div>
                      <div><Bed size={12} style={{ verticalAlign: "middle" }} /> {p.bedrooms} beds</div>
                    </td>
                    <td><StatusBadge status={p.status} /></td>
                    <td>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <button onClick={() => setViewModal(p)} style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 10px", borderRadius: 7, border: "1.5px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>
                          <Eye size={13} /> View
                        </button>
                        <button onClick={() => approve(p.id)} style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 10px", borderRadius: 7, border: "none", background: "#dcfce7", color: "#16a34a", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}>
                          <CheckCircle size={13} /> Approve
                        </button>
                        <button onClick={() => setRejectModal(p)} style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 10px", borderRadius: 7, border: "none", background: "#fee2e2", color: "#dc2626", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}>
                          <XCircle size={13} /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recently Handled */}
      <div className="hs-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0" }}>
          <h3 style={{ fontWeight: 700, color: "#1e293b", margin: 0, fontSize: "1rem" }}>Recently Reviewed</h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="hs-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Host</th>
                <th>Type</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentlyHandled.map(p => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <img src={p.image} alt="" style={{ width: 38, height: 38, borderRadius: 6, objectFit: "cover" }} />
                      <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.87rem" }}>{p.title}</div>
                    </div>
                  </td>
                  <td style={{ fontSize: "0.87rem", color: "#64748b" }}>{p.hostName}</td>
                  <td><span style={{ background: "#f1f5f9", color: "#64748b", fontSize: "0.75rem", fontWeight: 700, padding: "3px 9px", borderRadius: 20 }}>{p.type}</span></td>
                  <td style={{ fontWeight: 700, color: "#1e293b" }}>${p.price}/night</td>
                  <td><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      {viewModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 16, maxWidth: 620, width: "100%", maxHeight: "90vh", overflow: "auto" }}>
            <div style={{ padding: "18px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontWeight: 700, color: "#1e293b", margin: 0 }}>Property Details</h3>
              <button onClick={() => setViewModal(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={20} color="#64748b" />
              </button>
            </div>
            <div style={{ padding: "24px" }}>
              <img src={viewModal.image} alt={viewModal.title} style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 10, marginBottom: 18 }} />
              <h2 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 8 }}>{viewModal.title}</h2>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.85rem", color: "#64748b" }}>
                  <MapPin size={14} color="#2563EB" /> {viewModal.location}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.85rem", color: "#64748b" }}>
                  <Users size={14} /> Max {viewModal.maxGuests} guests
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.85rem", color: "#64748b" }}>
                  <Bed size={14} /> {viewModal.bedrooms} beds
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.85rem", color: "#64748b" }}>
                  <Bath size={14} /> {viewModal.bathrooms} baths
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <span style={{ background: "#eff6ff", color: "#2563EB", fontSize: "0.78rem", fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>{viewModal.type}</span>
                <span style={{ fontWeight: 800, color: "#1e293b", fontSize: "1rem" }}>${viewModal.price}/night</span>
              </div>
              <p style={{ color: "#475569", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: 18 }}>{viewModal.description}</p>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 8, fontSize: "0.9rem" }}>Amenities:</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {viewModal.amenities.map(a => (
                    <span key={a} style={{ background: "#f1f5f9", color: "#475569", fontSize: "0.78rem", padding: "4px 10px", borderRadius: 20 }}>{a}</span>
                  ))}
                </div>
              </div>
              <div style={{ fontWeight: 700, color: "#64748b", fontSize: "0.85rem", marginBottom: 18 }}>
                Submitted by: {viewModal.hostName}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => approve(viewModal.id)} className="btn-primary-hs" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#16a34a", borderColor: "#16a34a" }}>
                  <CheckCircle size={16} /> Approve Property
                </button>
                <button onClick={() => { setRejectModal(viewModal); setViewModal(null); }} style={{ flex: 1, background: "#fee2e2", border: "none", borderRadius: 8, padding: "10px", color: "#dc2626", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <XCircle size={16} /> Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Modal */}
      {rejectModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 16, maxWidth: 440, width: "100%" }}>
            <div style={{ padding: "18px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontWeight: 700, color: "#1e293b", margin: 0 }}>Reject Property</h3>
              <button onClick={() => setRejectModal(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={20} color="#64748b" />
              </button>
            </div>
            <div style={{ padding: "24px" }}>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: 16 }}>
                Please provide a reason for rejecting <strong>"{rejectModal.title}"</strong>. This will be sent to the host.
              </p>
              <textarea
                className="hs-form-control"
                rows={4}
                placeholder="e.g. The property does not meet our quality standards. Please upload high-resolution photos and update your description..."
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                style={{ marginBottom: 16, resize: "vertical" }}
              />
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => reject(rejectModal.id)} style={{ flex: 1, background: "#dc2626", border: "none", borderRadius: 8, padding: "10px", color: "#fff", fontWeight: 700, cursor: "pointer" }}>
                  Confirm Rejection
                </button>
                <button onClick={() => setRejectModal(null)} className="btn-outline-hs" style={{ flex: 1 }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
