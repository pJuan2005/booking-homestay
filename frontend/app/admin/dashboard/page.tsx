"use client";
// ============================================================
// TARGET: frontend/app/admin/dashboard/page.tsx
// ============================================================

import Link from "next/link";
import { Users, Building2, CalendarDays, DollarSign, ArrowRight, TrendingUp, CheckCircle, Clock } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";
import { users, properties, bookings, monthlyRevenue } from "@/lib/mockData";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function AdminDashboardPage() {
  const totalRevenue = bookings.filter(b => b.status === "Confirmed").reduce((s, b) => s + b.totalPrice, 0);

  const stats = [
    { icon: <Users size={22} color="#2563EB" />, bg: "#eff6ff", label: "Total Users", value: users.length, sub: `${users.filter(u => u.role === "Guest").length} guests`, link: "/admin/user" },
    { icon: <Building2 size={22} color="#7c3aed" />, bg: "#f3e8ff", label: "Total Hosts", value: users.filter(u => u.role === "Host").length, sub: `${properties.filter(p => p.status === "Pending").length} pending approval`, link: "/admin/property-approvals" },
    { icon: <Building2 size={22} color="#16a34a" />, bg: "#dcfce7", label: "Properties", value: properties.length, sub: `${properties.filter(p => p.status === "Approved").length} approved`, link: "/admin/properties-manage" },
    { icon: <DollarSign size={22} color="#d97706" />, bg: "#fef3c7", label: "Revenue", value: `$${totalRevenue.toLocaleString()}`, sub: "From confirmed bookings", link: "/admin/manage-reports" },
  ];

  const recentBookings = bookings.slice(0, 6);

  return (
    <div style={{ padding: "28px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 4, fontSize: "1.5rem" }}>Admin Dashboard</h1>
        <p style={{ color: "#64748b", margin: 0 }}>Platform overview and key metrics</p>
      </div>

      {/* Stat Cards */}
      <div className="row g-3 mb-4">
        {stats.map((stat, i) => (
          <div key={i} className="col-xl-3 col-md-6">
            <Link href={stat.link} style={{ textDecoration: "none" }}>
              <div className="hs-stat-card" style={{ cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600, marginBottom: 6 }}>{stat.label}</div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1e293b" }}>{stat.value}</div>
                  </div>
                  <div className="hs-stat-icon" style={{ background: stat.bg }}>{stat.icon}</div>
                </div>
                <div style={{ fontSize: "0.77rem", color: "#64748b" }}>{stat.sub}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="row g-4 mb-4">
        {/* Revenue Chart */}
        <div className="col-lg-8">
          <div className="hs-card">
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontWeight: 700, color: "#1e293b", margin: 0, fontSize: "1rem" }}>Revenue Trend</h3>
                <div style={{ color: "#64748b", fontSize: "0.78rem", marginTop: 2 }}>Monthly revenue overview</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#dcfce7", borderRadius: 20, padding: "4px 10px" }}>
                <TrendingUp size={12} color="#16a34a" />
                <span style={{ fontSize: "0.78rem", color: "#16a34a", fontWeight: 700 }}>+24% this month</span>
              </div>
            </div>
            <div style={{ padding: "20px" }}>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
                  <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2.5} fill="url(#revGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="col-lg-4">
          <div className="hs-card" style={{ height: "100%" }}>
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0" }}>
              <h3 style={{ fontWeight: 700, color: "#1e293b", margin: 0, fontSize: "1rem" }}>Platform Summary</h3>
            </div>
            <div style={{ padding: "20px" }}>
              {[
                { label: "Total Bookings", value: bookings.length, icon: <CalendarDays size={16} color="#2563EB" /> },
                { label: "Confirmed", value: bookings.filter(b => b.status === "Confirmed").length, icon: <CheckCircle size={16} color="#16a34a" /> },
                { label: "Pending", value: bookings.filter(b => b.status === "Pending").length, icon: <Clock size={16} color="#d97706" /> },
                { label: "Active Users", value: users.filter(u => u.status === "Active").length, icon: <Users size={16} color="#7c3aed" /> },
                { label: "Pending Approvals", value: properties.filter(p => p.status === "Pending").length, icon: <Building2 size={16} color="#dc2626" /> },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 4 ? "1px solid #f8fafc" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.87rem", color: "#475569" }}>
                    {item.icon} {item.label}
                  </div>
                  <span style={{ fontWeight: 800, color: "#1e293b" }}>{item.value}</span>
                </div>
              ))}

              <Link href="/admin/property-approvals">
                <button className="btn-primary-hs" style={{ width: "100%", marginTop: 16, fontSize: "0.85rem" }}>
                  Review Pending Approvals
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Chart */}
      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="hs-card">
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0" }}>
              <h3 style={{ fontWeight: 700, color: "#1e293b", margin: 0, fontSize: "1rem" }}>Monthly Bookings</h3>
            </div>
            <div style={{ padding: "20px" }}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
                  <Bar dataKey="bookings" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="col-lg-6">
          <div className="hs-card">
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontWeight: 700, color: "#1e293b", margin: 0, fontSize: "1rem" }}>Recent Bookings</h3>
              <Link href="/admin/manage-booking">
                <button style={{ background: "none", border: "none", color: "#2563EB", fontSize: "0.83rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                  View All <ArrowRight size={13} />
                </button>
              </Link>
            </div>
            <div style={{ overflow: "hidden" }}>
              {recentBookings.map(b => (
                <div key={b.id} style={{ padding: "10px 18px", borderBottom: "1px solid #f8fafc", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#2563EB", fontSize: "0.8rem" }}>
                      {b.guestName.split(" ").map(w => w[0]).join("")}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.87rem" }}>{b.guestName}</div>
                      <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{b.checkIn} → {b.checkOut}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9rem" }}>${b.totalPrice}</div>
                    <StatusBadge status={b.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
