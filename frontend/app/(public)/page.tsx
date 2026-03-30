"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
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
import { destinations } from "@/lib/destinations";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { getProperties, type PropertySummary } from "@/services/propertyService";

const QUICK_SEARCH_TAGS = [
  "Da Nang",
  "Ha Noi",
  "Ho Chi Minh City",
  "Da Lat",
  "Villa",
  "Apartment",
];

const PROPERTY_TYPE_TAGS = new Set(["Villa", "Apartment"]);

interface HomeStats {
  totalProperties: number;
  totalCities: number;
  totalHosts: number;
  averageRating: number;
}

export default function HomePage() {
  const router = useRouter();
  const [searchForm, setSearchForm] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
  });
  const [searchError, setSearchError] = useState("");
  const [featuredProperties, setFeaturedProperties] = useState<PropertySummary[]>([]);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);
  const [destinationCounts, setDestinationCounts] = useState<Record<string, number>>({});
  const [homeStats, setHomeStats] = useState<HomeStats>({
    totalProperties: 0,
    totalCities: 0,
    totalHosts: 0,
    averageRating: 0,
  });

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

        const uniqueCities = new Set(
          data.map((property) => property.city).filter(Boolean),
        ).size;
        const uniqueHosts = new Set(
          data.map((property) => property.hostId).filter(Boolean),
        ).size;
        const ratedProperties = data.filter((property) => property.rating > 0);
        const averageRating =
          ratedProperties.length > 0
            ? ratedProperties.reduce((sum, property) => sum + property.rating, 0) /
              ratedProperties.length
            : 0;
        const nextDestinationCounts = data.reduce<Record<string, number>>(
          (accumulator, property) => {
            if (property.city) {
              accumulator[property.city] = (accumulator[property.city] || 0) + 1;
            }

            return accumulator;
          },
          {},
        );

        setFeaturedProperties(
          nextFeatured.length > 0 ? nextFeatured : data.slice(0, 3),
        );
        setDestinationCounts(nextDestinationCounts);
        setHomeStats({
          totalProperties: data.length,
          totalCities: uniqueCities,
          totalHosts: uniqueHosts,
          averageRating,
        });
      } catch (_error) {
        if (mounted) {
          setFeaturedProperties([]);
          setDestinationCounts({});
          setHomeStats({
            totalProperties: 0,
            totalCities: 0,
            totalHosts: 0,
            averageRating: 0,
          });
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

  function updateSearchField(field: keyof typeof searchForm, value: string) {
    setSearchForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (searchError) {
      setSearchError("");
    }
  }

  function buildSearchUrl(overrides: Partial<typeof searchForm> = {}) {
    const nextSearchForm = {
      ...searchForm,
      ...overrides,
    };
    const params = new URLSearchParams();

    if (nextSearchForm.location.trim()) {
      params.set("location", nextSearchForm.location.trim());
    }

    if (nextSearchForm.checkIn) {
      params.set("checkIn", nextSearchForm.checkIn);
    }

    if (nextSearchForm.checkOut) {
      params.set("checkOut", nextSearchForm.checkOut);
    }

    if (nextSearchForm.guests && nextSearchForm.guests !== "1") {
      params.set("guests", nextSearchForm.guests);
    }

    const queryString = params.toString();
    return `/listings${queryString ? `?${queryString}` : ""}`;
  }

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();

    if (
      searchForm.checkIn &&
      searchForm.checkOut &&
      new Date(searchForm.checkOut) <= new Date(searchForm.checkIn)
    ) {
      setSearchError("Check-out date must be after check-in date.");
      return;
    }

    setSearchError("");
    router.push(buildSearchUrl());
  }

  function handleQuickTagSearch(tag: string) {
    const nextUrl = PROPERTY_TYPE_TAGS.has(tag)
      ? `/listings?type=${encodeURIComponent(tag)}`
      : `/listings?location=${encodeURIComponent(tag)}`;

    router.push(nextUrl);
  }

  const statItems = [
    {
      value: homeStats.totalProperties > 0 ? `${homeStats.totalProperties}+` : "0",
      label: "active stays",
    },
    {
      value: homeStats.totalCities > 0 ? `${homeStats.totalCities}+` : "0",
      label: "destinations",
    },
    {
      value: homeStats.totalHosts > 0 ? `${homeStats.totalHosts}+` : "0",
      label: "trusted hosts",
    },
    {
      value:
        homeStats.averageRating > 0 ? homeStats.averageRating.toFixed(1) : "New",
      label: "average rating",
    },
  ];

  const displayDestinations = useMemo(
    () =>
      destinations.map((destination) => ({
        ...destination,
        properties: destinationCounts[destination.name] ?? 0,
      })),
    [destinationCounts],
  );

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
                  Trusted by travelers planning city breaks, family stays, and getaways
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
                  maxWidth: 560,
                  margin: "0 auto 32px",
                  lineHeight: 1.7,
                }}
              >
                Discover carefully selected homestays, cabins, penthouses, and
                villas for weekend escapes, longer stays, and memorable trips.
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
                        placeholder="Where do you want to stay?"
                        value={searchForm.location}
                        onChange={(event) =>
                          updateSearchField("location", event.target.value)
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
                          updateSearchField("checkIn", event.target.value)
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
                          updateSearchField("checkOut", event.target.value)
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
                          updateSearchField("guests", event.target.value)
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

                {searchError ? (
                  <div
                    style={{
                      marginTop: 12,
                      color: "#b91c1c",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                    }}
                  >
                    {searchError}
                  </div>
                ) : null}

                <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {QUICK_SEARCH_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleQuickTagSearch(tag)}
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

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: 24,
                  marginTop: 32,
                }}
              >
                {statItems.map((item) => (
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
                Handpicked stays worth discovering for your next trip.
              </p>
            </div>
            <Link href="/listings" style={{ textDecoration: "none" }}>
              <button
                className="btn-outline-hs"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  whiteSpace: "nowrap",
                }}
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
            {displayDestinations.map((destination) => (
              <div key={destination.id} className="col-lg-3 col-md-6 col-6">
                <Link
                  href={`/listings?location=${encodeURIComponent(destination.name)}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="hs-dest-card">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      className="hs-dest-img"
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="hs-dest-overlay" />
                    <div className="hs-dest-label">
                      <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 2 }}>
                        {destination.name}
                      </div>
                      <div style={{ fontSize: "0.78rem", opacity: 0.82 }}>
                        {destination.country} - {destination.properties} stays
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
                desc: "Browse verified homestays and filter by destination, dates, guest count, and stay style.",
              },
              {
                icon: <Calendar size={26} color="#2563EB" />,
                step: "02",
                title: "Book your stay",
                desc: "Choose your dates, review the property details, and complete the booking flow step by step.",
              },
              {
                icon: <Shield size={26} color="#2563EB" />,
                step: "03",
                title: "Stay with confidence",
                desc: "Pay securely, stay informed, and keep every booking detail in one place.",
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
                desc: "Protected access for guests, hosts, and administrators",
              },
              {
                icon: <Star size={20} color="#2563EB" />,
                title: "Verified ratings",
                desc: "Guest feedback helps you choose stays with confidence",
              },
              {
                icon: <Clock size={20} color="#2563EB" />,
                title: "Fast browsing",
                desc: "Search faster with responsive filters and smoother browsing",
              },
              {
                icon: <Award size={20} color="#2563EB" />,
                title: "Featured stays",
                desc: "Curated highlights refreshed from current featured listings",
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
            Join as a host, publish your property, and welcome guests with a
            booking flow built for real stays.
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

