"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User, Mail, Phone, MapPin, CalendarDays, Clock, Edit2,
  Search, Filter, ExternalLink, Star, LogOut, Home, CheckCircle
} from "lucide-react";
import { bookings } from "@/lib/mockData";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useAuth, getUserInitials } from "@/components/context/AuthContext";
// Assuming ReviewContext logic might be added later, commenting out for now if not available
// import { useReviews } from "@/components/context/ReviewContext";

// Check if checkout date has already passed
function isCheckoutPast(checkOutDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkout = new Date(checkOutDate);
  checkout.setHours(0, 0, 0, 0);
  return checkout < today;
}

export default function UserDashboard() {
  const { user, logout, isInitializing } = useAuth();
  const router = useRouter();
  // const { hasReview } = useReviews(); // Placeholder
  const hasReview = (id: number) => false; // Dummy implementation

  const [activeTab, setActiveTab] = useState<"bookings" | "profile">("bookings");
  const [cancelConfirm, setCancelConfirm] = useState<number | null>(null);

  // Use real user's bookings if found in mock data, otherwise show all guest bookings as demo
  const userBookings = bookings.filter(b =>
    user ? (b.guestName.toLowerCase().includes(user.name.split(" ")[0].toLowerCase()) || b.guestId === user.id) : b.guestId === 6
  );

  const [bookingList, setBookingList] = useState(userBookings.length > 0 ? userBookings : bookings.filter(b => b.guestId === 6));
  const [statusFilter, setStatusFilter] = useState("All");
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "Alice Johnson",
    email: user?.email || "alice@example.com",
    phone: "+1 (415) 555-0142",
    location: "San Francisco, CA",
    bio: "Passionate traveler exploring the world one homestay at a time. Love authentic local experiences.",
  });
  const [profileSaved, setProfileSaved] = useState(false);

  const filtered = statusFilter === "All" ? bookingList : bookingList.filter(b => b.status === statusFilter);

  const handleCancel = (id: number) => {
    setBookingList(prev => prev.map(b => b.id === id ? { ...b, status: "Cancelled" as const } : b));
    setCancelConfirm(null);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const displayName = user?.name || "Alice Johnson";
  const displayEmail = user?.email || "alice@example.com";
  const initials = getUserInitials(displayName);
  const memberSince = user?.joined ? new Date(user.joined).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "January 2024";

  useEffect(() => {
    if (!isInitializing && (!user || user.role !== "Guest")) {
      router.replace("/auth/login");
    }
  }, [isInitializing, router, user]);

  if (isInitializing || !user || user.role !== "Guest") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
        Checking user session...
      </div>
    );
  }

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "32px 0" }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 4, fontSize: "1.5rem" }}>My Dashboard</h1>
            <p style={{ color: "#64748b", margin: 0, fontSize: "0.88rem" }}>
              Welcome back, <strong>{displayName.split(" ")[0]}</strong>! Manage your bookings and account settings.
            </p>
          </div>
          <Link href="/listings">
            <button className="btn-primary-hs" style={{ fontSize: "0.87rem", display: "flex", alignItems: "center", gap: 6 }}>
              <Search size={14} /> Find a Stay
            </button>
          </Link>
        </div>

        <div className="row g-4">
          {/* Sidebar Profile */}
          <div className="col-lg-3 col-md-4">
            <div className="hs-card" style={{ padding: "28px 20px", textAlign: "center" }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: "linear-gradient(135deg, #2563EB, #7c3aed)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 14px", fontSize: "1.8rem", fontWeight: 800, color: "#fff"
              }}>
                {initials}
              </div>
              <h2 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 4, fontSize: "1.1rem" }}>{displayName}</h2>
              <p style={{ color: "#64748b", fontSize: "0.83rem", marginBottom: 14 }}>{displayEmail}</p>
              <span className="hs-badge hs-badge-guest" style={{ display: "inline-flex" }}>
                <User size={11} style={{ marginRight: 4 }} /> Guest
              </span>

              <div style={{ borderTop: "1px solid #e2e8f0", marginTop: 18, paddingTop: 18 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { icon: <Mail size={14} />, text: displayEmail },
                    { icon: <Phone size={14} />, text: "+1 (415) 555-0142" },
                    { icon: <MapPin size={14} />, text: "San Francisco, CA" },
                    { icon: <CalendarDays size={14} />, text: `Member since ${memberSince}` },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8rem", color: "#64748b" }}>
                      <span style={{ color: "#2563EB" }}>{item.icon}</span>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="btn-outline-hs"
                style={{ width: "100%", marginTop: 18, fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                onClick={() => setActiveTab("profile")}
              >
                <Edit2 size={13} /> Edit Profile
              </button>
            </div>

            {/* Quick Stats */}
            <div className="hs-card" style={{ padding: "18px 20px", marginTop: 16 }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 12 }}>My Stats</div>
              {[
                { label: "Total Bookings", value: bookingList.length, color: "#1e293b" },
                { label: "Confirmed", value: bookingList.filter(b => b.status === "Confirmed").length, color: "#16a34a" },
                { label: "Pending", value: bookingList.filter(b => b.status === "Pending").length, color: "#d97706" },
                { label: "Cancelled", value: bookingList.filter(b => b.status === "Cancelled").length, color: "#dc2626" },
              ].map((stat, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 3 ? "1px solid #f1f5f9" : "none" }}>
                  <span style={{ fontSize: "0.85rem", color: "#64748b" }}>{stat.label}</span>
                  <span style={{ fontWeight: 700, color: stat.color }}>{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="hs-card" style={{ padding: "18px 20px", marginTop: 16 }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 12 }}>Quick Actions</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Link href="/listings" style={{ textDecoration: "none" }}>
                  <button style={{ width: "100%", background: "#eff6ff", border: "none", borderRadius: 8, padding: "9px 14px", color: "#2563EB", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Home size={14} /> Browse Properties
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  style={{ width: "100%", background: "#fef2f2", border: "none", borderRadius: 8, padding: "9px 14px", color: "#dc2626", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9 col-md-8">
            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, marginBottom: 22, borderBottom: "1px solid #e2e8f0" }}>
              {[
                { id: "bookings" as const, label: "Booking History" },
                { id: "profile" as const, label: "Profile Settings" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    padding: "10px 18px", fontWeight: 700,
                    color: activeTab === tab.id ? "#2563EB" : "#64748b",
                    borderBottom: activeTab === tab.id ? "2px solid #2563EB" : "2px solid transparent",
                    fontSize: "0.92rem", transition: "all 0.15s", marginBottom: -1
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Bookings Tab */}
            {activeTab === "bookings" && (
              <div>
                {/* Filter Bar */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
                  <Filter size={15} color="#64748b" />
                  <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>Filter:</span>
                  {["All", "Confirmed", "Pending", "Cancelled"].map(status => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      style={{
                        padding: "5px 14px", borderRadius: 20, fontSize: "0.8rem",
                        border: `1.5px solid ${statusFilter === status ? "#2563EB" : "#e2e8f0"}`,
                        background: statusFilter === status ? "#eff6ff" : "#fff",
                        color: statusFilter === status ? "#2563EB" : "#64748b",
                        fontWeight: statusFilter === status ? 700 : 500, cursor: "pointer"
                      }}
                    >
                      {status}
                      {status !== "All" && (
                        <span style={{ marginLeft: 5, fontSize: "0.72rem", opacity: 0.7 }}>
                          ({bookingList.filter(b => b.status === status).length})
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Booking Table */}
                <div className="hs-card" style={{ overflow: "hidden" }}>
                  <div style={{ overflowX: "auto" }}>
                    <table className="hs-table">
                      <thead>
                        <tr>
                          <th>Property</th>
                          <th>Dates</th>
                          <th>Guests</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.length === 0 ? (
                          <tr>
                            <td colSpan={6} style={{ textAlign: "center", padding: "48px", color: "#94a3b8" }}>
                              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                                <CalendarDays size={32} color="#e2e8f0" />
                                <span>No bookings found</span>
                                <Link href="/listings">
                                  <button className="btn-primary-hs" style={{ fontSize: "0.82rem", marginTop: 8 }}>
                                    Find a Stay
                                  </button>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ) : filtered.map(booking => (
                          <tr key={booking.id}>
                            <td>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <img
                                  src={booking.propertyImage} alt=""
                                  style={{ width: 46, height: 46, borderRadius: 10, objectFit: "cover", flexShrink: 0 }}
                                />
                                <div>
                                  <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.87rem", maxWidth: 180, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {booking.propertyTitle}
                                  </div>
                                  <div style={{ color: "#94a3b8", fontSize: "0.76rem", display: "flex", alignItems: "center", gap: 3 }}>
                                    <MapPin size={10} /> {booking.propertyLocation}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div style={{ fontSize: "0.85rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#1e293b" }}>
                                  <CalendarDays size={12} color="#94a3b8" /> {booking.checkIn}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3, color: "#1e293b" }}>
                                  <Clock size={12} color="#94a3b8" /> {booking.checkOut}
                                </div>
                                <div style={{ color: "#64748b", fontSize: "0.76rem", marginTop: 2 }}>{booking.nights} nights</div>
                              </div>
                            </td>
                            <td style={{ fontSize: "0.87rem", color: "#475569" }}>
                              <User size={12} style={{ marginRight: 4, color: "#94a3b8" }} />{booking.guests}
                            </td>
                            <td>
                              <div style={{ fontWeight: 800, color: "#1e293b", fontSize: "0.95rem" }}>${booking.totalPrice}</div>
                              <div style={{ color: "#94a3b8", fontSize: "0.73rem" }}>${Math.round(booking.totalPrice / booking.nights)}/night</div>
                            </td>
                            <td><StatusBadge status={booking.status} /></td>
                            <td>
                              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                <Link href={`/listings/${booking.propertyId}`}>
                                  <button style={{ background: "#eff6ff", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: "0.78rem", color: "#2563EB", fontWeight: 600 }}>
                                    <ExternalLink size={12} /> View
                                  </button>
                                </Link>
                                {/* Review Button Logic */}
                                {booking.status === "Confirmed" && isCheckoutPast(booking.checkOut) && (
                                  hasReview(booking.id) ? (
                                    <button
                                      disabled
                                      style={{ background: "#f1f5f9", border: "none", borderRadius: 6, padding: "5px 10px", display: "flex", alignItems: "center", gap: 4, fontSize: "0.78rem", color: "#94a3b8", fontWeight: 600, cursor: "default" }}
                                    >
                                      <CheckCircle size={12} /> Reviewed ✔
                                    </button>
                                  ) : (
                                    <Link href={`/reviews/create/${booking.id}`}>
                                      <button style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 6, padding: "5px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: "0.78rem", color: "#16a34a", fontWeight: 700 }}>
                                        <Star size={12} fill="#16a34a" color="#16a34a" /> Write Review
                                      </button>
                                    </Link>
                                  )
                                )}
                                {booking.status !== "Cancelled" && cancelConfirm !== booking.id && (
                                  <button
                                    onClick={() => setCancelConfirm(booking.id)}
                                    style={{ background: "#fee2e2", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer", fontSize: "0.78rem", color: "#dc2626", fontWeight: 600 }}
                                  >
                                    Cancel
                                  </button>
                                )}
                                {cancelConfirm === booking.id && (
                                  <div style={{ display: "flex", gap: 4 }}>
                                    <button
                                      onClick={() => handleCancel(booking.id)}
                                      style={{ background: "#dc2626", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer", fontSize: "0.78rem", color: "#fff", fontWeight: 600 }}
                                    >
                                      Confirm
                                    </button>
                                    <button
                                      onClick={() => setCancelConfirm(null)}
                                      style={{ background: "#f1f5f9", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer", fontSize: "0.78rem", color: "#64748b" }}
                                    >
                                      No
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="hs-card" style={{ padding: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                  <div>
                    <h3 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 4, fontSize: "1.1rem" }}>Profile Information</h3>
                    <p style={{ color: "#64748b", margin: 0, fontSize: "0.85rem" }}>Update your personal details and preferences.</p>
                  </div>
                  {profileSaved && (
                    <div style={{ background: "#dcfce7", border: "1px solid #bbf7d0", borderRadius: 8, padding: "6px 14px", color: "#16a34a", fontSize: "0.82rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                      ✓ Changes saved!
                    </div>
                  )}
                </div>

                {/* Avatar */}
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28, padding: "20px", background: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%",
                    background: "linear-gradient(135deg, #2563EB, #7c3aed)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.6rem", fontWeight: 800, color: "#fff", flexShrink: 0
                  }}>
                    {getUserInitials(profileForm.name || displayName)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>{profileForm.name || displayName}</div>
                    <div style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: 10 }}>Guest Account</div>
                    <button className="btn-outline-hs" style={{ fontSize: "0.78rem", padding: "5px 14px" }}>
                      Change Photo
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSaveProfile}>
                  <div className="row g-3">
                    {[
                      { label: "Full Name", key: "name", placeholder: "Your full name" },
                      { label: "Email Address", key: "email", placeholder: "Your email", type: "email" },
                      { label: "Phone Number", key: "phone", placeholder: "Your phone number" },
                      { label: "Location", key: "location", placeholder: "Your city, country" },
                    ].map((field) => (
                      <div key={field.key} className="col-md-6">
                        <label className="hs-form-label">{field.label}</label>
                        <input
                          type={field.type || "text"}
                          className="hs-form-control"
                          value={profileForm[field.key as keyof typeof profileForm]}
                          placeholder={field.placeholder}
                          onChange={e => setProfileForm({ ...profileForm, [field.key]: e.target.value })}
                        />
                      </div>
                    ))}
                    <div className="col-12">
                      <label className="hs-form-label">Bio</label>
                      <textarea
                        className="hs-form-control"
                        rows={4}
                        value={profileForm.bio}
                        placeholder="Tell us about yourself..."
                        onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                        style={{ resize: "vertical" }}
                      />
                    </div>
                    <div className="col-12" style={{ paddingTop: 8, display: "flex", gap: 12 }}>
                      <button type="submit" className="btn-primary-hs">Save Changes</button>
                      <button type="button" className="btn-outline-hs" onClick={() => setActiveTab("bookings")}>Cancel</button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
