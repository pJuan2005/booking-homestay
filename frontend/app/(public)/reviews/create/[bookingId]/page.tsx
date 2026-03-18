"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Star, ArrowLeft, Send, CheckCircle, AlertTriangle,
  MapPin, CalendarDays, Home
} from "lucide-react";
import { bookings } from "@/lib/mockData";
import { useAuth, getUserInitials } from "@/components/context/AuthContext";
// import { useReviews } from "@/components/context/ReviewContext";

function StarRating({
  value,
  hovered,
  onHover,
  onLeave,
  onClick,
}: {
  value: number;
  hovered: number;
  onHover: (v: number) => void;
  onLeave: () => void;
  onClick: (v: number) => void;
}) {
  const labels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];
  const active = hovered || value;

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            onClick={() => onClick(n)}
            onMouseEnter={() => onHover(n)}
            onMouseLeave={onLeave}
            style={{
              background: "none",
              border: "none",
              padding: "2px",
              cursor: "pointer",
              transition: "transform 0.12s",
              transform: active >= n ? "scale(1.15)" : "scale(1)",
            }}
          >
            <Star
              size={36}
              fill={active >= n ? "#f59e0b" : "none"}
              color={active >= n ? "#f59e0b" : "#d1d5db"}
              style={{ transition: "all 0.12s" }}
            />
          </button>
        ))}
      </div>
      {active > 0 && (
        <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: "0.92rem" }}>
          {labels[active]}
        </span>
      )}
    </div>
  );
}

// Check if checkout date has already passed
function isCheckoutPast(checkOutDate: string): boolean {
  if(!checkOutDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkout = new Date(checkOutDate);
  checkout.setHours(0, 0, 0, 0);
  return checkout < today;
}

export default function WriteReviewPage() {
  const { bookingId } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  // Dummy Review Context actions for now
  const addReview = (r: any) => {};
  const hasReview = (id: number) => false;

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ rating?: string; comment?: string }>({});

  const bid = Number(bookingId);
  const booking = bookings.find(b => b.id === bid);

  // --- Eligibility Checks ---
  if (!booking) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <div className="hs-card" style={{ padding: "48px 36px", textAlign: "center", maxWidth: 420 }}>
          <AlertTriangle size={48} color="#f59e0b" style={{ marginBottom: 16 }} />
          <h2 style={{ color: "#1e293b", fontWeight: 700, marginBottom: 8 }}>Booking Not Found</h2>
          <p style={{ color: "#64748b", marginBottom: 24 }}>We couldn't find this booking. Please check your booking history.</p>
          <Link href="/dashboard"><button className="btn-primary-hs">Go to Dashboard</button></Link>
        </div>
      </div>
    );
  }

  if (booking.status !== "Confirmed") {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <div className="hs-card" style={{ padding: "48px 36px", textAlign: "center", maxWidth: 420 }}>
          <AlertTriangle size={48} color="#f59e0b" style={{ marginBottom: 16 }} />
          <h2 style={{ color: "#1e293b", fontWeight: 700, marginBottom: 8 }}>Not Eligible to Review</h2>
          <p style={{ color: "#64748b", marginBottom: 24 }}>
            Reviews can only be written for <strong>Confirmed</strong> bookings. This booking status is <strong>{booking.status}</strong>.
          </p>
          <Link href="/dashboard"><button className="btn-primary-hs">Back to Dashboard</button></Link>
        </div>
      </div>
    );
  }

  if (!isCheckoutPast(booking.checkOut)) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <div className="hs-card" style={{ padding: "48px 36px", textAlign: "center", maxWidth: 420 }}>
          <CalendarDays size={48} color="#2563EB" style={{ marginBottom: 16 }} />
          <h2 style={{ color: "#1e293b", fontWeight: 700, marginBottom: 8 }}>Your Stay Hasn't Ended Yet</h2>
          <p style={{ color: "#64748b", marginBottom: 24 }}>
            You can write a review after your checkout date: <strong>{booking.checkOut}</strong>.
          </p>
          <Link href="/dashboard"><button className="btn-primary-hs">Back to Dashboard</button></Link>
        </div>
      </div>
    );
  }

  if (hasReview(bid)) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <div className="hs-card" style={{ padding: "48px 36px", textAlign: "center", maxWidth: 420 }}>
          <CheckCircle size={48} color="#16a34a" style={{ marginBottom: 16 }} />
          <h2 style={{ color: "#1e293b", fontWeight: 700, marginBottom: 8 }}>Already Reviewed</h2>
          <p style={{ color: "#64748b", marginBottom: 24 }}>
            You've already submitted a review for this stay. Thank you for your feedback!
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/dashboard"><button className="btn-primary-hs">My Dashboard</button></Link>
            <Link href={`/listings/${booking.propertyId}`}><button className="btn-outline-hs">View Property</button></Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!rating) newErrors.rating = "Please select a star rating.";
    if (!comment.trim()) newErrors.comment = "Please write a comment.";
    else if (comment.trim().length < 10) newErrors.comment = "Comment must be at least 10 characters.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const authorName = user ? `${user.name.split(" ")[0]} ${user.name.split(" ").slice(-1)[0]?.[0] || ""}.` : "Guest";
    addReview({
      bookingId: bid,
      propertyId: booking.propertyId,
      guestId: user?.id || 0,
      authorName,
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split("T")[0],
    });
    setSubmitted(true);
  };

  const displayName = user?.name || "Guest";
  const initials = getUserInitials(displayName);

  if (submitted) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <div className="hs-card" style={{ padding: "52px 40px", textAlign: "center", maxWidth: 460 }}>
          <div style={{ fontSize: "3.5rem", marginBottom: 16 }}>🎉</div>
          <h2 style={{ color: "#16a34a", fontWeight: 800, marginBottom: 8, fontSize: "1.5rem" }}>Review Submitted!</h2>
          <p style={{ color: "#475569", marginBottom: 8 }}>
            Thank you for reviewing <strong>{booking.propertyTitle}</strong>.
          </p>
          <div style={{ display: "flex", gap: 3, justifyContent: "center", marginBottom: 24 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={22}
                fill={i < rating ? "#f59e0b" : "none"}
                color={i < rating ? "#f59e0b" : "#e2e8f0"}
              />
            ))}
          </div>
          <p style={{ color: "#64748b", fontSize: "0.88rem", marginBottom: 28, background: "#f8fafc", padding: "12px 16px", borderRadius: 10, fontStyle: "italic", border: "1px solid #e2e8f0" }}>
            "{comment}"
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/dashboard">
              <button className="btn-primary-hs">Back to Dashboard</button>
            </Link>
            <Link href={`/listings/${booking.propertyId}`}>
              <button className="btn-outline-hs">View Property</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "32px 0" }}>
      <div className="container" style={{ maxWidth: 720 }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 8, fontSize: "0.84rem" }}>
          <button
            onClick={() => router.back()}
            style={{ background: "none", border: "none", color: "#2563EB", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: 0, fontWeight: 600 }}
          >
            <ArrowLeft size={14} /> Back
          </button>
          <span style={{ color: "#94a3b8" }}>/</span>
          <Link href="/dashboard" style={{ color: "#64748b", textDecoration: "none" }}>Dashboard</Link>
          <span style={{ color: "#94a3b8" }}>/</span>
          <span style={{ color: "#1e293b", fontWeight: 600 }}>Write a Review</span>
        </div>

        {/* Page Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontWeight: 800, color: "#1e293b", fontSize: "1.6rem", marginBottom: 4 }}>
            ✍️ Write a Review
          </h1>
          <p style={{ color: "#64748b", margin: 0, fontSize: "0.88rem" }}>
            Share your experience to help other travelers make informed decisions.
          </p>
        </div>

        {/* Property Info Card */}
        <div className="hs-card" style={{ padding: "18px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
          <img
            src={booking.propertyImage}
            alt={booking.propertyTitle}
            style={{ width: 72, height: 72, borderRadius: 12, objectFit: "cover", flexShrink: 0 }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.95rem", marginBottom: 4 }}>
              {booking.propertyTitle}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#64748b", fontSize: "0.82rem", marginBottom: 6 }}>
              <MapPin size={12} color="#2563EB" /> {booking.propertyLocation}
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.78rem", color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}>
                <CalendarDays size={11} color="#94a3b8" />
                {booking.checkIn} → {booking.checkOut}
              </span>
              <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
                {booking.nights} nights · {booking.guests} guest{booking.guests > 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <span style={{
              background: "#dcfce7", color: "#16a34a",
              fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: 20
            }}>
              ✓ Confirmed
            </span>
            <span style={{ fontWeight: 800, color: "#1e293b", fontSize: "0.95rem" }}>${booking.totalPrice}</span>
          </div>
        </div>

        {/* Review Form Card */}
        <div className="hs-card" style={{ padding: "32px" }}>
          {/* Author Info */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28, padding: "16px 18px", background: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0" }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "linear-gradient(135deg, #2563EB, #7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem", fontWeight: 800, color: "#fff", flexShrink: 0
            }}>
              {initials}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.92rem" }}>Reviewing as {displayName}</div>
              <div style={{ color: "#64748b", fontSize: "0.8rem" }}>Guest · Verified Booking</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <span style={{ background: "#eff6ff", color: "#2563EB", fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "flex", alignItems: "center", gap: 4 }}>
                <Home size={11} /> Verified Stay
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Star Rating */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontWeight: 700, color: "#1e293b", marginBottom: 12, fontSize: "0.95rem" }}>
                Overall Rating <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <StarRating
                value={rating}
                hovered={hovered}
                onHover={setHovered}
                onLeave={() => setHovered(0)}
                onClick={(v) => {
                  setRating(v);
                  setErrors(prev => ({ ...prev, rating: undefined }));
                }}
              />
              {errors.rating && (
                <div style={{ marginTop: 8, color: "#dc2626", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 4 }}>
                  <AlertTriangle size={13} /> {errors.rating}
                </div>
              )}
            </div>

            {/* Category Ratings (decorative) */}
            <div style={{ marginBottom: 28, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
              {[
                { label: "Cleanliness", defaultRating: 5 },
                { label: "Location", defaultRating: 5 },
                { label: "Communication", defaultRating: 4 },
                { label: "Value for Money", defaultRating: 4 },
              ].map((cat) => (
                <div key={cat.label} style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 14px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#64748b", marginBottom: 6 }}>{cat.label}</div>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[1, 2, 3, 4, 5].map(n => (
                      <Star
                        key={n}
                        size={14}
                        fill={n <= (rating || cat.defaultRating) ? "#f59e0b" : "none"}
                        color={n <= (rating || cat.defaultRating) ? "#f59e0b" : "#d1d5db"}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Comment */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontWeight: 700, color: "#1e293b", marginBottom: 8, fontSize: "0.95rem" }}>
                Your Review <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <textarea
                className="hs-form-control"
                rows={5}
                placeholder="Tell us about your experience — the property, host, location, and anything that stood out..."
                value={comment}
                onChange={e => {
                  setComment(e.target.value);
                  if (e.target.value.trim().length >= 10) {
                    setErrors(prev => ({ ...prev, comment: undefined }));
                  }
                }}
                style={{
                  resize: "vertical",
                  border: errors.comment ? "1.5px solid #dc2626" : undefined,
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                {errors.comment ? (
                  <span style={{ color: "#dc2626", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 4 }}>
                    <AlertTriangle size={13} /> {errors.comment}
                  </span>
                ) : (
                  <span style={{ color: "#94a3b8", fontSize: "0.78rem" }}>Minimum 10 characters</span>
                )}
                <span style={{ color: comment.length < 10 ? "#94a3b8" : "#16a34a", fontSize: "0.78rem", fontWeight: 600 }}>
                  {comment.length} chars
                </span>
              </div>
            </div>

            {/* Guidelines */}
            <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "12px 16px", marginBottom: 24 }}>
              <div style={{ fontWeight: 700, color: "#92400e", fontSize: "0.82rem", marginBottom: 6 }}>📋 Review Guidelines</div>
              <ul style={{ margin: 0, paddingLeft: 16, color: "#78350f", fontSize: "0.79rem", lineHeight: 1.7 }}>
                <li>Be honest and share your genuine experience</li>
                <li>Focus on the property, amenities, and host communication</li>
                <li>Avoid personal attacks or inappropriate language</li>
                <li>Reviews are submitted once and cannot be changed after 24 hours</li>
              </ul>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                type="submit"
                className="btn-primary-hs"
                style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.95rem" }}
              >
                <Send size={15} /> Submit Review
              </button>
              <button
                type="button"
                className="btn-outline-hs"
                onClick={() => router.push("/dashboard")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
