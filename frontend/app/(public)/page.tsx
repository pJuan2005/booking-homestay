"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Award,
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  MapPin,
  Search,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { destinations } from "@/lib/mockData";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { getProperties, type PropertySummary } from "@/services/propertyService";

export default function HomePage() {
  const router = useRouter();
  const [searchForm, setSearchForm] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
  });
  const [featuredProperties, setFeaturedProperties] = useState<PropertySummary[]>([]);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadFeaturedProperties() {
      try {
        const data = await getProperties();

        if (!mounted) {
          return;
        }

        const nextFeatured = [...data]
          .filter((property) => property.featured)
          .sort((left, right) => right.rating - left.rating)
          .slice(0, 3);

        setFeaturedProperties(
          nextFeatured.length > 0 ? nextFeatured : data.slice(0, 3),
        );
      } catch (_error) {
        if (mounted) {
          setFeaturedProperties([]);
        }
      } finally {
        if (mounted) {
          setIsLoadingFeatured(false);
        }
      }
    }

    loadFeaturedProperties();

    return () => {
      mounted = false;
    };
  }, []);

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    router.push("/listings");
  }

  return (
    <div>
      <section
        className="hs-hero"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1728049006363-f8e583040180?w=1400&q=80)",
        }}
      >
        <div className="hs-hero-overlay" />
        <div className="hs-hero-content container" style={{ padding: "60px 16px" }}>
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 20,
                  padding: "6px 16px",
                  marginBottom: 20,
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <Award size={14} color="#fbbf24" />
                <span style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 500 }}>
                  Trusted by thousands of travelers worldwide
                </span>
              </div>

              <h1
                style={{
                  color: "#fff",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  marginBottom: 16,
                  letterSpacing: -1,
                }}
              >
                Find Your Perfect
                <br />
                <span style={{ color: "#93c5fd" }}>Home Away</span> From Home
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.82)",
                  fontSize: "1.05rem",
                  maxWidth: 520,
                  margin: "0 auto 32px",
                  lineHeight: 1.7,
                }}
              >
                Discover unique homestays, cabins, penthouses, and villas loaded
                from the live system.
              </p>

              <div className="hs-search-card" style={{ textAlign: "left" }}>
                <form onSubmit={handleSearch}>
                  <div className="row g-3 align-items-end">
                    <div className="col-lg-3 col-md-6">
                      <label
                        className="hs-form-label"
                        style={{ display: "flex", alignItems: "center", gap: 6 }}
                      >
                        <MapPin size={14} color="#2563EB" /> Location
                      </label>
                      <input
                        className="hs-form-control"
                        placeholder="Where to go?"
                        value={searchForm.location}
                        onChange={(event) =>
                          setSearchForm((prev) => ({
                            ...prev,
                            location: event.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <label
                        className="hs-form-label"
                        style={{ display: "flex", alignItems: "center", gap: 6 }}
                      >
                        <Calendar size={14} color="#2563EB" /> Check-in
                      </label>
                      <input
                        type="date"
                        className="hs-form-control"
                        value={searchForm.checkIn}
                        onChange={(event) =>
                          setSearchForm((prev) => ({
                            ...prev,
                            checkIn: event.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <label
                        className="hs-form-label"
                        style={{ display: "flex", alignItems: "center", gap: 6 }}
                      >
                        <Calendar size={14} color="#2563EB" /> Check-out
                      </label>
                      <input
                        type="date"
                        className="hs-form-control"
                        value={searchForm.checkOut}
                        onChange={(event) =>
                          setSearchForm((prev) => ({
                            ...prev,
                            checkOut: event.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <label
                        className="hs-form-label"
                        style={{ display: "flex", alignItems: "center", gap: 6 }}
                      >
                        <Users size={14} color="#2563EB" /> Guests
                      </label>
                      <select
                        className="hs-form-control"
                        value={searchForm.guests}
                        onChange={(event) =>
                          setSearchForm((prev) => ({
                            ...prev,
                            guests: event.target.value,
                          }))
                        }
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                          <option key={count} value={count}>
                            {count} Guest{count > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-1 col-12">
                      <button
                        type="submit"
                        className="btn-primary-hs"
                        style={{
                          width: "100%",
                          padding: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Search size={18} />
                      </button>
                    </div>
                  </div>
                </form>

                <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Bali", "Paris", "Tokyo", "New York", "Villa", "Cabin"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => router.push("/listings")}
                      style={{
                        background: "#f1f5f9",
                        border: "1px solid #e2e8f0",
                        color: "#475569",
                        borderRadius: 20,
                        padding: "4px 12px",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 24, marginTop: 32 }}>
                {[
                  { value: "14+", label: "Seeded properties" },
                  { value: "3", label: "Property statuses" },
                  { value: "24/7", label: "Host access" },
                  { value: "4.9+", label: "Average rating" },
                ].map((item) => (
                  <div key={item.label} style={{ textAlign: "center" }}>
                    <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.4rem" }}>
                      {item.value}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8rem" }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "72px 0", background: "#fff" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 40,
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div className="hs-section-divider" />
              <h2 className="hs-section-title">Featured Homestays</h2>
              <p className="hs-section-subtitle">
                These properties are loaded directly from the current database.
              </p>
            </div>
            <Link href="/listings" style={{ textDecoration: "none" }}>
              <button
                className="btn-outline-hs"
                style={{ display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}
              >
                View All <ArrowRight size={14} />
              </button>
            </Link>
          </div>

          {isLoadingFeatured ? (
            <div
              style={{
                textAlign: "center",
                padding: "32px 16px",
                color: "#64748b",
                background: "#f8fafc",
                borderRadius: 16,
              }}
            >
              Loading featured properties...
            </div>
          ) : featuredProperties.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "32px 16px",
                color: "#64748b",
                background: "#f8fafc",
                borderRadius: 16,
              }}
            >
              No featured properties are available yet.
            </div>
          ) : (
            <div className="row g-4">
              {featuredProperties.map((property) => (
                <div key={property.id} className="col-lg-4 col-md-6">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section style={{ padding: "72px 0", background: "#f8fafc" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div className="hs-section-divider" style={{ margin: "0 auto 12px" }} />
            <h2 className="hs-section-title">Popular Destinations</h2>
            <p className="hs-section-subtitle">Explore locations travelers love</p>
          </div>
          <div className="row g-4">
            {destinations.map((destination) => (
              <div key={destination.id} className="col-lg-3 col-md-6 col-6">
                <Link href="/listings" style={{ textDecoration: "none" }}>
                  <div className="hs-dest-card">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="hs-dest-img"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="hs-dest-overlay" />
                    <div className="hs-dest-label">
                      <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 2 }}>
                        {destination.name}
                      </div>
                      <div style={{ fontSize: "0.78rem", opacity: 0.82 }}>
                        {destination.country} • {destination.properties} properties
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "72px 0", background: "#fff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="hs-section-divider" style={{ margin: "0 auto 12px" }} />
            <h2 className="hs-section-title">How It Works</h2>
            <p className="hs-section-subtitle">Book your stay in three simple steps</p>
          </div>
          <div className="row g-4 text-center">
            {[
              {
                icon: <Search size={26} color="#2563EB" />,
                step: "01",
                title: "Search and discover",
                desc: "Browse verified homestays and filter by your destination, price, and stay preferences.",
              },
              {
                icon: <Calendar size={26} color="#2563EB" />,
                step: "02",
                title: "Book your stay",
                desc: "Choose your dates, review the property details, and complete your booking flow.",
              },
              {
                icon: <Shield size={26} color="#2563EB" />,
                step: "03",
                title: "Stay with confidence",
                desc: "Enjoy your trip knowing your booking and property data are managed in the live system.",
              },
            ].map((step) => (
              <div key={step.step} className="col-lg-4 col-md-4">
                <div style={{ padding: "8px 20px" }}>
                  <div className="hs-step-icon">{step.icon}</div>
                  <div
                    style={{
                      fontWeight: 800,
                      color: "#2563EB",
                      fontSize: "0.75rem",
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    Step {step.step}
                  </div>
                  <h3 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 10 }}>
                    {step.title}
                  </h3>
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "0.9rem",
                      lineHeight: 1.65,
                      maxWidth: 280,
                      margin: "0 auto",
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "48px 0",
          background: "#f8fafc",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        <div className="container">
          <div className="row g-3 justify-content-center text-center">
            {[
              {
                icon: <Shield size={20} color="#2563EB" />,
                title: "Secure sessions",
                desc: "Authenticated access for guests, hosts, and admins",
              },
              {
                icon: <Star size={20} color="#2563EB" />,
                title: "Verified ratings",
                desc: "Review scores are pulled from real property data",
              },
              {
                icon: <Clock size={20} color="#2563EB" />,
                title: "Fast browsing",
                desc: "Lists are optimized with lazy-loaded images and pagination",
              },
              {
                icon: <Award size={20} color="#2563EB" />,
                title: "Featured stays",
                desc: "Homepage spotlight uses the current database, not hard-coded cards",
              },
            ].map((item) => (
              <div key={item.title} className="col-lg-3 col-md-6 col-6">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 16px",
                  }}
                >
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      background: "#eff6ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9rem" }}>
                    {item.title}
                  </div>
                  <div style={{ color: "#64748b", fontSize: "0.8rem" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "72px 0",
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563EB 50%, #0ea5e9 100%)",
        }}
      >
        <div className="container text-center">
          <h2
            style={{
              color: "#fff",
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              marginBottom: 12,
            }}
          >
            Ready to List Your Property?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              maxWidth: 500,
              margin: "0 auto 28px",
              fontSize: "1rem",
            }}
          >
            Join the platform as a host and publish your own listing through the
            live property workflow.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/auth/register">
              <button
                style={{
                  background: "#fff",
                  color: "#2563EB",
                  border: "none",
                  borderRadius: 8,
                  padding: "12px 28px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                Become a Host <ChevronRight size={16} />
              </button>
            </Link>
            <Link href="/listings">
              <button
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "2px solid rgba(255,255,255,0.6)",
                  borderRadius: 8,
                  padding: "12px 28px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Browse Listings
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
