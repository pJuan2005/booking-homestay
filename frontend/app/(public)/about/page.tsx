// ============================================================
// TARGET: frontend/app/(public)/about/page.tsx
// ============================================================

import Link from "next/link";
import {
  Globe, Users, Home, Star, Shield, TrendingUp,
  Heart, CheckCircle, Award, Zap, ArrowRight, Building2
} from "lucide-react";

// Using valid placeholder images from unsplash source URL that are stable
const IMG_TEAM = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80";
const IMG_MISSION = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80";

const stats = [
  { icon: <Home size={22} color="#2563EB" />, value: "12,400+", label: "Properties Listed", bg: "#eff6ff" },
  { icon: <Users size={22} color="#7c3aed" />, value: "85,000+", label: "Happy Guests", bg: "#f5f3ff" },
  { icon: <Globe size={22} color="#059669" />, value: "64", label: "Countries", bg: "#ecfdf5" },
  { icon: <Star size={22} color="#d97706" />, value: "4.9/5", label: "Average Rating", bg: "#fef3c7" },
];

const values = [
  {
    icon: <Heart size={24} color="#dc2626" />,
    bg: "#fef2f2",
    title: "Guest-First Always",
    desc: "Every feature, every policy, every decision starts with: what's best for the traveler? We obsess over the guest experience."
  },
  {
    icon: <Shield size={24} color="#2563EB" />,
    bg: "#eff6ff",
    title: "Trust & Safety",
    desc: "Verified hosts, secure payments, and 24/7 support ensure that every booking is as safe as it is enjoyable."
  },
  {
    icon: <TrendingUp size={24} color="#059669" />,
    bg: "#ecfdf5",
    title: "Host Empowerment",
    desc: "We give hosts the tools, analytics, and support to turn their properties into thriving hospitality businesses."
  },
  {
    icon: <Zap size={24} color="#d97706" />,
    bg: "#fef3c7",
    title: "Seamless Technology",
    desc: "Our platform is built to be effortless. From search to checkout, every step is designed to be fast and intuitive."
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Search & Discover",
    desc: "Browse thousands of verified homestays worldwide with powerful filters for location, price, amenities, and more.",
    icon: <Globe size={28} color="#2563EB" />
  },
  {
    step: "02",
    title: "Book Instantly",
    desc: "Choose your dates, confirm your stay, and pay securely. Instant confirmation with no hidden fees.",
    icon: <CheckCircle size={28} color="#059669" />
  },
  {
    step: "03",
    title: "Experience & Review",
    desc: "Check in, enjoy your stay, and share your experience to help the community grow.",
    icon: <Star size={28} color="#d97706" />
  },
  {
    step: "04",
    title: "Host Your Space",
    desc: "List your property, set your own price, and earn money by welcoming guests from around the world.",
    icon: <Building2 size={28} color="#7c3aed" />
  },
];

const team = [
  { name: "James Mitchell", role: "CEO & Co-Founder", initials: "JM", gradient: "linear-gradient(135deg, #2563EB, #7c3aed)" },
  { name: "Sarah Chen", role: "CTO & Co-Founder", initials: "SC", gradient: "linear-gradient(135deg, #059669, #0891b2)" },
  { name: "Priya Sharma", role: "Head of Product", initials: "PS", gradient: "linear-gradient(135deg, #d97706, #dc2626)" },
  { name: "Erik Larsen", role: "Head of Growth", initials: "EL", gradient: "linear-gradient(135deg, #7c3aed, #db2777)" },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#fff" }}>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1d4ed8 100%)",
        padding: "80px 0 72px", textAlign: "center", position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.08,
          backgroundImage: "radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }} />
        <div className="container" style={{ position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 100, padding: "6px 16px", marginBottom: 20
          }}>
            <Award size={14} color="#93c5fd" />
            <span style={{ fontSize: "0.8rem", color: "#93c5fd", fontWeight: 600 }}>About HomeStay Platform</span>
          </div>
          <h1 style={{ color: "#fff", marginBottom: 18, fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: -1, maxWidth: 700, margin: "0 auto 18px" }}>
            Redefining the Way the World{" "}
            <span style={{ background: "linear-gradient(90deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Stays
            </span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.05rem", maxWidth: 580, margin: "0 auto 36px", lineHeight: 1.75 }}>
            HomeStay is a global marketplace connecting travelers with unique, authentic accommodations — and giving hosts the tools to build world-class hospitality businesses.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/listings">
              <button className="btn-primary-hs" style={{ fontSize: "0.95rem", padding: "12px 28px", display: "flex", alignItems: "center", gap: 8 }}>
                Explore Properties <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/auth/register">
              <button style={{
                background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.3)",
                color: "#fff", borderRadius: 8, padding: "12px 28px", fontSize: "0.95rem",
                cursor: "pointer", fontWeight: 500, transition: "all 0.2s"
              }}>
                Become a Host
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "60px 0", background: "#f8fafc" }}>
        <div className="container">
          <div className="row g-4">
            {stats.map((stat, i) => (
              <div key={i} className="col-lg-3 col-sm-6">
                <div style={{
                  background: "#fff", borderRadius: 16, padding: "28px 24px",
                  border: "1px solid #e2e8f0", textAlign: "center",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)", transition: "all 0.25s"
                }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, background: stat.bg,
                    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px"
                  }}>
                    {stat.icon}
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: "#1e293b", letterSpacing: -1 }}>{stat.value}</div>
                  <div style={{ color: "#64748b", fontSize: "0.87rem", marginTop: 4 }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: "72px 0" }}>
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div style={{ position: "relative" }}>
                <img
                  src={IMG_MISSION}
                  alt="Our mission"
                  style={{ width: "100%", borderRadius: 20, objectFit: "cover", height: 420 }}
                />
                <div style={{
                  position: "absolute", bottom: 24, left: 24, right: 24,
                  background: "rgba(15,23,42,0.85)", backdropFilter: "blur(8px)",
                  borderRadius: 12, padding: "16px 20px",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}>
                  <div style={{ color: "#fff", fontWeight: 700, marginBottom: 4 }}>Founded in 2021</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Started with 50 listings — now reaching 64 countries</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{ display: "inline-block", background: "#eff6ff", borderRadius: 8, padding: "4px 14px", marginBottom: 16 }}>
                <span style={{ color: "#2563EB", fontSize: "0.8rem", fontWeight: 700 }}>OUR MISSION</span>
              </div>
              <h2 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 18, letterSpacing: -0.5, fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
                Making Authentic Travel Accessible to Everyone
              </h2>
              <p style={{ color: "#64748b", lineHeight: 1.8, marginBottom: 20, fontSize: "0.97rem" }}>
                We believe that the best travel experiences happen when you stay like a local. HomeStay was founded to bridge the gap between travelers seeking genuine cultural immersion and homeowners wanting to share their spaces with the world.
              </p>
              <p style={{ color: "#64748b", lineHeight: 1.8, marginBottom: 28, fontSize: "0.97rem" }}>
                Our platform combines the warmth of a personal recommendation with the trust of a verified marketplace — ensuring every stay is safe, comfortable, and memorable.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Verified host profiles and property listings",
                  "Secure end-to-end encrypted payments",
                  "24/7 guest and host support team",
                  "Transparent reviews and rating system",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <CheckCircle size={13} color="#16a34a" />
                    </div>
                    <span style={{ color: "#475569", fontSize: "0.9rem" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section style={{ padding: "72px 0", background: "#f8fafc" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-block", background: "#eff6ff", borderRadius: 8, padding: "4px 14px", marginBottom: 14 }}>
              <span style={{ color: "#2563EB", fontSize: "0.8rem", fontWeight: 700 }}>OUR VALUES</span>
            </div>
            <h2 className="hs-section-title" style={{ marginBottom: 12 }}>What We Stand For</h2>
            <p className="hs-section-subtitle" style={{ maxWidth: 520, margin: "0 auto" }}>
              Our core values guide every product decision, every hire, and every partnership we make.
            </p>
          </div>
          <div className="row g-4">
            {values.map((v, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div style={{
                  background: "#fff", borderRadius: 16, padding: "28px 24px",
                  border: "1px solid #e2e8f0", height: "100%",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "all 0.25s"
                }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: v.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    {v.icon}
                  </div>
                  <h4 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 10, fontSize: "1rem" }}>{v.title}</h4>
                  <p style={{ color: "#64748b", fontSize: "0.88rem", lineHeight: 1.75, margin: 0 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "72px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-block", background: "#eff6ff", borderRadius: 8, padding: "4px 14px", marginBottom: 14 }}>
              <span style={{ color: "#2563EB", fontSize: "0.8rem", fontWeight: 700 }}>BUSINESS MODEL</span>
            </div>
            <h2 className="hs-section-title" style={{ marginBottom: 12 }}>How HomeStay Works</h2>
            <p className="hs-section-subtitle" style={{ maxWidth: 520, margin: "0 auto" }}>
              A simple, transparent marketplace built on trust — for guests and hosts alike.
            </p>
          </div>
          <div className="row g-4">
            {howItWorks.map((step, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div style={{ position: "relative", textAlign: "center" }}>
                  {/* Connector line */}
                  {i < 3 && (
                    <div style={{
                      position: "absolute", top: 36, left: "60%", width: "80%",
                      height: 2, background: "linear-gradient(90deg, #e2e8f0, transparent)",
                      display: "none"
                    }} className="d-lg-block" />
                  )}
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%", background: "#eff6ff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px", position: "relative",
                    border: "4px solid #dbeafe"
                  }}>
                    {step.icon}
                    <div style={{
                      position: "absolute", top: -6, right: -6,
                      width: 24, height: 24, borderRadius: "50%",
                      background: "#2563EB", color: "#fff",
                      fontSize: "0.65rem", fontWeight: 800,
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      {step.step}
                    </div>
                  </div>
                  <h4 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 10, fontSize: "1rem" }}>{step.title}</h4>
                  <p style={{ color: "#64748b", fontSize: "0.87rem", lineHeight: 1.75, margin: 0, maxWidth: 220, marginLeft: "auto", marginRight: "auto" }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section style={{ padding: "72px 0", background: "#f8fafc" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-block", background: "#eff6ff", borderRadius: 8, padding: "4px 14px", marginBottom: 14 }}>
              <span style={{ color: "#2563EB", fontSize: "0.8rem", fontWeight: 700 }}>OUR TEAM</span>
            </div>
            <h2 className="hs-section-title" style={{ marginBottom: 12 }}>The People Behind HomeStay</h2>
            <p className="hs-section-subtitle" style={{ maxWidth: 480, margin: "0 auto" }}>
              A passionate team of builders, designers, and travelers united by a single mission.
            </p>
          </div>

          <div style={{ position: "relative", marginBottom: 52, borderRadius: 20, overflow: "hidden" }}>
            <img src={IMG_TEAM} alt="Our team" style={{ width: "100%", height: 320, objectFit: "cover" }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(15,23,42,0.7) 0%, transparent 60%)"
            }} />
            <div style={{ position: "absolute", bottom: 28, left: 32 }}>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.3rem", marginBottom: 4 }}>HomeStay HQ — San Francisco, CA</div>
              <div style={{ color: "#94a3b8", fontSize: "0.87rem" }}>A team of 40+ people across 12 countries</div>
            </div>
          </div>

          <div className="row g-4">
            {team.map((member, i) => (
              <div key={i} className="col-lg-3 col-md-6 col-6">
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: "50%",
                    background: member.gradient,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 14px",
                    fontSize: "1.4rem", fontWeight: 800, color: "#fff",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
                  }}>
                    {member.initials}
                  </div>
                  <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>{member.name}</div>
                  <div style={{ color: "#64748b", fontSize: "0.82rem" }}>{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "80px 0", textAlign: "center",
        background: "linear-gradient(135deg, #1e3a5f, #1d4ed8)"
      }}>
        <div className="container">
          <h2 style={{ color: "#fff", fontWeight: 800, marginBottom: 16, fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
            Ready to Experience HomeStay?
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: 36, fontSize: "1rem", maxWidth: 480, margin: "0 auto 36px" }}>
            Join over 85,000 travelers and 12,400 hosts who have already discovered the future of travel accommodations.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/listings">
              <button className="btn-primary-hs" style={{ fontSize: "0.95rem", padding: "12px 28px", display: "flex", alignItems: "center", gap: 8 }}>
                Start Exploring <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/contact">
              <button style={{
                background: "transparent", border: "1.5px solid rgba(255,255,255,0.4)",
                color: "#fff", borderRadius: 8, padding: "12px 28px", fontSize: "0.95rem",
                cursor: "pointer", fontWeight: 500, transition: "all 0.2s"
              }}>
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
