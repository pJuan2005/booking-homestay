"use client";
// ============================================================
// TARGET: frontend/app/auth/register/page.tsx
// ============================================================

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, User, Home, ArrowRight, CheckCircle, Building2 } from "lucide-react";
// Assuming AuthProvider is available or mocked in Next.js structure
// import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  // const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "Guest" as "Guest" | "Host" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.includes("@")) e.email = "Valid email is required";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      // Demo logic
      localStorage.setItem("hs_role", form.role);
      localStorage.setItem("hs_user", JSON.stringify({
        name: form.name,
        email: form.email,
        role: form.role,
      }));
      router.push(form.role === "Host" ? "/host/dashboard" : "/user");
    }, 1000);
  };

  return (
    <div className="hs-auth-page">
      <div style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Home size={20} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: "1.5rem", color: "#1e293b", letterSpacing: -0.5 }}>HomeStay</span>
          </Link>
        </div>

        <div className="hs-auth-card">
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h1 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 6, fontSize: "1.6rem" }}>Create your account</h1>
            <p style={{ color: "#64748b", margin: 0, fontSize: "0.9rem" }}>Join thousands of travelers and hosts worldwide</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div style={{ marginBottom: 22 }}>
              <label className="hs-form-label">I want to join as a...</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { value: "Guest" as const, icon: <User size={22} />, title: "Guest", desc: "Browse & book stays" },
                  { value: "Host" as const, icon: <Building2 size={22} />, title: "Host", desc: "List my property" },
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm({ ...form, role: opt.value })}
                    style={{
                      padding: "16px 12px", borderRadius: 12,
                      border: `2px solid ${form.role === opt.value ? "#2563EB" : "#e2e8f0"}`,
                      background: form.role === opt.value ? "#eff6ff" : "#fff",
                      cursor: "pointer", textAlign: "center", transition: "all 0.15s",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                      position: "relative"
                    }}
                  >
                    <div style={{ color: form.role === opt.value ? "#2563EB" : "#94a3b8" }}>{opt.icon}</div>
                    <div style={{ fontWeight: 700, color: form.role === opt.value ? "#2563EB" : "#1e293b", fontSize: "0.9rem" }}>{opt.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{opt.desc}</div>
                    {form.role === opt.value && (
                      <div style={{ position: "absolute", top: 8, right: 8 }}>
                        <CheckCircle size={16} color="#2563EB" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Full Name */}
            <div style={{ marginBottom: 16 }}>
              <label className="hs-form-label">Full Name</label>
              <div style={{ position: "relative" }}>
                <User size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type="text" required
                  className="hs-form-control"
                  style={{ paddingLeft: 38, borderColor: errors.name ? "#dc2626" : undefined }}
                  placeholder="John Doe"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              {errors.name && <div style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4 }}>{errors.name}</div>}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="hs-form-label">Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type="email" required
                  className="hs-form-control"
                  style={{ paddingLeft: 38, borderColor: errors.email ? "#dc2626" : undefined }}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
              {errors.email && <div style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4 }}>{errors.email}</div>}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="hs-form-label">Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type={showPassword ? "text" : "password"} required
                  className="hs-form-control"
                  style={{ paddingLeft: 38, paddingRight: 42, borderColor: errors.password ? "#dc2626" : undefined }}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <div style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4 }}>{errors.password}</div>}
            </div>

            <div style={{ marginBottom: 22 }}>
              <label className="hs-form-label">Confirm Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type="password" required
                  className="hs-form-control"
                  style={{ paddingLeft: 38, borderColor: errors.confirmPassword ? "#dc2626" : undefined }}
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                />
              </div>
              {errors.confirmPassword && <div style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4 }}>{errors.confirmPassword}</div>}
            </div>

            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: 0 }}>
                By registering, you agree to our{" "}
                <a href="#" style={{ color: "#2563EB", fontWeight: 600 }}>Terms of Service</a> and{" "}
                <a href="#" style={{ color: "#2563EB", fontWeight: 600 }}>Privacy Policy</a>.
              </p>
            </div>

            <button
              type="submit"
              className="btn-primary-hs"
              style={{ width: "100%", fontSize: "0.95rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              disabled={loading}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg style={{ animation: "spin 1s linear infinite", width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: 20, paddingTop: 18, borderTop: "1px solid #e2e8f0" }}>
            <p style={{ color: "#64748b", margin: 0, fontSize: "0.88rem" }}>
              Already have an account?{" "}
              <Link href="/auth/login" style={{ color: "#2563EB", fontWeight: 700, textDecoration: "none" }}>Sign in</Link>
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link href="/" style={{ color: "#64748b", fontSize: "0.83rem", textDecoration: "none" }}>
            ← Back to HomeStay
          </Link>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
