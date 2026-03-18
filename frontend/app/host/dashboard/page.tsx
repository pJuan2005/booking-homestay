"use client";
// ============================================================
// TARGET: frontend/app/host/dashboard/page.tsx
// ============================================================

import Link from "next/link";
import { Building2, CalendarDays, DollarSign, TrendingUp, ArrowRight, Star } from "lucide-react";
import { bookings, properties } from "@/lib/mockData";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useAuth } from "@/components/context/AuthContext";

export default function HostDashboardPage() {
  const { user } = useAuth();
  const displayName = user?.name || "Made Wijaya";
  const firstName = displayName.split(" ")[0];

  // In a real app, hostId would come from the authenticated user's ID
  const hostId = 2;
  const hostProperties = properties.filter(p => p.hostId === hostId);
  const hostBookings = bookings.filter(b => b.hostId === hostId);
  const revenue = hostBookings.filter(b => b.status === "Confirmed").reduce((s, b) => s + b.totalPrice, 0);

  const stats = [
    { icon: <Building2 size={22} color="#2563EB" />, bg: "#eff6ff", label: "My Properties", value: hostProperties.length, change: "+1 this month" },
    { icon: <CalendarDays size={22} color="#16a34a" />, bg: "#dcfce7", label: "Total Bookings", value: hostBookings.length, change: "+3 this week" },
    { icon: <DollarSign size={22} color="#d97706" />, bg: "#fef3c7", label: "Total Revenue", value: `$${revenue.toLocaleString()}`, change: "+12% vs last month" },
    { icon: <TrendingUp size={22} color="#7c3aed" />, bg: "#f3e8ff", label: "Avg. Rating", value: "4.8 ⭐", change: "Based on 47 reviews" },
  ];

  return (
    <div style={{ padding: "28px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 4, fontSize: "1.5rem" }}>Welcome back, {firstName}! 👋</h1>
        <p style={{ color: "#64748b", margin: 0 }}>Here's an overview of your hosting activity</p>
      </div>

      {/* Stat Cards */}
      <div className="row g-3 mb-4">
        {stats.map((stat, i) => (
          <div key={i} className="col-xl-3 col-md-6">
            <div className="hs-stat-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600, marginBottom: 6 }}>{stat.label}</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1e293b" }}>{stat.value}</div>
                </div>
                <div className="hs-stat-icon" style={{ background: stat.bg }}>
                  {stat.icon}
                </div>
              </div>
              <div style={{ fontSize: "0.77rem", color: "#16a34a", fontWeight: 600 }}>↑ {stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Recent Bookings */}
        <div className="col-lg-8">
          <div className="hs-card">
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontWeight: 700, color: "#1e293b", margin: 0, fontSize: "1rem" }}>Recent Bookings</h3>
              <Link href="/host/manage-booking">
                <button style={{ background: "none", border: "none", color: "#2563EB", fontSize: "0.83rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                  View All <ArrowRight size={13} />
                </button>
              </Link>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="hs-table">
                <thead>
                  <tr>
                    <th>Guest</th>
                    <th>Property</th>
                    <th>Dates</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {hostBookings.slice(0, 5).map(b => (
                    <tr key={b.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 700, color: "#2563EB" }}>
                            {b.guestName.split(" ").map(w => w[0]).join("")}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.87rem" }}>{b.guestName}</div>
                            <div style={{ color: "#94a3b8", fontSize: "0.76rem" }}>{b.guests} guests</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: "0.85rem", color: "#475569", maxWidth: 160 }}>
                        <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.propertyTitle}</div>
                      </td>
                      <td style={{ fontSize: "0.82rem", color: "#64748b" }}>
                        {b.checkIn} →<br />{b.checkOut}
                      </td>
                      <td><strong style={{ color: "#1e293b" }}>${b.totalPrice}</strong></td>
                      <td><StatusBadge status={b.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* My Properties Quick View */}
        <div className="col-lg-4">
          <div className="hs-card">
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontWeight: 700, color: "#1e293b", margin: 0, fontSize: "1rem" }}>My Properties</h3>
              <Link href="/host/my-properties">
                <button style={{ background: "none", border: "none", color: "#2563EB", fontSize: "0.83rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                  View All <ArrowRight size={13} />
                </button>
              </Link>
            </div>
            <div>
              {hostProperties.map(p => (
                <div key={p.id} style={{ padding: "12px 18px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={p.image} alt="" style={{ width: 46, height: 46, borderRadius: 8, objectFit: "cover" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.85rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                      <Star size={11} fill="#f59e0b" color="#f59e0b" />
                      <span style={{ fontSize: "0.77rem", color: "#64748b" }}>{p.rating} · ${p.price}/night</span>
                    </div>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              ))}
              <div style={{ padding: "14px 18px" }}>
                <Link href="/host/add-property">
                  <button className="btn-primary-hs" style={{ width: "100%", fontSize: "0.85rem" }}>
                    + Add New Property
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div style={{ marginTop: 16, padding: "16px 18px", background: "#eff6ff", borderRadius: 12, border: "1px solid #bfdbfe" }}>
            <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 6, fontSize: "0.9rem" }}>💡 Host Tips</div>
            <ul style={{ margin: 0, padding: "0 0 0 16px", color: "#475569", fontSize: "0.82rem", lineHeight: 1.9 }}>
              <li>Respond to bookings within 24 hours</li>
              <li>Update your calendar regularly</li>
              <li>Add high-quality photos to boost views</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
