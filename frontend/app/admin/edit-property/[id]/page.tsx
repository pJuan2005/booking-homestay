"use client";
import { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Save, X, Home, MapPin, DollarSign, Users,
  Tag, FileText, ImagePlus, CheckSquare, Shield, UploadCloud,
  AlertCircle, CheckCircle2
} from "lucide-react";
import { properties as initialProperties, Property } from "@/lib/mockData";

const AMENITY_LIST = [
  "WiFi", "Private Pool", "Full Kitchen", "Air Conditioning", "Parking",
  "Beach Access", "Outdoor Shower", "BBQ Grill", "Fireplace", "Heating",
  "Mountain View", "Hiking Trails", "Hot Tub", "City View", "Gym Access",
  "Washer/Dryer", "Doorman", "Smart TV", "Workspace", "Infinity Pool",
  "Beachfront", "Personal Concierge", "Chef on Request", "Spa", "Sauna",
  "Forest View", "Kayaks", "Bikes", "Balcony", "Kitchenette",
  "Rice Terrace View", "Breakfast Included", "Yoga Deck", "Eco Design",
  "Bike Rental", "Cultural Tours", "Rooftop Terrace", "Concierge",
  "Home Theater", "24/7 Support", "Self Check-in", "City Access",
  "Elevator", "Washer"
];

const PROPERTY_TYPES = ["Villa", "Cabin", "Apartment", "Cottage", "Studio", "House", "Penthouse", "Guesthouse", "Bungalow"];

type FormStatus = "idle" | "saving" | "success" | "error";

export default function AdminEditPropertyPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const property = initialProperties.find(p => p.id === Number(id));

  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [previewImages, setPreviewImages] = useState<string[]>(property?.images || []);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  const [form, setForm] = useState<Omit<Property, "id" | "hostId" | "hostName" | "rating" | "reviews" | "featured" | "images" | "image">>({
    title: property?.title || "",
    location: property?.location || "",
    city: property?.city || "",
    country: property?.country || "",
    price: property?.price || 0,
    type: property?.type || "Villa",
    description: property?.description || "",
    amenities: property?.amenities || [],
    maxGuests: property?.maxGuests || 1,
    bedrooms: property?.bedrooms || 1,
    bathrooms: property?.bathrooms || 1,
    status: property?.status || "Pending",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!property) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <AlertCircle size={48} color="#dc2626" style={{ marginBottom: 12 }} />
        <h4 style={{ color: "#1e293b" }}>Property Not Found</h4>
        <p style={{ color: "#64748b" }}>The property with ID <strong>{id || "unknown"}</strong> does not exist.</p>
        <Link href="/admin/properties-manage">
          <button style={{
            marginTop: 12, padding: "10px 24px", borderRadius: 8,
            background: "#2563EB", color: "#fff", border: "none", cursor: "pointer", fontWeight: 700
          }}>
            ← Back to Properties
          </button>
        </Link>
      </div>
    );
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Property name is required.";
    if (!form.location.trim()) e.location = "Address is required.";
    if (!form.city.trim()) e.city = "City is required.";
    if (!form.country.trim()) e.country = "Country is required.";
    if (!form.price || form.price <= 0) e.price = "Price must be greater than 0.";
    if (!form.description.trim()) e.description = "Description is required.";
    if (form.maxGuests < 1) e.maxGuests = "At least 1 guest required.";
    return e;
  };

  const handleChange = (field: string, value: string | number | string[]) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const toggleAmenity = (amenity: string) => {
    setForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        setNewImagePreviews(prev => [...prev, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeExistingImage = (src: string) => {
    setPreviewImages(prev => prev.filter(img => img !== src));
    setRemovedImages(prev => [...prev, src]);
  };

  const removeNewImage = (index: number) => {
    setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setFormStatus("saving");
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => router.push("/admin/properties-manage"), 1800);
    }, 1200);
  };

  const inputStyle = (field?: string): React.CSSProperties => ({
    width: "100%",
    padding: "9px 13px",
    border: `1.5px solid ${field && errors[field] ? "#dc2626" : "#e2e8f0"}`,
    borderRadius: 8,
    fontSize: "0.9rem",
    color: "#1e293b",
    background: "#f8fafc",
    outline: "none",
    transition: "border 0.2s",
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontWeight: 700,
    color: "#374151",
    fontSize: "0.84rem",
    marginBottom: 5,
  };

  const cardStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    marginBottom: 20,
    overflow: "hidden",
  };

  const cardHeaderStyle: React.CSSProperties = {
    padding: "14px 20px",
    borderBottom: "1px solid #f1f5f9",
    background: "linear-gradient(135deg, #f8fafc, #eff6ff)",
    display: "flex",
    alignItems: "center",
    gap: 8,
  };

  const cardBodyStyle: React.CSSProperties = {
    padding: "20px",
  };

  const statusColors: Record<string, { bg: string; color: string; border: string }> = {
    Approved: { bg: "#dcfce7", color: "#16a34a", border: "#86efac" },
    Pending:  { bg: "#fef3c7", color: "#d97706", border: "#fcd34d" },
    Rejected: { bg: "#fee2e2", color: "#dc2626", border: "#fca5a5" },
  };

  const currentStatus = statusColors[form.status] || statusColors.Pending;

  return (
    <div style={{ padding: "24px", maxWidth: 1100, margin: "0 auto" }}>

      {/* ── Page Header ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
        <Link href="/admin/properties-manage" style={{ textDecoration: "none" }}>
          <button style={{
            padding: "8px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0",
            background: "#fff", cursor: "pointer", display: "flex", alignItems: "center",
            gap: 6, color: "#64748b", fontWeight: 600, fontSize: "0.85rem"
          }}>
            <ArrowLeft size={15} /> Back
          </button>
        </Link>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.75rem", color: "#94a3b8", marginBottom: 2 }}>
            <Shield size={12} color="#2563EB" />
            <span>Admin Panel</span>
            <span>/</span>
            <Link href="/admin/properties-manage" style={{ color: "#2563EB", textDecoration: "none" }}>Manage Properties</Link>
            <span>/</span>
            <span style={{ color: "#64748b" }}>Edit Property</span>
          </div>
          <h1 style={{ fontWeight: 800, color: "#1e293b", margin: 0, fontSize: "1.45rem" }}>
            Edit Property
          </h1>
          <p style={{ color: "#64748b", margin: 0, fontSize: "0.85rem" }}>
            ID #{property.id} — <strong>{property.title}</strong>
          </p>
        </div>

        {/* Current Status Badge */}
        <div style={{
          padding: "6px 16px", borderRadius: 20,
          background: currentStatus.bg, border: `1.5px solid ${currentStatus.border}`,
          color: currentStatus.color, fontWeight: 700, fontSize: "0.82rem",
          display: "flex", alignItems: "center", gap: 5
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: currentStatus.color, display: "inline-block" }} />
          {form.status}
        </div>
      </div>

      {/* ── Success Banner ── */}
      {formStatus === "success" && (
        <div style={{
          background: "#dcfce7", border: "1.5px solid #86efac", borderRadius: 10,
          padding: "14px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10
        }}>
          <CheckCircle2 size={20} color="#16a34a" />
          <div>
            <div style={{ fontWeight: 700, color: "#15803d" }}>Changes Saved Successfully!</div>
            <div style={{ fontSize: "0.82rem", color: "#16a34a" }}>Redirecting to Manage Properties...</div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-4">

          {/* ═══ LEFT COLUMN ═══ */}
          <div className="col-12 col-lg-8">

            {/* ── Basic Info Card ── */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <Home size={16} color="#2563EB" />
                <span style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.92rem" }}>Basic Information</span>
              </div>
              <div style={cardBodyStyle}>
                <div className="row g-3">

                  <div className="col-12">
                    <label style={labelStyle}>
                      Property Name <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      style={inputStyle("title")}
                      value={form.title}
                      onChange={e => handleChange("title", e.target.value)}
                      placeholder="e.g. Tropical Villa with Private Pool"
                    />
                    {errors.title && <div style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4 }}>{errors.title}</div>}
                  </div>

                  <div className="col-12">
                    <label style={labelStyle}>
                      <MapPin size={13} style={{ marginRight: 4 }} />
                      Full Address <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      style={inputStyle("location")}
                      value={form.location}
                      onChange={e => handleChange("location", e.target.value)}
                      placeholder="e.g. Seminyak, Bali, Indonesia"
                    />
                    {errors.location && <div style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4 }}>{errors.location}</div>}
                  </div>

                  <div className="col-6">
                    <label style={labelStyle}>City <span style={{ color: "#dc2626" }}>*</span></label>
                    <input
                      type="text"
                      style={inputStyle("city")}
                      value={form.city}
                      onChange={e => handleChange("city", e.target.value)}
                      placeholder="e.g. Bali"
                    />
                    {errors.city && <div style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4 }}>{errors.city}</div>}
                  </div>

                  <div className="col-6">
                    <label style={labelStyle}>Country <span style={{ color: "#dc2626" }}>*</span></label>
                    <input
                      type="text"
                      style={inputStyle("country")}
                      value={form.country}
                      onChange={e => handleChange("country", e.target.value)}
                      placeholder="e.g. Indonesia"
                    />
                    {errors.country && <div style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4 }}>{errors.country}</div>}
                  </div>

                  <div className="col-6 col-sm-4">
                    <label style={labelStyle}>
                      <DollarSign size={13} style={{ marginRight: 3 }} />
                      Price / Night <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <span style={{
                        position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                        color: "#94a3b8", fontWeight: 700, fontSize: "0.9rem"
                      }}>$</span>
                      <input
                        type="number"
                        min={1}
                        style={{ ...inputStyle("price"), paddingLeft: 26 }}
                        value={form.price}
                        onChange={e => handleChange("price", Number(e.target.value))}
                      />
                    </div>
                    {errors.price && <div style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4 }}>{errors.price}</div>}
                  </div>

                  <div className="col-6 col-sm-4">
                    <label style={labelStyle}>
                      <Tag size={13} style={{ marginRight: 3 }} />
                      Property Type
                    </label>
                    <select
                      style={{ ...inputStyle(), cursor: "pointer" }}
                      value={form.type}
                      onChange={e => handleChange("type", e.target.value)}
                    >
                      {PROPERTY_TYPES.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-6 col-sm-4">
                    <label style={labelStyle}>
                      <Users size={13} style={{ marginRight: 3 }} />
                      Max Guests <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      style={inputStyle("maxGuests")}
                      value={form.maxGuests}
                      onChange={e => handleChange("maxGuests", Number(e.target.value))}
                    />
                    {errors.maxGuests && <div style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4 }}>{errors.maxGuests}</div>}
                  </div>

                  <div className="col-6">
                    <label style={labelStyle}>Bedrooms</label>
                    <input
                      type="number"
                      min={0}
                      max={20}
                      style={inputStyle()}
                      value={form.bedrooms}
                      onChange={e => handleChange("bedrooms", Number(e.target.value))}
                    />
                  </div>

                  <div className="col-6">
                    <label style={labelStyle}>Bathrooms</label>
                    <input
                      type="number"
                      min={0}
                      max={20}
                      style={inputStyle()}
                      value={form.bathrooms}
                      onChange={e => handleChange("bathrooms", Number(e.target.value))}
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* ── Description Card ── */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <FileText size={16} color="#2563EB" />
                <span style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.92rem" }}>Property Description</span>
              </div>
              <div style={cardBodyStyle}>
                <label style={labelStyle}>
                  Description <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <textarea
                  rows={6}
                  style={{ ...inputStyle("description"), resize: "vertical", lineHeight: 1.7 }}
                  value={form.description}
                  onChange={e => handleChange("description", e.target.value)}
                  placeholder="Describe the property in detail..."
                />
                {errors.description && <div style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4 }}>{errors.description}</div>}
                <div style={{ textAlign: "right", fontSize: "0.78rem", color: "#94a3b8", marginTop: 4 }}>
                  {form.description.length} characters
                </div>
              </div>
            </div>

            {/* ── Amenities Card ── */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <CheckSquare size={16} color="#2563EB" />
                <span style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.92rem" }}>Amenities</span>
                <span style={{
                  marginLeft: "auto", background: "#eff6ff", color: "#2563EB",
                  borderRadius: 20, padding: "2px 10px", fontSize: "0.75rem", fontWeight: 700
                }}>
                  {form.amenities.length} selected
                </span>
              </div>
              <div style={cardBodyStyle}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: "8px 12px"
                }}>
                  {AMENITY_LIST.map(amenity => {
                    const checked = form.amenities.includes(amenity);
                    return (
                      <label
                        key={amenity}
                        style={{
                          display: "flex", alignItems: "center", gap: 8,
                          padding: "8px 12px", borderRadius: 8, cursor: "pointer",
                          border: `1.5px solid ${checked ? "#93c5fd" : "#e2e8f0"}`,
                          background: checked ? "#eff6ff" : "#f8fafc",
                          transition: "all 0.15s", userSelect: "none"
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAmenity(amenity)}
                          style={{ accentColor: "#2563EB", width: 14, height: 14, cursor: "pointer" }}
                        />
                        <span style={{
                          fontSize: "0.82rem", fontWeight: checked ? 700 : 500,
                          color: checked ? "#1d4ed8" : "#475569"
                        }}>
                          {amenity}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Images Card ── */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <ImagePlus size={16} color="#2563EB" />
                <span style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.92rem" }}>Property Images</span>
              </div>
              <div style={cardBodyStyle}>

                {/* Existing images */}
                {previewImages.length > 0 && (
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontWeight: 600, color: "#374151", fontSize: "0.83rem", marginBottom: 10 }}>
                      Current Images ({previewImages.length})
                    </div>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                      gap: 10
                    }}>
                      {previewImages.map((src, idx) => (
                        <div key={idx} style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: "2px solid #e2e8f0" }}>
                          <img
                            src={src}
                            alt={`img-${idx}`}
                            style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }}
                          />
                          {idx === 0 && (
                            <div style={{
                              position: "absolute", top: 6, left: 6,
                              background: "#2563EB", color: "#fff",
                              fontSize: "0.68rem", fontWeight: 700,
                              padding: "2px 7px", borderRadius: 10
                            }}>
                              Main
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeExistingImage(src)}
                            style={{
                              position: "absolute", top: 6, right: 6,
                              width: 22, height: 22, borderRadius: "50%",
                              background: "#dc2626", border: "none", color: "#fff",
                              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
                            }}
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New images */}
                {newImagePreviews.length > 0 && (
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontWeight: 600, color: "#374151", fontSize: "0.83rem", marginBottom: 10 }}>
                      New Images to Upload ({newImagePreviews.length})
                    </div>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                      gap: 10
                    }}>
                      {newImagePreviews.map((src, idx) => (
                        <div key={idx} style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: "2px dashed #93c5fd" }}>
                          <img
                            src={src}
                            alt={`new-${idx}`}
                            style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }}
                          />
                          <div style={{
                            position: "absolute", top: 6, left: 6,
                            background: "#16a34a", color: "#fff",
                            fontSize: "0.68rem", fontWeight: 700,
                            padding: "2px 7px", borderRadius: 10
                          }}>
                            New
                          </div>
                          <button
                            type="button"
                            onClick={() => removeNewImage(idx)}
                            style={{
                              position: "absolute", top: 6, right: 6,
                              width: 22, height: 22, borderRadius: "50%",
                              background: "#dc2626", border: "none", color: "#fff",
                              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
                            }}
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: "2px dashed #93c5fd",
                    borderRadius: 10,
                    padding: "28px 20px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: "#f0f9ff",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#e0f2fe")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#f0f9ff")}
                >
                  <UploadCloud size={32} color="#60a5fa" style={{ marginBottom: 8 }} />
                  <div style={{ fontWeight: 700, color: "#1d4ed8", fontSize: "0.9rem" }}>
                    Click to Upload New Images
                  </div>
                  <div style={{ color: "#64748b", fontSize: "0.78rem", marginTop: 4 }}>
                    PNG, JPG, WEBP — max 5MB each
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* ═══ RIGHT COLUMN ═══ */}
          <div className="col-12 col-lg-4">

            {/* ── Status & Actions Card ── */}
            <div style={{ ...cardStyle, position: "sticky", top: 20 }}>
              <div style={cardHeaderStyle}>
                <Shield size={16} color="#2563EB" />
                <span style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.92rem" }}>Status & Actions</span>
              </div>
              <div style={cardBodyStyle}>

                {/* Status selector */}
                <label style={labelStyle}>Listing Status</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                  {(["Approved", "Pending", "Rejected"] as const).map(s => {
                    const sc = statusColors[s];
                    const isSelected = form.status === s;
                    return (
                      <label
                        key={s}
                        style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "10px 14px", borderRadius: 8, cursor: "pointer",
                          border: `1.5px solid ${isSelected ? sc.border : "#e2e8f0"}`,
                          background: isSelected ? sc.bg : "#f8fafc",
                          transition: "all 0.15s"
                        }}
                      >
                        <input
                          type="radio"
                          name="status"
                          value={s}
                          checked={isSelected}
                          onChange={() => handleChange("status", s)}
                          style={{ accentColor: sc.color, width: 15, height: 15 }}
                        />
                        <div>
                          <div style={{
                            fontWeight: 700, fontSize: "0.84rem",
                            color: isSelected ? sc.color : "#374151"
                          }}>{s}</div>
                          <div style={{ fontSize: "0.73rem", color: "#94a3b8" }}>
                            {s === "Approved" && "Property is live and bookable"}
                            {s === "Pending" && "Awaiting admin review"}
                            {s === "Rejected" && "Not visible to guests"}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <button
                  type="submit"
                  disabled={formStatus === "saving" || formStatus === "success"}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: 9,
                    border: "none",
                    background: formStatus === "success"
                      ? "linear-gradient(135deg, #16a34a, #15803d)"
                      : "linear-gradient(135deg, #2563EB, #1d4ed8)",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    cursor: formStatus === "saving" ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginBottom: 10,
                    transition: "opacity 0.2s",
                    opacity: formStatus === "saving" ? 0.8 : 1,
                  }}
                >
                  {formStatus === "saving" ? (
                    <>
                      <span
                        style={{
                          width: 16, height: 16, border: "2.5px solid rgba(255,255,255,0.4)",
                          borderTopColor: "#fff", borderRadius: "50%",
                          animation: "spin 0.7s linear infinite", display: "inline-block"
                        }}
                      />
                      Saving Changes...
                    </>
                  ) : formStatus === "success" ? (
                    <><CheckCircle2 size={16} /> Saved!</>
                  ) : (
                    <><Save size={16} /> Save Changes</>
                  )}
                </button>

                <Link href="/admin/properties-manage" style={{ display: "block", textDecoration: "none" }}>
                  <button
                    type="button"
                    style={{
                      width: "100%",
                      padding: "11px",
                      borderRadius: 9,
                      border: "1.5px solid #e2e8f0",
                      background: "#fff",
                      color: "#64748b",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 7,
                    }}
                  >
                    <X size={15} /> Cancel
                  </button>
                </Link>
              </div>
            </div>

            {/* ── Property Snapshot ── */}
            <div style={{ ...cardStyle, marginTop: 20 }}>
              <div style={cardHeaderStyle}>
                <Home size={16} color="#7c3aed" />
                <span style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.92rem" }}>Property Snapshot</span>
              </div>
              <div style={{ padding: 0 }}>
                <img
                  src={property.image}
                  alt={property.title}
                  style={{ width: "100%", height: 150, objectFit: "cover" }}
                />
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: 6 }}>Original data (read-only)</div>
                  {[
                    { label: "Host", value: property.hostName },
                    { label: "Rating", value: `⭐ ${property.rating} (${property.reviews} reviews)` },
                    { label: "Bedrooms", value: `${property.bedrooms} bed · ${property.bathrooms} bath` },
                    { label: "Status", value: property.status },
                  ].map(r => (
                    <div key={r.label} style={{
                      display: "flex", justifyContent: "space-between",
                      padding: "5px 0", borderBottom: "1px solid #f1f5f9",
                      fontSize: "0.82rem"
                    }}>
                      <span style={{ color: "#64748b" }}>{r.label}</span>
                      <span style={{ fontWeight: 600, color: "#1e293b" }}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </form>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus, select:focus, textarea:focus {
          border-color: #2563EB !important;
          background: #fff !important;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
        }
      `}</style>
    </div>
  );
}
