"use client";
import { useState } from "react";
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle,
  Twitter, Instagram, Facebook, Linkedin, MessageSquare,
  HeadphonesIcon, BookOpen, Shield
} from "lucide-react";

// Using a stable unsplash placeholder URL
const IMG_CONTACT = "https://images.unsplash.com/photo-1553775282-20af80779df7?auto=format&fit=crop&w=1200&q=80";

const contactInfo = [
  {
    icon: <Mail size={22} color="#2563EB" />,
    bg: "#eff6ff",
    title: "Email Us",
    lines: ["hello@homestay.com", "support@homestay.com"],
  },
  {
    icon: <Phone size={22} color="#059669" />,
    bg: "#ecfdf5",
    title: "Call Us",
    lines: ["+1 (415) 555-0123", "Mon – Fri, 9am – 6pm PST"],
  },
  {
    icon: <MapPin size={22} color="#7c3aed" />,
    bg: "#f5f3ff",
    title: "Visit Us",
    lines: ["123 Stay Avenue, Suite 400", "San Francisco, CA 94107"],
  },
  {
    icon: <Clock size={22} color="#d97706" />,
    bg: "#fef3c7",
    title: "Support Hours",
    lines: ["24/7 Guest Support", "Mon–Fri for Host Inquiries"],
  },
];

const supportChannels = [
  {
    icon: <MessageSquare size={24} color="#2563EB" />,
    bg: "#eff6ff",
    title: "Live Chat",
    desc: "Chat with our support team in real time. Average response time: 2 minutes.",
    action: "Start Chat",
  },
  {
    icon: <HeadphonesIcon size={24} color="#7c3aed" />,
    bg: "#f5f3ff",
    title: "Phone Support",
    desc: "Speak directly with a HomeStay specialist. Available Mon–Fri, 9am–6pm PST.",
    action: "Call Now",
  },
  {
    icon: <BookOpen size={24} color="#059669" />,
    bg: "#ecfdf5",
    title: "Help Center",
    desc: "Browse 200+ articles covering bookings, payments, hosting, and more.",
    action: "Browse Articles",
  },
  {
    icon: <Shield size={24} color="#dc2626" />,
    bg: "#fef2f2",
    title: "Safety & Trust",
    desc: "Report safety concerns or suspicious activity. Our trust team is available 24/7.",
    action: "Report Issue",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", category: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div style={{ background: "#fff" }}>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1d4ed8 100%)",
        padding: "64px 0 56px", textAlign: "center", position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.07,
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
        <div className="container" style={{ position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 100, padding: "5px 16px", marginBottom: 18
          }}>
            <Mail size={13} color="#93c5fd" />
            <span style={{ fontSize: "0.78rem", color: "#93c5fd", fontWeight: 600 }}>Get in Touch</span>
          </div>
          <h1 style={{ color: "#fff", marginBottom: 14, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: -0.8 }}>
            We'd Love to Hear From You
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: 520, margin: "0 auto", fontSize: "1rem", lineHeight: 1.7 }}>
            Whether you have a question, feedback, or just want to say hello — our team is always here to help.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section style={{ padding: "60px 0 20px", background: "#f8fafc" }}>
        <div className="container">
          <div className="row g-4">
            {contactInfo.map((item, i) => (
              <div key={i} className="col-lg-3 col-sm-6">
                <div style={{
                  background: "#fff", borderRadius: 14, padding: "24px 20px",
                  border: "1px solid #e2e8f0", textAlign: "center",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)", transition: "all 0.25s"
                }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    {item.icon}
                  </div>
                  <h5 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>{item.title}</h5>
                  {item.lines.map((line, j) => (
                    <div key={j} style={{ color: "#64748b", fontSize: "0.87rem", lineHeight: 1.7 }}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section style={{ padding: "56px 0 72px", background: "#f8fafc" }}>
        <div className="container">
          <div className="row g-5 align-items-start">
            {/* Form */}
            <div className="col-lg-7">
              <div style={{ background: "#fff", borderRadius: 20, padding: "36px 36px", border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                {submitted ? (
                  <div style={{ textAlign: "center", padding: "40px 20px" }}>
                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                      <CheckCircle size={36} color="#16a34a" />
                    </div>
                    <h3 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 12 }}>Message Sent!</h3>
                    <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 24 }}>
                      Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
                    </p>
                    <button
                      className="btn-outline-hs"
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", category: "", message: "" }); }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 6, fontSize: "1.3rem" }}>Send Us a Message</h3>
                    <p style={{ color: "#64748b", fontSize: "0.87rem", marginBottom: 28 }}>Fill out the form below and we'll respond within 24 hours.</p>

                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        <div className="col-sm-6">
                          <label className="hs-form-label">Full Name *</label>
                          <input
                            type="text" required
                            className="hs-form-control"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                          />
                        </div>
                        <div className="col-sm-6">
                          <label className="hs-form-label">Email Address *</label>
                          <input
                            type="email" required
                            className="hs-form-control"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                          />
                        </div>
                        <div className="col-sm-6">
                          <label className="hs-form-label">Category</label>
                          <select
                            className="hs-form-control"
                            value={form.category}
                            onChange={e => setForm({ ...form, category: e.target.value })}
                          >
                            <option value="">Select a category</option>
                            <option>Booking Support</option>
                            <option>Host Inquiry</option>
                            <option>Payment Issue</option>
                            <option>Safety Concern</option>
                            <option>Technical Problem</option>
                            <option>Partnership</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="col-sm-6">
                          <label className="hs-form-label">Subject *</label>
                          <input
                            type="text" required
                            className="hs-form-control"
                            placeholder="Brief subject line"
                            value={form.subject}
                            onChange={e => setForm({ ...form, subject: e.target.value })}
                          />
                        </div>
                        <div className="col-12">
                          <label className="hs-form-label">Message *</label>
                          <textarea
                            required
                            className="hs-form-control"
                            rows={5}
                            placeholder="Tell us how we can help you..."
                            value={form.message}
                            onChange={e => setForm({ ...form, message: e.target.value })}
                            style={{ resize: "vertical" }}
                          />
                        </div>
                        <div className="col-12" style={{ paddingTop: 6 }}>
                          <button
                            type="submit"
                            className="btn-primary-hs"
                            style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.95rem", padding: "12px 28px" }}
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <svg style={{ animation: "spin 1s linear infinite", width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                                </svg>
                                Sending...
                              </>
                            ) : (
                              <><Send size={16} /> Send Message</>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Right Side */}
            <div className="col-lg-5">
              {/* Map Placeholder */}
              <div style={{
                borderRadius: 16, overflow: "hidden", marginBottom: 24,
                border: "1px solid #e2e8f0", position: "relative", height: 240
              }}>
                <img src={IMG_CONTACT} alt="Office" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg, rgba(15,23,42,0.7) 0%, rgba(37,99,235,0.5) 100%)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)", display: "flex",
                    alignItems: "center", justifyContent: "center", marginBottom: 10
                  }}>
                    <MapPin size={22} color="#fff" />
                  </div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>San Francisco, CA</div>
                  <div style={{ color: "#93c5fd", fontSize: "0.82rem", marginTop: 4 }}>123 Stay Avenue, Suite 400</div>
                </div>
              </div>

              {/* Social Media */}
              <div style={{ background: "#fff", borderRadius: 16, padding: "22px", border: "1px solid #e2e8f0" }}>
                <h5 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 16, fontSize: "0.97rem" }}>Follow Us</h5>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[
                    { icon: <Twitter size={18} />, label: "Twitter", color: "#1DA1F2", bg: "#e7f5fe" },
                    { icon: <Instagram size={18} />, label: "Instagram", color: "#E1306C", bg: "#fce4ec" },
                    { icon: <Facebook size={18} />, label: "Facebook", color: "#1877F2", bg: "#e7f0fd" },
                    { icon: <Linkedin size={18} />, label: "LinkedIn", color: "#0A66C2", bg: "#e3f0fa" },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href="#"
                      style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "7px 14px", borderRadius: 8,
                        background: social.bg, color: social.color,
                        textDecoration: "none", fontSize: "0.82rem",
                        fontWeight: 600, transition: "opacity 0.15s"
                      }}
                    >
                      {social.icon} {social.label}
                    </a>
                  ))}
                </div>
                <p style={{ color: "#94a3b8", fontSize: "0.78rem", marginTop: 14, marginBottom: 0, lineHeight: 1.6 }}>
                  Stay updated with the latest homestay deals, travel tips, and platform updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section style={{ padding: "60px 0 72px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 className="hs-section-title" style={{ marginBottom: 10 }}>Other Ways to Reach Us</h2>
            <p className="hs-section-subtitle">Choose the support channel that works best for you.</p>
          </div>
          <div className="row g-4">
            {supportChannels.map((ch, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div style={{
                  background: "#fff", borderRadius: 16, padding: "28px 24px",
                  border: "1px solid #e2e8f0", height: "100%", display: "flex", flexDirection: "column",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)", transition: "all 0.25s"
                }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: ch.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    {ch.icon}
                  </div>
                  <h5 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 8, fontSize: "0.97rem" }}>{ch.title}</h5>
                  <p style={{ color: "#64748b", fontSize: "0.85rem", lineHeight: 1.7, flex: 1, margin: 0 }}>{ch.desc}</p>
                  <button
                    className="btn-outline-hs"
                    style={{ marginTop: 18, fontSize: "0.82rem", padding: "7px 16px" }}
                  >
                    {ch.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
