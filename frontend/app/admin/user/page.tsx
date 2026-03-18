"use client";
// ============================================================
// TARGET: frontend/app/admin/user/page.tsx
// ============================================================

import { useState } from "react";
import { Search, Filter, UserX, UserCheck, Users } from "lucide-react";
import { users as initialUsers } from "@/lib/mockData";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { User } from "@/lib/mockData";

export default function ManageUsersPage() {
  const [userList, setUserList] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = userList.filter(u => {
    const matchSearch = !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    const matchStatus = statusFilter === "All" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const toggleStatus = (id: number) => {
    setUserList(prev => prev.map(u =>
      u.id === id ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" as any } : u
    ));
  };

  const roleCounts = {
    All: userList.length,
    Guest: userList.filter(u => u.role === "Guest").length,
    Host: userList.filter(u => u.role === "Host").length,
    Admin: userList.filter(u => u.role === "Admin").length,
  };

  return (
    <div style={{ padding: "28px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 4, fontSize: "1.5rem" }}>Manage Users</h1>
        <p style={{ color: "#64748b", margin: 0 }}>{userList.length} registered users on the platform</p>
      </div>

      {/* Summary */}
      <div className="row g-3 mb-4">
        {Object.entries(roleCounts).map(([role, count]) => (
          <div key={role} className="col-6 col-md-3">
            <div className="hs-stat-card" style={{ padding: "14px 18px" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e293b" }}>{count}</div>
              <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>
                {role === "All" ? "Total Users" : `${role}s`}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input className="hs-form-control" placeholder="Search by name or email..."
            style={{ paddingLeft: 36 }} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <Filter size={14} color="#64748b" />
          <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Role:</span>
          {["All", "Guest", "Host", "Admin"].map(r => (
            <button key={r} onClick={() => setRoleFilter(r)} style={{
              padding: "6px 12px", borderRadius: 20, fontSize: "0.8rem",
              border: `1.5px solid ${roleFilter === r ? "#2563EB" : "#e2e8f0"}`,
              background: roleFilter === r ? "#eff6ff" : "#fff",
              color: roleFilter === r ? "#2563EB" : "#64748b",
              fontWeight: roleFilter === r ? 700 : 500, cursor: "pointer"
            }}>{r}</button>
          ))}
          <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600, marginLeft: 4 }}>Status:</span>
          {["All", "Active", "Blocked"].map(s => (
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
        <div style={{ padding: "14px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.87rem", color: "#64748b" }}>
            <Users size={15} /> Showing {filtered.length} of {userList.length} users
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="hs-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Activity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "48px", color: "#94a3b8" }}>
                    No users found
                  </td>
                </tr>
              ) : filtered.map(user => (
                <tr key={user.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: "50%",
                        background: user.role === "Admin" ? "linear-gradient(135deg, #7c3aed, #2563EB)"
                          : user.role === "Host" ? "linear-gradient(135deg, #2563EB, #0ea5e9)"
                          : "linear-gradient(135deg, #16a34a, #0891b2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontWeight: 700, fontSize: "0.82rem", flexShrink: 0
                      }}>
                        {user.name.split(" ").map(w => w[0]).join("")}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9rem" }}>{user.name}</div>
                        <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>ID #{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: "0.87rem", color: "#475569" }}>{user.email}</td>
                  <td><StatusBadge status={user.role} /></td>
                  <td style={{ fontSize: "0.83rem", color: "#64748b" }}>{user.joined}</td>
                  <td style={{ fontSize: "0.83rem", color: "#64748b" }}>
                    {user.role === "Host" && <span>{user.properties ?? 0} props · {user.bookings ?? 0} bookings</span>}
                    {user.role === "Guest" && <span>{user.bookings ?? 0} bookings</span>}
                    {user.role === "Admin" && <span>Full access</span>}
                  </td>
                  <td><StatusBadge status={user.status} /></td>
                  <td>
                    <button
                      onClick={() => toggleStatus(user.id)}
                      disabled={user.role === "Admin"}
                      style={{
                        display: "flex", alignItems: "center", gap: 5, padding: "6px 12px",
                        borderRadius: 7, border: "none",
                        background: user.status === "Active" ? "#fee2e2" : "#dcfce7",
                        color: user.status === "Active" ? "#dc2626" : "#16a34a",
                        fontSize: "0.8rem", fontWeight: 700, cursor: user.role === "Admin" ? "not-allowed" : "pointer",
                        opacity: user.role === "Admin" ? 0.4 : 1
                      }}
                    >
                      {user.status === "Active"
                        ? <><UserX size={13} /> Block</>
                        : <><UserCheck size={13} /> Unblock</>}
                    </button>
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
