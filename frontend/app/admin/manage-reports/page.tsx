"use client";
// ============================================================
// TARGET: frontend/app/admin/manage-reports/page.tsx
// ============================================================

import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { DollarSign, TrendingUp, CalendarDays, Users, Download, Trophy } from "lucide-react";
import { monthlyRevenue, topHosts, bookings, properties } from "@/lib/mockData";

function formatCurrency(value: number | string | undefined) {
  const amount = Number(value || 0);
  return `$${amount.toLocaleString()}`;
}

function formatCompactCurrency(value: number | string | undefined) {
  const amount = Number(value || 0);
  return `$${(amount / 1000).toFixed(0)}k`;
}

function formatReportTooltip(
  value: number | string | undefined,
  name: string | number | undefined,
) {
  const label = String(name || "");
  return [
    label === "revenue" ? formatCurrency(value) : Number(value || 0),
    label === "revenue" ? "Revenue" : "Bookings",
  ] as const;
}

function formatLegendLabel(value: string | number | undefined) {
  return String(value) === "revenue" ? "Revenue" : "Bookings";
}

const COLORS = ["#2563EB", "#16a34a", "#d97706", "#7c3aed", "#dc2626"];

const propertyTypeData = [
  { name: "Villa", value: 3 },
  { name: "Apartment", value: 2 },
  { name: "Cabin", value: 1 },
  { name: "Cottage", value: 1 },
  { name: "Others", value: 2 },
];

const bookingStatusData = [
  { name: "Confirmed", value: bookings.filter(b => b.status === "Confirmed").length },
  { name: "Pending", value: bookings.filter(b => b.status === "Pending").length },
  { name: "Cancelled", value: bookings.filter(b => b.status === "Cancelled").length },
];

const STATUS_COLORS = ["#16a34a", "#d97706", "#dc2626"];

export default function AdminReportsPage() {
  const totalRevenue = bookings.filter(b => b.status === "Confirmed").reduce((s, b) => s + b.totalPrice, 0);
  const avgBookingValue = Math.round(totalRevenue / bookings.filter(b => b.status === "Confirmed").length);

  return (
    <div style={{ padding: "28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 4, fontSize: "1.5rem" }}>Reports & Analytics</h1>
          <p style={{ color: "#64748b", margin: 0 }}>Platform performance insights</p>
        </div>
        <button className="btn-outline-hs" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.87rem" }}>
          <Download size={15} /> Export Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        {[
          { icon: <DollarSign size={20} color="#2563EB" />, bg: "#eff6ff", label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, change: "+24% vs last month" },
          { icon: <CalendarDays size={20} color="#16a34a" />, bg: "#dcfce7", label: "Total Bookings", value: bookings.length, change: "+12 this month" },
          { icon: <TrendingUp size={20} color="#d97706" />, bg: "#fef3c7", label: "Avg. Booking Value", value: `$${avgBookingValue}`, change: "+$18 vs last month" },
          { icon: <Users size={20} color="#7c3aed" />, bg: "#f3e8ff", label: "Active Hosts", value: 6, change: "+2 new this month" },
        ].map((kpi, i) => (
          <div key={i} className="col-xl-3 col-md-6">
            <div className="hs-stat-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600, marginBottom: 6 }}>{kpi.label}</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e293b" }}>{kpi.value}</div>
                </div>
                <div className="hs-stat-icon" style={{ background: kpi.bg }}>{kpi.icon}</div>
              </div>
              <div style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 600 }}>↑ {kpi.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="hs-card">
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontWeight: 700, color: "#1e293b", margin: 0, fontSize: "1rem" }}>Revenue vs. Bookings</h3>
                <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: 2 }}>Last 7 months comparison</div>
              </div>
            </div>
            <div style={{ padding: "20px" }}>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="bookGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={formatCompactCurrency} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                    formatter={(value, name) => formatReportTooltip(value as number | string | undefined, name as string | number | undefined)} />
                  <Legend formatter={(value) => formatLegendLabel(value as string | number | undefined)} />
                  <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2.5} fill="url(#revGrad2)" />
                  <Area yAxisId="right" type="monotone" dataKey="bookings" stroke="#16a34a" strokeWidth={2} fill="url(#bookGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="hs-card" style={{ marginBottom: 16 }}>
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0" }}>
              <h3 style={{ fontWeight: 700, color: "#1e293b", margin: 0, fontSize: "1rem" }}>Booking Status</h3>
            </div>
            <div style={{ padding: "16px" }}>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={bookingStatusData} cx="50%" cy="50%" innerRadius={48} outerRadius={70}
                    dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false} fontSize={11}>
                    {bookingStatusData.map((_, i) => (
                      <Cell key={i} fill={STATUS_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="hs-card">
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0" }}>
              <h3 style={{ fontWeight: 700, color: "#1e293b", margin: 0, fontSize: "1rem" }}>Property Types</h3>
            </div>
            <div style={{ padding: "16px" }}>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={propertyTypeData} cx="50%" cy="50%" outerRadius={60}
                    dataKey="value">
                    {propertyTypeData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: "0.75rem" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="hs-card">
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0" }}>
              <h3 style={{ fontWeight: 700, color: "#1e293b", margin: 0, fontSize: "1rem" }}>Monthly Bookings Trend</h3>
            </div>
            <div style={{ padding: "20px" }}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
                  <Bar dataKey="bookings" fill="#2563EB" radius={[4, 4, 0, 0]} name="Bookings" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Hosts */}
        <div className="col-lg-6">
          <div className="hs-card">
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 8 }}>
              <Trophy size={16} color="#d97706" />
              <h3 style={{ fontWeight: 700, color: "#1e293b", margin: 0, fontSize: "1rem" }}>Top Performing Hosts</h3>
            </div>
            <div>
              {topHosts.map((host, i) => (
                <div key={i} style={{ padding: "12px 20px", borderBottom: i < topHosts.length - 1 ? "1px solid #f8fafc" : "none", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: i === 0 ? "#fef3c7" : i === 1 ? "#f3f4f6" : "#fef3c7",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: "0.9rem", flexShrink: 0,
                    color: i === 0 ? "#d97706" : i === 1 ? "#64748b" : "#92400e",
                    border: `2px solid ${i === 0 ? "#fbbf24" : i === 1 ? "#d1d5db" : "#d97706"}`
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9rem" }}>{host.name}</div>
                    <div style={{ color: "#94a3b8", fontSize: "0.77rem" }}>
                      {host.properties} properties · {host.bookings} bookings
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, color: "#16a34a", fontSize: "0.95rem" }}>
                      ${host.revenue.toLocaleString()}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue by Month Table */}
      <div className="hs-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0" }}>
          <h3 style={{ fontWeight: 700, color: "#1e293b", margin: 0, fontSize: "1rem" }}>Monthly Revenue Breakdown</h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="hs-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Revenue</th>
                <th>Bookings</th>
                <th>Avg. Per Booking</th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody>
              {monthlyRevenue.map((row, i) => {
                const prevRevenue = i > 0 ? monthlyRevenue[i - 1].revenue : row.revenue;
                const growth = i === 0 ? 0 : Math.round(((row.revenue - prevRevenue) / prevRevenue) * 100);
                const avg = Math.round(row.revenue / row.bookings);
                return (
                  <tr key={row.month}>
                    <td style={{ fontWeight: 700, color: "#1e293b" }}>{row.month} 2025</td>
                    <td style={{ fontWeight: 700, color: "#1e293b" }}>${row.revenue.toLocaleString()}</td>
                    <td>{row.bookings}</td>
                    <td>${avg}</td>
                    <td>
                      {growth === 0 ? (
                        <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>—</span>
                      ) : (
                        <span style={{ color: growth > 0 ? "#16a34a" : "#dc2626", fontWeight: 700, fontSize: "0.85rem" }}>
                          {growth > 0 ? "↑" : "↓"} {Math.abs(growth)}%
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
