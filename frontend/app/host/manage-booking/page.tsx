"use client";
// ============================================================
// TARGET: frontend/app/host/manage-booking/page.tsx
// ============================================================

import { useState } from "react";
import { CalendarDays, Search, Users, Filter } from "lucide-react";
import { bookings } from "@/lib/mockData";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function HostBookingsPage() {
  const hostBookings = bookings.filter(b => b.hostId === 2);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = hostBookings.filter(b => {
    const matchFilter = filter === "All" || b.status === filter;
    const matchSearch = !search ||
      b.guestName.toLowerCase().includes(search.toLowerCase()) ||
      b.propertyTitle.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const summary = [
    { label: "Total", value: hostBookings.length, color: "#2563EB", bg: "#eff6ff" },
    { label: "Confirmed", value: hostBookings.filter(b => b.status === "Confirmed").length, color: "#16a34a", bg: "#dcfce7" },
    { label: "Pending", value: hostBookings.filter(b => b.status === "Pending").length, color: "#d97706", bg: "#fef3c7" },
    { label: "Cancelled", value: hostBookings.filter(b => b.status === "Cancelled").length, color: "#dc2626", bg: "#fee2e2" },
  ];

  return (
    <div style={{ padding: "28px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 4, fontSize: "1.5rem" }}>Bookings</h1>
        <p style={{ color: "#64748b", margin: 0 }}>Manage all reservations for your properties</p>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        {summary.map(s => (
          <div key={s.label} className="col-6 col-md-3">
            <div style={{ background: s.bg, borderRadius: 10, padding: "16px 18px", textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: "0.82rem", color: s.color, fontWeight: 600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input className="hs-form-control" placeholder="Search guest or property..."
            style={{ paddingLeft: 36 }} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <Filter size={14} color="#64748b" />
          {["All", "Confirmed", "Pending", "Cancelled"].map(status => (
            <button key={status} onClick={() => setFilter(status)} style={{
              padding: "7px 14px", borderRadius: 20, fontSize: "0.8rem",
              border: `1.5px solid ${filter === status ? "#2563EB" : "#e2e8f0"}`,
              background: filter === status ? "#eff6ff" : "#fff",
              color: filter === status ? "#2563EB" : "#64748b",
              fontWeight: filter === status ? 700 : 500, cursor: "pointer"
            }}>
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="hs-card" style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="hs-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Guest</th>
                <th>Property</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Nights</th>
                <th>Guests</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", padding: "48px", color: "#94a3b8" }}>
                    <div style={{ fontSize: "2rem", marginBottom: 8 }}>📅</div>
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
                        <div style={{ color: "#94a3b8", fontSize: "0.76rem" }}>{b.guestEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <img src={b.propertyImage} alt="" style={{ width: 36, height: 36, borderRadius: 6, objectFit: "cover", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.85rem", color: "#475569", maxWidth: 140, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {b.propertyTitle}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.85rem", color: "#475569" }}>
                      <CalendarDays size={13} color="#2563EB" /> {b.checkIn}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.85rem", color: "#475569" }}>
                      <CalendarDays size={13} color="#94a3b8" /> {b.checkOut}
                    </div>
                  </td>
                  <td style={{ textAlign: "center", fontSize: "0.87rem", fontWeight: 600, color: "#1e293b" }}>{b.nights}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.85rem", color: "#475569" }}>
                      <Users size={13} color="#94a3b8" /> {b.guests}
                    </div>
                  </td>
                  <td style={{ fontWeight: 800, color: "#1e293b" }}>${b.totalPrice}</td>
                  <td><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
