"use client";
// ============================================================
// TARGET: frontend/app/auth/login/page.tsx
// ============================================================

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail, Lock, Eye, EyeOff, Home, ArrowRight,
  LogIn, AlertCircle, User, Building2, Shield,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Demo quick-login: in production, call your API or NextAuth
  const handleDemoLogin = (role: "Guest" | "Host" | "Admin") => {
    setLoading(true);
    setTimeout(() => {
      // Store role in localStorage (replace with real session/cookie in production)
      localStorage.setItem("hs_role", role);
      localStorage.setItem("hs_user", JSON.stringify({
        name: role === "Guest" ? "Alice Johnson" : role === "Host" ? "Made Wijaya" : "Admin User",
        email: role === "Guest" ? "alice@example.com" : role === "Host" ? "made@example.com" : "admin@homestay.com",
        role,
      }));
      if (role === "Admin") router.push("/admin/dashboard");
      else if (role === "Host") router.push("/host/dashboard");
      else router.push("/user");
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // TODO: replace with real API call / NextAuth signIn()
    setTimeout(() => {
      setLoading(false);
      setError("Invalid email or password. Use Quick Demo Access above.");
    }, 900);
  };

  const demoAccounts = [
    { role: "Guest" as const, icon: <User size={15} />, label: "Guest", color: "#0c4a6e", bg: "#e0f2fe" },
    { role: "Host"  as const, icon: <Building2 size={15} />, label: "Host", color: "#6b21a8", bg: "#f3e8ff" },
    { role: "Admin" as const, icon: <Shield size={15} />, label: "Admin", color: "#9d174d", bg: "#fce7f3" },
  ];

  return (
    <div className="hs-auth-page">
      <div style={{ width: "100%", maxWidth: 480, margin: "0 auto" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg, #2563EB, #1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Home size={20} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: "1.5rem", color: "#1e293b", letterSpacing: -0.5 }}>HomeStay</span>
          </Link>
        </div>

        <div className="hs-auth-card">
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h1 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 6, fontSize: "1.6rem" }}>Welcome back</h1>
            <p style={{ color: "#64748b", margin: 0, fontSize: "0.9rem" }}>Sign in to access your account</p>
          </div>

          {/* Demo Quick Access */}
          <div style={{ background: "#f8fafc", borderRadius: 10, padding: "14px 16px", marginBottom: 24, border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10 }}>
              Quick Demo Access
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {demoAccounts.map((acc) => (
                <button
                  key={acc.role}
                  onClick={() => handleDemoLogin(acc.role)}
                  disabled={loading}
                  style={{
                    padding: "7px 14px", borderRadius: 8,
                    border: `1.5px solid ${acc.bg}`,
                    background: acc.bg, color: acc.color,
                    fontSize: "0.8rem", fontWeight: 700, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 5,
                  }}
                >
                  {acc.icon} {acc.label}
                </button>
              ))}
            </div>
            <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: 8 }}>
              Click to instantly log in as that role for demo purposes
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", marginBottom: 18, display: "flex", alignItems: "center", gap: 8, color: "#dc2626", fontSize: "0.87rem" }}>
              <AlertCircle size={15} style={{ flexShrink: 0 }} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label className="hs-form-label">Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type="email" required className="hs-form-control"
                  style={{ paddingLeft: 38 }} placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => { setForm({ ...form, email: e.target.value }); setError(""); }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <label className="hs-form-label" style={{ marginBottom: 0 }}>Password</label>
                <a href="#" style={{ fontSize: "0.82rem", color: "#2563EB", fontWeight: 600, textDecoration: "none" }}>Forgot password?</a>
              </div>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type={showPassword ? "text" : "password"} required className="hs-form-control"
                  style={{ paddingLeft: 38, paddingRight: 42 }} placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
              <input type="checkbox" id="remember" style={{ accentColor: "#2563EB", width: 16, height: 16 }}
                checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} />
              <label htmlFor="remember" style={{ fontSize: "0.87rem", color: "#475569", cursor: "pointer", margin: 0 }}>
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit" className="btn-primary-hs" disabled={loading}
              style={{ width: "100%", fontSize: "0.95rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg style={{ animation: "spin 1s linear infinite", width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <><LogIn size={16} /> Sign In</>
              )}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: 22, paddingTop: 20, borderTop: "1px solid #e2e8f0" }}>
            <p style={{ color: "#64748b", margin: 0, fontSize: "0.88rem" }}>
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" style={{ color: "#2563EB", fontWeight: 700, textDecoration: "none" }}>
                Create one <ArrowRight size={13} style={{ verticalAlign: "middle" }} />
              </Link>
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link href="/" style={{ color: "#64748b", fontSize: "0.83rem", textDecoration: "none" }}>
            ← Back to HomeStay
          </Link>
        </div>
      </div>
    </div>
  );
}
