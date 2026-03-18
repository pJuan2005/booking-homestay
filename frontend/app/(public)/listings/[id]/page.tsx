"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin, Star, Users, Bed, Bath, Wifi, Utensils, Car, Wind,
  Waves, Dumbbell, Flame, TreePine, ArrowLeft, Calendar, ChevronLeft,
  ChevronRight, Heart, CheckCircle, MessageSquare, TrendingUp
} from "lucide-react";
import { properties, bookings } from "@/lib/mockData";
// Temporary stubs for Review/Auth Contexts until appropriately migrated completely
// import { useReviews } from "@/components/context/ReviewContext";
import { useAuth } from "@/components/context/AuthContext";

const amenityIcons: Record<string, React.ReactNode> = {
  "WiFi": <Wifi size={16} />,
  "Full Kitchen": <Utensils size={16} />,
  "Parking": <Car size={16} />,
  "Air Conditioning": <Wind size={16} />,
  "Private Pool": <Waves size={16} />,
  "Pool": <Waves size={16} />,
  "Gym Access": <Dumbbell size={16} />,
  "Fireplace": <Flame size={16} />,
  "Forest View": <TreePine size={16} />,
  "Beach Access": <Waves size={16} />,
};

function StarDisplay({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          size={size}
          fill={n <= Math.round(rating) ? "#f59e0b" : "none"}
          color={n <= Math.round(rating) ? "#f59e0b" : "#d1d5db"}
        />
      ))}
    </div>
  );
}

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
      <span style={{ fontSize: "0.8rem", color: "#64748b", width: 110, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: 6, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(value / 5) * 100}%`, background: "#f59e0b", borderRadius: 99 }} />
      </div>
      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1e293b", width: 24, textAlign: "right" }}>{value.toFixed(1)}</span>
    </div>
  );
}

// Check if checkout date has already passed
function isCheckoutPast(checkOutDate: string): boolean {
  if (!checkOutDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkout = new Date(checkOutDate);
  checkout.setHours(0, 0, 0, 0);
  return checkout < today;
}

export default function DetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  // Stubs for review context methods for now
  const getReviewsByProperty = (id: number) => [];
  const getAverageRating = (id: number) => 0;
  const hasReview = (id: number) => false;

  const property = properties.find(p => p.id === Number(id));
  const propertyReviews = getReviewsByProperty(Number(id));
  const avgRating = getAverageRating(Number(id)) || (property?.rating ?? 0);

  const [activeImg, setActiveImg] = useState(0);
  const [bookingForm, setBookingForm] = useState({ checkIn: "", checkOut: "", guests: "1" });
  const [liked, setLiked] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!property) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div>
          <div style={{ fontSize: "3rem", marginBottom: 16 }}>🏠</div>
          <h2 style={{ color: "#1e293b", fontWeight: 700 }}>Property not found</h2>
          <Link href="/listings"><button className="btn-primary-hs" style={{ marginTop: 16 }}>Back to Listings</button></Link>
        </div>
      </div>
    );
  }

  // Find user's eligible bookings for this property
  const userEligibleBooking = user
    ? bookings.find(b =>
        b.propertyId === property.id &&
        (b.guestId === user.id || b.guestName.toLowerCase().includes((user.name || "Guest").split(" ")[0].toLowerCase())) &&
        b.status === "Confirmed" &&
        isCheckoutPast(b.checkOut)
      )
    : null;

  const userAlreadyReviewed = userEligibleBooking ? hasReview(userEligibleBooking.id) : false;

  const allImages = property.images && property.images.length > 0 ? property.images : [property.image];
  const nights = (() => {
    if (!bookingForm.checkIn || !bookingForm.checkOut) return 0;
    const diff = new Date(bookingForm.checkOut).getTime() - new Date(bookingForm.checkIn).getTime();
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  })();
  const subtotal = property.price * nights;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + serviceFee;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  // Rating breakdown
  const ratingBreakdown = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: propertyReviews.filter((r: any) => r.rating === stars).length,
  }));

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "12px 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.84rem" }}>
            <button onClick={() => router.back()} style={{ background: "none", border: "none", color: "#2563EB", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: 0, fontWeight: 600 }}>
              <ArrowLeft size={14} /> Back
            </button>
            <span style={{ color: "#94a3b8" }}>/</span>
            <Link href="/listings" style={{ color: "#64748b", textDecoration: "none" }}>Listings</Link>
            <span style={{ color: "#94a3b8" }}>/</span>
            <span style={{ color: "#1e293b", fontWeight: 600 }}>{property.title}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "32px 16px" }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ background: "#eff6ff", color: "#2563EB", fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>
                  {property.type}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.85rem" }}>
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <strong>{avgRating > 0 ? avgRating : property.rating}</strong>
                  <span style={{ color: "#94a3b8" }}>({propertyReviews.length > 0 ? propertyReviews.length : property.reviews} reviews)</span>
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, color: "#1e293b", marginBottom: 6 }}>
                {property.title}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#64748b", fontSize: "0.88rem" }}>
                <MapPin size={14} color="#2563EB" />
                {property.location}
              </div>
            </div>
            <button onClick={() => setLiked(!liked)} style={{
              background: liked ? "#fee2e2" : "#f1f5f9",
              border: "none", borderRadius: 10, padding: "10px",
              cursor: "pointer", transition: "all 0.2s"
            }}>
              <Heart size={20} color={liked ? "#dc2626" : "#94a3b8"} fill={liked ? "#dc2626" : "none"} />
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ position: "relative", marginBottom: 8 }}>
            <img src={allImages[activeImg]} alt={property.title} className="hs-gallery-main" />
            {allImages.length > 1 && (
              <>
                <button onClick={() => setActiveImg(i => (i - 1 + allImages.length) % allImages.length)}
                  style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", border: "none", borderRadius: 8, padding: "8px", cursor: "pointer", color: "#fff" }}>
                  <ChevronLeft size={18} />
                </button>
                <button onClick={() => setActiveImg(i => (i + 1) % allImages.length)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", border: "none", borderRadius: 8, padding: "8px", cursor: "pointer", color: "#fff" }}>
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>
          <div className="row g-2">
            {allImages.map((img, i) => (
              <div key={i} className="col-4 col-md-3">
                <img src={img} alt="" className={`hs-gallery-thumb ${activeImg === i ? "active" : ""}`} onClick={() => setActiveImg(i)} />
              </div>
            ))}
          </div>
        </div>

        <div className="row g-4">
          {/* Left: Info */}
          <div className="col-lg-8">
            {/* Quick Info */}
            <div className="hs-card-flat" style={{ padding: "20px 24px", marginBottom: 20 }}>
              <div className="row g-3">
                {[
                  { icon: <Users size={17} color="#2563EB" />, label: `Up to ${property.maxGuests} Guests` },
                  { icon: <Bed size={17} color="#2563EB" />, label: `${property.bedrooms} Bedrooms` },
                  { icon: <Bath size={17} color="#2563EB" />, label: `${property.bathrooms} Bathrooms` },
                  { icon: <Star size={17} color="#f59e0b" />, label: `${avgRating > 0 ? avgRating : property.rating} Rating` },
                ].map((item, i) => (
                  <div key={i} className="col-6 col-md-3">
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0" }}>
                      {item.icon}
                      <span style={{ fontSize: "0.87rem", fontWeight: 600, color: "#1e293b" }}>{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Info */}
            <div className="hs-card-flat" style={{ padding: "18px 24px", marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 50, height: 50, borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}>
                  {property.hostName?.split(" ").map(w => w[0]).join("")}
                </span>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "#1e293b" }}>Hosted by {property.hostName}</div>
                <div style={{ color: "#64748b", fontSize: "0.83rem" }}>Superhost · Member since 2022</div>
              </div>
            </div>

            {/* Description */}
            <div className="hs-card-flat" style={{ padding: "20px 24px", marginBottom: 20 }}>
              <h2 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 12, fontSize: "1.1rem" }}>About This Property</h2>
              <p style={{ color: "#475569", lineHeight: 1.75, fontSize: "0.92rem", margin: 0 }}>
                {property.description || "A beautiful property perfect for your next stay. Enjoy wonderful amenities and a great location."}
              </p>
            </div>

            {/* Amenities */}
            <div className="hs-card-flat" style={{ padding: "20px 24px", marginBottom: 20 }}>
              <h2 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 16, fontSize: "1.1rem" }}>Amenities</h2>
              <div className="row g-2">
                {property.amenities?.map((a, i) => (
                  <div key={i} className="col-6 col-md-4">
                    <div className="hs-amenity">
                      {amenityIcons[a] || <Star size={16} />}
                      {a}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== REVIEWS SECTION ===== */}
            <div className="hs-card-flat" style={{ padding: "24px" }}>

              {/* Your Stay Review Banner */}
              {userEligibleBooking && (
                <div style={{
                  marginBottom: 24,
                  borderRadius: 12,
                  padding: "18px 20px",
                  background: userAlreadyReviewed
                    ? "linear-gradient(135deg, #f0fdf4, #dcfce7)"
                    : "linear-gradient(135deg, #fffbeb, #fef3c7)",
                  border: `1.5px solid ${userAlreadyReviewed ? "#86efac" : "#fde68a"}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  flexWrap: "wrap",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: userAlreadyReviewed ? "#16a34a" : "#f59e0b",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}>
                    {userAlreadyReviewed
                      ? <CheckCircle size={22} color="#fff" />
                      : <Star size={22} color="#fff" fill="#fff" />
                    }
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: userAlreadyReviewed ? "#15803d" : "#92400e", fontSize: "0.95rem", marginBottom: 2 }}>
                      {userAlreadyReviewed ? "✔ You have already reviewed this stay" : "⭐ Rate your stay at this property"}
                    </div>
                    <div style={{ color: userAlreadyReviewed ? "#16a34a" : "#78350f", fontSize: "0.82rem" }}>
                      {userAlreadyReviewed
                        ? "Thank you for your feedback! Your review helps other travelers."
                        : `You stayed here ${userEligibleBooking.nights} nights. Share your experience with the community!`
                      }
                    </div>
                  </div>
                  {!userAlreadyReviewed && (
                    <Link href={`/reviews/create/${userEligibleBooking.id}`}>
                      <button style={{
                        background: "#f59e0b", color: "#fff", border: "none", borderRadius: 8,
                        padding: "10px 18px", fontWeight: 700, fontSize: "0.88rem",
                        cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                        whiteSpace: "nowrap"
                      }}>
                        <MessageSquare size={14} /> Write Review
                      </button>
                    </Link>
                  )}
                </div>
              )}

              {/* Reviews Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h2 style={{ fontWeight: 700, color: "#1e293b", margin: 0, fontSize: "1.1rem", marginBottom: 4 }}>
                    Guest Reviews
                  </h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Star size={20} fill="#f59e0b" color="#f59e0b" />
                      <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1e293b" }}>
                        {avgRating > 0 ? avgRating : property.rating}
                      </span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: "#475569", fontSize: "0.85rem" }}>
                        {propertyReviews.length > 0 ? propertyReviews.length : property.reviews} total reviews
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating Breakdown */}
                {propertyReviews.length > 0 && (
                  <div style={{ minWidth: 200 }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>
                      <TrendingUp size={11} /> Breakdown
                    </div>
                    {ratingBreakdown.map(({ stars, count }) => (
                      <div key={stars} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: "0.75rem", color: "#64748b", width: 12, textAlign: "right" }}>{stars}</span>
                        <Star size={10} fill="#f59e0b" color="#f59e0b" />
                        <div style={{ flex: 1, height: 5, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
                          <div style={{
                            height: "100%",
                            width: propertyReviews.length > 0 ? `${(count / propertyReviews.length) * 100}%` : "0%",
                            background: "#f59e0b", borderRadius: 99,
                            transition: "width 0.3s"
                          }} />
                        </div>
                        <span style={{ fontSize: "0.72rem", color: "#94a3b8", width: 14 }}>{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Category Rating Bars */}
              {propertyReviews.length > 0 && (
                <div style={{ background: "#f8fafc", borderRadius: 12, padding: "16px 18px", marginBottom: 24, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 12 }}>Category Ratings</div>
                  <div className="row">
                    <div className="col-md-6">
                      <RatingBar label="Cleanliness" value={Math.min(5, avgRating + 0.1)} />
                      <RatingBar label="Accuracy" value={Math.min(5, avgRating - 0.1)} />
                    </div>
                    <div className="col-md-6">
                      <RatingBar label="Location" value={Math.min(5, avgRating + 0.2)} />
                      <RatingBar label="Value" value={Math.min(5, avgRating - 0.2)} />
                    </div>
                  </div>
                </div>
              )}

              {/* Review List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {(propertyReviews.length > 0 ? propertyReviews : [
                  { id: 0, bookingId: 0, propertyId: property.id, guestId: 0, authorName: "Travel Fan", rating: property.rating || 5, comment: "Absolutely wonderful stay! Highly recommend to anyone looking for a great experience.", date: "2025-02-01" }
                ]).map((review: any) => (
                  <div key={review.id} style={{
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 14,
                    padding: "18px 20px",
                    transition: "box-shadow 0.2s",
                  }}>
                    <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                      {/* Avatar */}
                      <div style={{
                        width: 44, height: 44, borderRadius: "50%",
                        background: `hsl(${review.authorName.charCodeAt(0) * 37 % 360}, 60%, 55%)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontWeight: 800, fontSize: "1rem", flexShrink: 0
                      }}>
                        {review.authorName[0]}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                          <div>
                            <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9rem" }}>{review.authorName}</div>
                            <div style={{ color: "#94a3b8", fontSize: "0.75rem", marginTop: 1 }}>
                              {new Date(review.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <StarDisplay rating={review.rating} size={13} />
                            <span style={{
                              background: "#fef3c7", color: "#92400e",
                              fontSize: "0.72rem", fontWeight: 700, padding: "2px 8px", borderRadius: 20
                            }}>
                              {review.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p style={{ color: "#475569", fontSize: "0.88rem", lineHeight: 1.7, margin: 0 }}>
                      {review.comment}
                    </p>
                    {review.bookingId !== 0 && (
                      <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 5, color: "#16a34a", fontSize: "0.75rem", fontWeight: 600 }}>
                        <CheckCircle size={11} /> Verified Stay
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* No reviews message */}
              {propertyReviews.length === 0 && !userEligibleBooking && (
                <div style={{ textAlign: "center", padding: "32px 0 8px", color: "#94a3b8" }}>
                  <MessageSquare size={32} color="#e2e8f0" style={{ marginBottom: 8 }} />
                  <p style={{ margin: 0, fontSize: "0.87rem" }}>No reviews yet. Be the first to review this property!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="col-lg-4">
            <div style={{ position: "sticky", top: 80 }}>
              <div className="hs-card" style={{ padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                  <div>
                    <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1e293b" }}>${property.price}</span>
                    <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}> / night</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Star size={13} fill="#f59e0b" color="#f59e0b" />
                    <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>{avgRating > 0 ? avgRating : property.rating}</span>
                    <span style={{ color: "#94a3b8", fontSize: "0.78rem" }}>({propertyReviews.length > 0 ? propertyReviews.length : property.reviews})</span>
                  </div>
                </div>

                {bookingSuccess ? (
                  <div style={{ textAlign: "center", padding: "24px 0" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🎉</div>
                    <div style={{ fontWeight: 700, color: "#16a34a", fontSize: "1.1rem", marginBottom: 8 }}>Booking Submitted!</div>
                    <p style={{ color: "#64748b", fontSize: "0.87rem" }}>Your booking request is pending confirmation from the host.</p>
                    <button className="btn-primary-hs" style={{ marginTop: 12, width: "100%" }} onClick={() => setBookingSuccess(false)}>
                      Book Again
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} style={{ marginTop: 16 }}>
                    <div style={{ border: "1.5px solid #e2e8f0", borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid #e2e8f0" }}>
                        <div style={{ padding: "12px 14px", borderRight: "1px solid #e2e8f0" }}>
                          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#1e293b", letterSpacing: 0.5, textTransform: "uppercase" }}>Check-in</div>
                          <input type="date" required
                            style={{ border: "none", outline: "none", width: "100%", fontSize: "0.85rem", color: "#475569", padding: 0, background: "transparent", marginTop: 2 }}
                            value={bookingForm.checkIn}
                            onChange={e => setBookingForm({ ...bookingForm, checkIn: e.target.value })}
                          />
                        </div>
                        <div style={{ padding: "12px 14px" }}>
                          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#1e293b", letterSpacing: 0.5, textTransform: "uppercase" }}>Check-out</div>
                          <input type="date" required
                            style={{ border: "none", outline: "none", width: "100%", fontSize: "0.85rem", color: "#475569", padding: 0, background: "transparent", marginTop: 2 }}
                            value={bookingForm.checkOut}
                            onChange={e => setBookingForm({ ...bookingForm, checkOut: e.target.value })}
                          />
                        </div>
                      </div>
                      <div style={{ padding: "12px 14px" }}>
                        <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#1e293b", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 4 }}>Guests</div>
                        <select
                          style={{ border: "none", outline: "none", width: "100%", fontSize: "0.87rem", color: "#475569", padding: 0, background: "transparent" }}
                          value={bookingForm.guests}
                          onChange={e => setBookingForm({ ...bookingForm, guests: e.target.value })}
                        >
                          {Array.from({ length: property.maxGuests }, (_, i) => i + 1).map(n => (
                            <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="btn-primary-hs" style={{ width: "100%", marginBottom: 12, fontSize: "0.95rem" }}>
                      <Calendar size={16} style={{ marginRight: 6, verticalAlign: "middle" }} />
                      Book Now
                    </button>

                    <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "0.78rem", margin: "0 0 14px" }}>
                      You won't be charged yet
                    </p>

                    {nights > 0 && (
                      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "#475569", marginBottom: 8 }}>
                          <span>${property.price} × {nights} nights</span>
                          <span>${subtotal}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "#475569", marginBottom: 8 }}>
                          <span>Service fee</span>
                          <span>${serviceFee}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, color: "#1e293b", paddingTop: 10, borderTop: "1px solid #e2e8f0" }}>
                          <span>Total</span>
                          <span>${total}</span>
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
