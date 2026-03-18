"use client";
// ============================================================
// TARGET: frontend/app/host/profile/page.tsx
// ============================================================

import { useState } from "react";
import { User, Mail, Phone, MapPin, Globe, Save, Camera } from "lucide-react";
import { useAuth, getUserInitials } from "@/components/context/AuthContext";

export default function HostProfilePage() {
  const { user } = useAuth();
  const displayName = user?.name || "Made Wijaya";
  const displayEmail = user?.email || "made@example.com";
  const initials = getUserInitials(displayName);

  const [form, setForm] = useState({
    name: displayName,
    email: displayEmail,
    phone: "+62 812 345 6789",
    location: "Seminyak, Bali, Indonesia",
    website: "www.madewillaybali.com",
    bio: "Passionate host sharing the beauty of Bali with travelers from around the world. I've been hosting for 3 years and love making guests feel at home.",
    language: "English, Bahasa Indonesia",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ padding: "28px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 4, fontSize: "1.5rem" }}>My Profile</h1>
        <p style={{ color: "#64748b", margin: 0 }}>Manage your host profile information</p>
      </div>

      <div className="row g-4">
        {/* Avatar */}
        <div className="col-lg-3">
          <div className="hs-card" style={{ padding: "28px 20px", textAlign: "center" }}>
            <div style={{ position: "relative", display: "inline-block", marginBottom: 16 }}>
              <div style={{
                width: 100, height: 100, borderRadius: "50%",
                background: "linear-gradient(135deg, #2563EB, #7c3aed)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "2rem", fontWeight: 800, color: "#fff"
              }}>
                {initials}
              </div>
              <button style={{
                position: "absolute", bottom: 0, right: 0, width: 30, height: 30,
                borderRadius: "50%", background: "#2563EB", border: "2px solid #fff",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
              }}>
                <Camera size={13} color="#fff" />
              </button>
            </div>
            <h3 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 4, fontSize: "1rem" }}>{form.name}</h3>
            <p style={{ color: "#64748b", fontSize: "0.83rem", marginBottom: 14 }}>Superhost · Since 2022</p>
            <span className="hs-badge hs-badge-host">Host</span>

            <div style={{ marginTop: 20, borderTop: "1px solid #e2e8f0", paddingTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: "0.83rem" }}>
                <span style={{ color: "#64748b" }}>Properties</span>
                <strong style={{ color: "#1e293b" }}>3</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: "0.83rem" }}>
                <span style={{ color: "#64748b" }}>Bookings</span>
                <strong style={{ color: "#1e293b" }}>47</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: "0.83rem" }}>
                <span style={{ color: "#64748b" }}>Avg. Rating</span>
                <strong style={{ color: "#f59e0b" }}>4.9 ⭐</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="col-lg-9">
          <div className="hs-card" style={{ padding: "28px" }}>
            {saved && (
              <div style={{ background: "#dcfce7", borderRadius: 8, padding: "12px 16px", marginBottom: 20, color: "#16a34a", fontWeight: 600, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 8 }}>
                ✓ Profile updated successfully!
              </div>
            )}
            <form onSubmit={handleSave}>
              <h3 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 20, fontSize: "1rem" }}>Personal Information</h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="hs-form-label">
                    <User size={13} style={{ marginRight: 5, verticalAlign: "middle", color: "#2563EB" }} />
                    Full Name
                  </label>
                  <input className="hs-form-control" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="hs-form-label">
                    <Mail size={13} style={{ marginRight: 5, verticalAlign: "middle", color: "#2563EB" }} />
                    Email Address
                  </label>
                  <input className="hs-form-control" type="email" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="hs-form-label">
                    <Phone size={13} style={{ marginRight: 5, verticalAlign: "middle", color: "#2563EB" }} />
                    Phone Number
                  </label>
                  <input className="hs-form-control" value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="hs-form-label">
                    <MapPin size={13} style={{ marginRight: 5, verticalAlign: "middle", color: "#2563EB" }} />
                    Location
                  </label>
                  <input className="hs-form-control" value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="hs-form-label">
                    <Globe size={13} style={{ marginRight: 5, verticalAlign: "middle", color: "#2563EB" }} />
                    Website
                  </label>
                  <input className="hs-form-control" value={form.website}
                    onChange={e => setForm({ ...form, website: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="hs-form-label">Languages Spoken</label>
                  <input className="hs-form-control" value={form.language}
                    onChange={e => setForm({ ...form, language: e.target.value })} />
                </div>
                <div className="col-12">
                  <label className="hs-form-label">Bio / About Me</label>
                  <textarea className="hs-form-control" rows={4} value={form.bio}
                    onChange={e => setForm({ ...form, bio: e.target.value })}
                    style={{ resize: "vertical" }} />
                  <div style={{ textAlign: "right", fontSize: "0.75rem", color: "#94a3b8", marginTop: 4 }}>
                    {form.bio.length} characters
                  </div>
                </div>

                <div className="col-12" style={{ paddingTop: 4 }}>
                  <button type="submit" className="btn-primary-hs" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Save size={15} /> Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Change Password */}
          <div className="hs-card" style={{ padding: "28px", marginTop: 16 }}>
            <h3 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 20, fontSize: "1rem" }}>Change Password</h3>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="hs-form-label">Current Password</label>
                <input className="hs-form-control" type="password" placeholder="••••••••" />
              </div>
              <div className="col-md-4">
                <label className="hs-form-label">New Password</label>
                <input className="hs-form-control" type="password" placeholder="••••••••" />
              </div>
              <div className="col-md-4">
                <label className="hs-form-label">Confirm New Password</label>
                <input className="hs-form-control" type="password" placeholder="••••••••" />
              </div>
              <div className="col-12">
                <button className="btn-outline-hs" style={{ fontSize: "0.87rem" }}>Update Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
