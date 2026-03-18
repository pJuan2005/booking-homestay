"use client";
// ============================================================
// TARGET: frontend/app/host/add-property/page.tsx
// ============================================================

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin, DollarSign, Users, FileText, Upload, CheckSquare,
  Image, CheckCircle, ArrowRight, ArrowLeft
} from "lucide-react";

const AMENITIES = [
  "WiFi", "Full Kitchen", "Air Conditioning", "Parking", "Pool",
  "Beachfront", "Fireplace", "Washer/Dryer", "Gym Access", "Hot Tub",
  "BBQ Grill", "Smart TV", "Workspace", "Elevator", "Breakfast Included",
  "Pet Friendly", "Sauna", "Mountain View", "City View", "Sea View",
];

const PROPERTY_TYPES = ["Villa", "Apartment", "Cabin", "Cottage", "Studio", "House", "Penthouse", "Bungalow"];

export default function AddPropertyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "", type: "Villa", address: "", city: "", country: "",
    price: "", description: "", maxGuests: "2", bedrooms: "1", bathrooms: "1",
    amenities: [] as string[],
    images: [] as File[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleAmenity = (a: string) => {
    setForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(a)
        ? prev.amenities.filter(x => x !== a)
        : [...prev.amenities, a]
    }));
  };

  const validateStep = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!form.title.trim()) e.title = "Title is required";
      if (!form.address.trim()) e.address = "Address is required";
      if (!form.city.trim()) e.city = "City is required";
      if (!form.country.trim()) e.country = "Country is required";
    }
    if (s === 2) {
      if (!form.price || isNaN(Number(form.price))) e.price = "Valid price is required";
      if (!form.description.trim() || form.description.length < 50) e.description = "Description must be at least 50 characters";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep(s => Math.min(s + 1, 4));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const steps = [
    { n: 1, label: "Basic Info" },
    { n: 2, label: "Details" },
    { n: 3, label: "Amenities" },
    { n: 4, label: "Photos" },
  ];

  if (submitted) {
    return (
      <div style={{ padding: "48px 28px", textAlign: "center" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <CheckCircle size={40} color="#16a34a" />
          </div>
          <h2 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 10 }}>Property Submitted!</h2>
          <p style={{ color: "#64748b", lineHeight: 1.7, marginBottom: 24 }}>
            Your property <strong>"{form.title || "New Property"}"</strong> has been submitted for review.
            Our team will approve it within 1–2 business days.
          </p>
          <div style={{ background: "#fef3c7", borderRadius: 10, padding: "14px 18px", marginBottom: 24, display: "flex", gap: 10, textAlign: "left" }}>
            <span style={{ fontSize: "1.2rem" }}>⏳</span>
            <div>
              <div style={{ fontWeight: 700, color: "#92400e", fontSize: "0.9rem" }}>Status: Pending Review</div>
              <div style={{ color: "#92400e", fontSize: "0.82rem", marginTop: 2 }}>You'll be notified once approved.</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button className="btn-primary-hs" onClick={() => router.push("/host/my-properties")} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              View My Properties <ArrowRight size={14} />
            </button>
            <button className="btn-outline-hs" onClick={() => { setSubmitted(false); setStep(1); setForm({ title: "", type: "Villa", address: "", city: "", country: "", price: "", description: "", maxGuests: "2", bedrooms: "1", bathrooms: "1", amenities: [], images: [] }); }}>
              Add Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "28px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 4, fontSize: "1.5rem" }}>Add New Property</h1>
        <p style={{ color: "#64748b", margin: 0 }}>Fill in the details to list your property</p>
      </div>

      {/* Stepper */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 32, overflowX: "auto", padding: "4px 0" }}>
        {steps.map((s, i) => (
          <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
              onClick={() => step > s.n && setStep(s.n)}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: step > s.n ? "#16a34a" : step === s.n ? "#2563EB" : "#e2e8f0",
                color: step >= s.n ? "#fff" : "#94a3b8",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: "0.9rem", transition: "all 0.2s"
              }}>
                {step > s.n ? <CheckCircle size={18} /> : s.n}
              </div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: step === s.n ? "#2563EB" : "#94a3b8", marginTop: 5, whiteSpace: "nowrap" }}>
                {s.label}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div style={{ height: 2, flex: 1, minWidth: 40, background: step > s.n ? "#16a34a" : "#e2e8f0", margin: "0 8px", transition: "all 0.2s", marginBottom: 18 }} />
            )}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 720 }}>
        <div className="hs-card" style={{ padding: "28px 32px" }}>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div>
              <h3 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 20, fontSize: "1.1rem", display: "flex", alignItems: "center", gap: 8 }}>
                <FileText size={18} color="#2563EB" /> Basic Information
              </h3>
              <div className="row g-3">
                <div className="col-12">
                  <label className="hs-form-label">Property Title *</label>
                  <input className="hs-form-control" placeholder="e.g. Cozy Beachside Villa with Pool"
                    value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                    style={{ borderColor: errors.title ? "#dc2626" : undefined }} />
                  {errors.title && <div style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4 }}>{errors.title}</div>}
                </div>
                <div className="col-md-6">
                  <label className="hs-form-label">Property Type *</label>
                  <select className="hs-form-control" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="hs-form-label">Price Per Night ($) *</label>
                  <div style={{ position: "relative" }}>
                    <DollarSign size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                    <input className="hs-form-control" placeholder="0" type="number" min="1"
                      style={{ paddingLeft: 34, borderColor: errors.price ? "#dc2626" : undefined }}
                      value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                  </div>
                </div>
                <div className="col-12">
                  <label className="hs-form-label">Street Address *</label>
                  <div style={{ position: "relative" }}>
                    <MapPin size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                    <input className="hs-form-control" placeholder="123 Beach Road"
                      style={{ paddingLeft: 34, borderColor: errors.address ? "#dc2626" : undefined }}
                      value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                  </div>
                  {errors.address && <div style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4 }}>{errors.address}</div>}
                </div>
                <div className="col-md-6">
                  <label className="hs-form-label">City *</label>
                  <input className="hs-form-control" placeholder="Bali"
                    style={{ borderColor: errors.city ? "#dc2626" : undefined }}
                    value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                  {errors.city && <div style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4 }}>{errors.city}</div>}
                </div>
                <div className="col-md-6">
                  <label className="hs-form-label">Country *</label>
                  <input className="hs-form-control" placeholder="Indonesia"
                    style={{ borderColor: errors.country ? "#dc2626" : undefined }}
                    value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
                  {errors.country && <div style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4 }}>{errors.country}</div>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div>
              <h3 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 20, fontSize: "1.1rem", display: "flex", alignItems: "center", gap: 8 }}>
                <Users size={18} color="#2563EB" /> Property Details
              </h3>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="hs-form-label">Max Guests</label>
                  <select className="hs-form-control" value={form.maxGuests} onChange={e => setForm({ ...form, maxGuests: e.target.value })}>
                    {[1,2,3,4,5,6,7,8,10,12].map(n => <option key={n} value={n}>{n} Guest{n>1?"s":""}</option>)}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="hs-form-label">Bedrooms</label>
                  <select className="hs-form-control" value={form.bedrooms} onChange={e => setForm({ ...form, bedrooms: e.target.value })}>
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="hs-form-label">Bathrooms</label>
                  <select className="hs-form-control" value={form.bathrooms} onChange={e => setForm({ ...form, bathrooms: e.target.value })}>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="col-12">
                  <label className="hs-form-label">Description *</label>
                  <textarea
                    className="hs-form-control"
                    rows={6}
                    placeholder="Describe your property in detail. Include the style, unique features, nearby attractions, and what makes it special. (Minimum 50 characters)"
                    style={{ resize: "vertical", borderColor: errors.description ? "#dc2626" : undefined }}
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                  />
                  {errors.description && <div style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4 }}>{errors.description}</div>}
                  <div style={{ textAlign: "right", fontSize: "0.75rem", color: "#94a3b8", marginTop: 4 }}>
                    {form.description.length} characters
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Amenities */}
          {step === 3 && (
            <div>
              <h3 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 8, fontSize: "1.1rem", display: "flex", alignItems: "center", gap: 8 }}>
                <CheckSquare size={18} color="#2563EB" /> Amenities
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.87rem", marginBottom: 20 }}>
                Select all amenities your property offers ({form.amenities.length} selected)
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
                {AMENITIES.map(a => {
                  const selected = form.amenities.includes(a);
                  return (
                    <label key={a} style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "10px 14px",
                      border: `1.5px solid ${selected ? "#2563EB" : "#e2e8f0"}`,
                      borderRadius: 8, cursor: "pointer", fontSize: "0.85rem",
                      background: selected ? "#eff6ff" : "#fff",
                      color: selected ? "#2563EB" : "#475569",
                      fontWeight: selected ? 600 : 400,
                      transition: "all 0.15s"
                    }}>
                      <input type="checkbox" checked={selected} onChange={() => toggleAmenity(a)}
                        style={{ accentColor: "#2563EB" }} />
                      {a}
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Photos */}
          {step === 4 && (
            <div>
              <h3 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 8, fontSize: "1.1rem", display: "flex", alignItems: "center", gap: 8 }}>
                <Image size={18} color="#2563EB" /> Upload Photos
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.87rem", marginBottom: 20 }}>
                Upload high-quality photos. The first image will be the main cover photo. (Max 10 photos)
              </p>

              <label style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                border: "2px dashed #bfdbfe", borderRadius: 12, padding: "48px 24px",
                cursor: "pointer", background: "#f8fafc", transition: "all 0.15s",
                marginBottom: 20
              }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <Upload size={24} color="#2563EB" />
                </div>
                <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>
                  Click to upload photos
                </div>
                <div style={{ color: "#94a3b8", fontSize: "0.82rem" }}>
                  PNG, JPG, WEBP up to 10MB each
                </div>
                <input type="file" multiple accept="image/*" style={{ display: "none" }}
                  onChange={e => setForm({ ...form, images: Array.from(e.target.files || []) })} />
              </label>

              {form.images.length > 0 && (
                <div>
                  <div style={{ fontWeight: 600, color: "#1e293b", marginBottom: 10, fontSize: "0.88rem" }}>
                    {form.images.length} photo{form.images.length > 1 ? "s" : ""} selected
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {Array.from(form.images).map((file, i) => (
                      <div key={i} style={{ padding: "6px 12px", background: "#eff6ff", borderRadius: 6, fontSize: "0.78rem", color: "#2563EB", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                        <Image size={12} /> {file.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ background: "#fef3c7", borderRadius: 10, padding: "12px 16px", marginTop: 16, fontSize: "0.82rem", color: "#92400e", display: "flex", gap: 8 }}>
                <span>📸</span>
                <div>Properties with 5+ professional photos receive <strong>3x more bookings</strong>. Good lighting and wide-angle shots work best.</div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, paddingTop: 20, borderTop: "1px solid #e2e8f0" }}>
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)} className="btn-outline-hs" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <ArrowLeft size={14} /> Previous
              </button>
            ) : <div />}

            {step < 4 ? (
              <button onClick={nextStep} className="btn-primary-hs" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                Next Step <ArrowRight size={14} />
              </button>
            ) : (
              <button onClick={handleSubmit} className="btn-primary-hs" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <CheckCircle size={16} /> Submit Property
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
