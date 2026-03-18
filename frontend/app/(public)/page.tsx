"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, MapPin, Calendar, Users, ArrowRight, Star, Shield, Clock, Award, ChevronRight } from "lucide-react";
import { properties, destinations } from "@/lib/mockData";
import { PropertyCard } from "@/components/shared/PropertyCard";

export default function HomePage() {
  const router = useRouter();
  const [searchForm, setSearchForm] = useState({ location: "", checkIn: "", checkOut: "", guests: "1" });
  const featured = properties.filter(p => p.featured && p.status === "Approved");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/listings");
  };

  return (
    <div>
      {/* ===== HERO ===== */}
      <section
        className="hs-hero"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1728049006363-f8e583040180?w=1400&q=80)` }}
      >
        <div className="hs-hero-overlay" />
        <div className="hs-hero-content container" style={{ padding: "60px 16px" }}>
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: 20, padding: "6px 16px", marginBottom: 20, border: "1px solid rgba(255,255,255,0.2)" }}>
                <Award size={14} color="#fbbf24" />
                <span style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 500 }}>Trusted by 50,000+ travelers worldwide</span>
              </div>

              <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 16, letterSpacing: -1 }}>
                Find Your Perfect<br />
                <span style={{ color: "#93c5fd" }}>Home Away</span> From Home
              </h1>
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.7 }}>
                Discover unique homestays, cozy cabins, and luxury villas across 80+ countries. Book with confidence.
              </p>

              {/* Search Form */}
              <div className="hs-search-card" style={{ textAlign: "left" }}>
                <form onSubmit={handleSearch}>
                  <div className="row g-3 align-items-end">
                    <div className="col-lg-3 col-md-6">
                      <label className="hs-form-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <MapPin size={14} color="#2563EB" /> Location
                      </label>
                      <input
                        className="hs-form-control"
                        placeholder="Where to go?"
                        value={searchForm.location}
                        onChange={e => setSearchForm({ ...searchForm, location: e.target.value })}
                      />
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <label className="hs-form-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Calendar size={14} color="#2563EB" /> Check-In
                      </label>
                      <input
                        type="date" className="hs-form-control"
                        value={searchForm.checkIn}
                        onChange={e => setSearchForm({ ...searchForm, checkIn: e.target.value })}
                      />
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <label className="hs-form-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Calendar size={14} color="#2563EB" /> Check-Out
                      </label>
                      <input
                        type="date" className="hs-form-control"
                        value={searchForm.checkOut}
                        onChange={e => setSearchForm({ ...searchForm, checkOut: e.target.value })}
                      />
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <label className="hs-form-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Users size={14} color="#2563EB" /> Guests
                      </label>
                      <select
                        className="hs-form-control"
                        value={searchForm.guests}
                        onChange={e => setSearchForm({ ...searchForm, guests: e.target.value })}
                      >
                        {[1,2,3,4,5,6,7,8].map(n => (
                          <option key={n} value={n}>{n} Guest{n>1?"s":""}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-1 col-12">
                      <button type="submit" className="btn-primary-hs" style={{ width: "100%", padding: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Search size={18} />
                      </button>
                    </div>
                  </div>
                </form>

                {/* Quick tags */}
                <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Bali 🌴", "Paris 🗼", "Tokyo 🏯", "New York 🌆", "Cabin 🏡", "Villa 🏖️"].map(tag => (
                    <button key={tag} onClick={() => router.push("/listings")} style={{
                      background: "#f1f5f9", border: "1px solid #e2e8f0", color: "#475569",
                      borderRadius: 20, padding: "4px 12px", fontSize: "0.8rem", cursor: "pointer",
                      transition: "all 0.15s"
                    }}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 24, marginTop: 32 }}>
                {[
                  { value: "10K+", label: "Properties" },
                  { value: "80+", label: "Countries" },
                  { value: "50K+", label: "Happy Guests" },
                  { value: "4.9★", label: "Average Rating" },
                ].map(stat => (
                  <div key={stat.label} style={{ textAlign: "center" }}>
                    <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.4rem" }}>{stat.value}</div>
                    <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8rem" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED HOMESTAYS ===== */}
      <section style={{ padding: "72px 0", background: "#fff" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div>
              <div className="hs-section-divider" />
              <h2 className="hs-section-title">Featured Homestays</h2>
              <p className="hs-section-subtitle">Handpicked properties loved by our guests</p>
            </div>
            <Link href="/listings" style={{ textDecoration: "none" }}>
              <button className="btn-outline-hs" style={{ display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                View All <ArrowRight size={14} />
              </button>
            </Link>
          </div>
          <div className="row g-4">
            {featured.map(property => (
              <div key={property.id} className="col-lg-4 col-md-6">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POPULAR DESTINATIONS ===== */}
      <section style={{ padding: "72px 0", background: "#f8fafc" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div className="hs-section-divider" style={{ margin: "0 auto 12px" }} />
            <h2 className="hs-section-title">Popular Destinations</h2>
            <p className="hs-section-subtitle">Explore top locations loved by travelers</p>
          </div>
          <div className="row g-4">
            {destinations.map(dest => (
              <div key={dest.id} className="col-lg-3 col-md-6 col-6">
                <Link href="/listings" style={{ textDecoration: "none" }}>
                  <div className="hs-dest-card">
                    <img src={dest.image} alt={dest.name} className="hs-dest-img" />
                    <div className="hs-dest-overlay" />
                    <div className="hs-dest-label">
                      <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 2 }}>{dest.name}</div>
                      <div style={{ fontSize: "0.78rem", opacity: 0.82 }}>{dest.country} · {dest.properties} properties</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section style={{ padding: "72px 0", background: "#fff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="hs-section-divider" style={{ margin: "0 auto 12px" }} />
            <h2 className="hs-section-title">How It Works</h2>
            <p className="hs-section-subtitle">Book your perfect stay in 3 simple steps</p>
          </div>
          <div className="row g-4 text-center">
            {[
              { icon: <Search size={26} color="#2563EB" />, step: "01", title: "Search & Discover", desc: "Browse thousands of unique homestays filtered by your preferences, budget, and destination." },
              { icon: <Calendar size={26} color="#2563EB" />, step: "02", title: "Book Your Stay", desc: "Select your dates, confirm your booking instantly, and receive a confirmation email." },
              { icon: <Shield size={26} color="#2563EB" />, step: "03", title: "Stay with Confidence", desc: "Enjoy your stay protected by our guest guarantee and 24/7 customer support." },
            ].map((step, i) => (
              <div key={i} className="col-lg-4 col-md-4">
                <div style={{ padding: "8px 20px" }}>
                  <div className="hs-step-icon">
                    {step.icon}
                  </div>
                  <div style={{ fontWeight: 800, color: "#2563EB", fontSize: "0.75rem", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>
                    Step {step.step}
                  </div>
                  <h3 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.65, maxWidth: 280, margin: "0 auto" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section style={{ padding: "48px 0", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
        <div className="container">
          <div className="row g-3 justify-content-center text-center">
            {[
              { icon: <Shield size={20} color="#2563EB" />, title: "Secure Payments", desc: "Bank-level encryption on all transactions" },
              { icon: <Star size={20} color="#2563EB" />, title: "Verified Reviews", desc: "Only guests who've stayed can review" },
              { icon: <Clock size={20} color="#2563EB" />, title: "24/7 Support", desc: "Round-the-clock assistance" },
              { icon: <Award size={20} color="#2563EB" />, title: "Best Price Guarantee", desc: "Find it cheaper? We'll match it" },
            ].map((item, i) => (
              <div key={i} className="col-lg-3 col-md-6 col-6">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "12px 16px" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {item.icon}
                  </div>
                  <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9rem" }}>{item.title}</div>
                  <div style={{ color: "#64748b", fontSize: "0.8rem" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{
        padding: "72px 0",
        background: "linear-gradient(135deg, #1e3a8a 0%, #2563EB 50%, #0ea5e9 100%)"
      }}>
        <div className="container text-center">
          <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", marginBottom: 12 }}>
            Ready to List Your Property?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: 500, margin: "0 auto 28px", fontSize: "1rem" }}>
            Join thousands of hosts earning extra income. List your space and reach millions of travelers.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/auth/register">
              <button style={{
                background: "#fff", color: "#2563EB", border: "none",
                borderRadius: 8, padding: "12px 28px", fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 6
              }}>
                Become a Host <ChevronRight size={16} />
              </button>
            </Link>
            <Link href="/listings">
              <button style={{
                background: "transparent", color: "#fff",
                border: "2px solid rgba(255,255,255,0.6)", borderRadius: 8,
                padding: "12px 28px", fontWeight: 600, cursor: "pointer"
              }}>
                Browse Listings
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
