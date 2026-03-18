"use client";
// ============================================================
// TARGET: frontend/app/admin/manage-booking/page.tsx
// ============================================================

import { useState } from "react";
import { Search, CalendarDays, Filter, RefreshCw } from "lucide-react";
import { bookings as initialBookings } from "@/lib/mockData";
import type { Booking } from "@/lib/mockData";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function ManageBookingsPage() {
  const [bookingList, setBookingList] = useState(initialBookings);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [updateModal, setUpdateModal] = useState<Booking | null>(null);
  const [newStatus, setNewStatus] = useState<"Pending" | "Confirmed" | "Cancelled">("Confirmed");

  const filtered = bookingList.filter(b => {
    const matchSearch = !search ||
      b.guestName.toLowerCase().includes(search.toLowerCase()) ||
      b.propertyTitle.toLowerCase().includes(search.toLowerCase()) ||
      b.hostName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleUpdateStatus = () => {
    if (!updateModal) return;
    setBookingList(prev => prev.map(b => b.id === updateModal.id ? { ...b, status: newStatus } : b));
    setUpdateModal(null);
  };

  const totalRevenue = bookingList.filter(b => b.status === "Confirmed").reduce((s, b) => s + b.totalPrice, 0);

  return (
    <div style={{ padding: "28px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 4, fontSize: "1.5rem" }}>Manage Bookings</h1>
        <p style={{ color: "#64748b", margin: 0 }}>View and manage all platform bookings</p>
      </div>

      {/* Summary */}
      <div className="row g-3 mb-4">
        {[
          { label: "Total Bookings", value: bookingList.length, color: "#2563EB", bg: "#eff6ff" },
          { label: "Confirmed", value: bookingList.filter(b => b.status === "Confirmed").length, color: "#16a34a", bg: "#dcfce7" },
          { label: "Pending", value: bookingList.filter(b => b.status === "Pending").length, color: "#d97706", bg: "#fef3c7" },
          { label: "Revenue", value: `$${totalRevenue.toLocaleString()}`, color: "#7c3aed", bg: "#f3e8ff" },
        ].map(s => (
          <div key={s.label} className="col-6 col-md-3">
            <div style={{ background: s.bg, borderRadius: 10, padding: "16px 18px", textAlign: "center" }}>
              <div style={{ fontSize: s.label === "Revenue" ? "1.3rem" : "1.8rem", fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: "0.82rem", color: s.color, fontWeight: 600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input className="hs-form-control" placeholder="Search guest, property, or host..."
            style={{ paddingLeft: 36 }} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <Filter size={14} color="#64748b" />
          {["All", "Confirmed", "Pending", "Cancelled"].map(s => (
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
          Showing {filtered.length} of {bookingList.length} bookings
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="hs-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Guest</th>
                <th>Property</th>
                <th>Host</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Nights</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ textAlign: "center", padding: "48px", color: "#94a3b8" }}>
                    No bookings found
                  </td>
                </tr>
              ) : filtered.map(b => (
                <tr key={b.id}>
                  <td style={{ fontWeight: 700, color: "#2563EB", fontSize: "0.87rem" }}>
                    #BK{String(b.id).padStart(4, "0")}
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 700, color: "#2563EB", flexShrink: 0 }}>
                        {b.guestName.split(" ").map(w => w[0]).join("")}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.87rem" }}>{b.guestName}</div>
                        <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{b.guestEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <img src={b.propertyImage} alt="" style={{ width: 36, height: 36, borderRadius: 6, objectFit: "cover", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.85rem", color: "#475569", maxWidth: 130, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.propertyTitle}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: "0.85rem", color: "#64748b" }}>{b.hostName}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.83rem", color: "#475569" }}>
                      <CalendarDays size={12} color="#2563EB" /> {b.checkIn}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.83rem", color: "#475569" }}>
                      <CalendarDays size={12} color="#94a3b8" /> {b.checkOut}
                    </div>
                  </td>
                  <td style={{ textAlign: "center", fontWeight: 600, color: "#1e293b" }}>{b.nights}</td>
                  <td style={{ fontWeight: 800, color: "#1e293b" }}>${b.totalPrice}</td>
                  <td><StatusBadge status={b.status} /></td>
                  <td>
                    <button
                      onClick={() => { setUpdateModal(b); setNewStatus(b.status); }}
                      style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 10px", borderRadius: 7, border: "1.5px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}
                    >
                      <RefreshCw size={13} /> Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Status Modal */}
      {updateModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 16, maxWidth: 420, width: "100%", padding: "28px" }}>
            <h3 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>Update Booking Status</h3>
            <p style={{ color: "#64748b", fontSize: "0.88rem", marginBottom: 20 }}>
              Booking <strong>#BK{String(updateModal.id).padStart(4, "0")}</strong> — {updateModal.guestName}
            </p>
            <div style={{ background: "#f8fafc", borderRadius: 8, padding: "12px 14px", marginBottom: 18 }}>
              <div style={{ fontSize: "0.83rem", color: "#64748b" }}>
                {updateModal.propertyTitle}<br />
                {updateModal.checkIn} → {updateModal.checkOut} · {updateModal.nights} nights<br />
                <strong style={{ color: "#1e293b" }}>${updateModal.totalPrice}</strong>
              </div>
            </div>
            <label className="hs-form-label">New Status</label>
            <select className="hs-form-control" style={{ marginBottom: 20 }}
              value={newStatus} onChange={e => setNewStatus(e.target.value as any)}>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleUpdateStatus} className="btn-primary-hs" style={{ flex: 1 }}>
                Update Status
              </button>
              <button onClick={() => setUpdateModal(null)} className="btn-outline-hs" style={{ flex: 1 }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
