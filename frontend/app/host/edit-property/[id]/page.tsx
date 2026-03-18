"use client";
// ============================================================
// TARGET: frontend/app/host/edit-property/[id]/page.tsx
// ============================================================

import { useState, useRef, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Save, X, Home, MapPin, DollarSign, Users,
  Bed, Bath, FileText, CheckSquare, Image, Upload, Trash2,
  AlertTriangle, Info, ChevronRight, Eye, Check,
  RefreshCw, ShieldAlert
} from "lucide-react";
import { properties } from "@/lib/mockData";

// ─── Constants ───────────────────────────────────────────────────────────────

const PROPERTY_TYPES = [
  "Villa", "Apartment", "Cabin", "Cottage",
  "Studio", "House", "Penthouse", "Bungalow",
];

const ALL_AMENITIES = [
  { key: "WiFi",              icon: "📶", label: "WiFi" },
  { key: "Parking",           icon: "🅿️", label: "Parking" },
  { key: "Air Conditioning",  icon: "❄️", label: "Air Conditioning" },
  { key: "Private Pool",      icon: "🏊", label: "Private Pool" },
  { key: "Full Kitchen",      icon: "🍳", label: "Full Kitchen" },
  { key: "Smart TV",          icon: "📺", label: "Smart TV" },
  { key: "Fireplace",         icon: "🔥", label: "Fireplace" },
  { key: "Hot Tub",           icon: "♨️", label: "Hot Tub" },
  { key: "BBQ Grill",         icon: "🍖", label: "BBQ Grill" },
  { key: "Gym Access",        icon: "🏋️", label: "Gym Access" },
  { key: "Washer/Dryer",      icon: "🫧", label: "Washer/Dryer" },
  { key: "Workspace",         icon: "💼", label: "Workspace" },
  { key: "Beach Access",      icon: "🏖️", label: "Beach Access" },
  { key: "Mountain View",     icon: "⛰️", label: "Mountain View" },
  { key: "Forest View",       icon: "🌲", label: "Forest View" },
  { key: "City View",         icon: "🏙️", label: "City View" },
  { key: "Sauna",             icon: "🧖", label: "Sauna" },
  { key: "Elevator",          icon: "🛗", label: "Elevator" },
  { key: "Heating",           icon: "🌡️", label: "Heating" },
  { key: "Pet Friendly",      icon: "🐾", label: "Pet Friendly" },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { bg: string; color: string; dot: string; label: string }> = {
  Approved: { bg: "#dcfce7", color: "#15803d", dot: "#16a34a", label: "Approved" },
  Pending:  { bg: "#fef3c7", color: "#92400e", dot: "#d97706", label: "Pending Review" },
  Rejected: { bg: "#fee2e2", color: "#991b1b", dot: "#dc2626", label: "Rejected" },
};

function StatusPill({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: cfg.bg, color: cfg.color,
      fontSize: "0.82rem", fontWeight: 700,
      padding: "5px 12px", borderRadius: 20,
    }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />
      {cfg.label}
    </span>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 22 }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10,
        background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "1rem" }}>{title}</div>
        {subtitle && <div style={{ color: "#64748b", fontSize: "0.82rem", marginTop: 2 }}>{subtitle}</div>}
      </div>
    </div>
  );
}

// ─── Form Field ───────────────────────────────────────────────────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <div style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
      <AlertTriangle size={11} /> {msg}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

// Next.js v15 context: params is a Promise in app router generic page components sometimes,
// but for standard client components wrapped by next internal, it comes as an object.
// To perfectly handle both cases and avoid React warnings about unwrapping params in V15+,
// we use Nextjs 15 'use' syntax.
export default function HostEditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const idValue = unwrappedParams.id;
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const property = properties.find(p => p.id === Number(idValue));

  // ── Form state pre-filled from property ─────────────────────────────────
  const [form, setForm] = useState({
    title:       property?.title || "",
    type:        property?.type || "Villa",
    address:     property?.location || "",
    city:        property?.city || "",
    country:     property?.country || "",
    price:       String(property?.price || ""),
    maxGuests:   String(property?.maxGuests || 2),
    bedrooms:    String(property?.bedrooms || 1),
    bathrooms:   String(property?.bathrooms || 1),
    description: property?.description || "",
    amenities:   property?.amenities ? [...property.amenities] : [],
  });

  const [images, setImages]           = useState<string[]>(property?.images ? [...property.images] : []);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [errors, setErrors]           = useState<Record<string, string>>({});
  const [saved, setSaved]             = useState(false);
  const [hasChanges, setHasChanges]   = useState(false);
  const [coverIndex, setCoverIndex]   = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // ── Not found guard ──────────────────────────────────────────────────────
  if (!property) {
    return (
      <div style={{ padding: "48px 28px", textAlign: "center" }}>
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          <div style={{ fontSize: "3rem", marginBottom: 16 }}>🏠</div>
          <h2 style={{ fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>Property not found</h2>
          <p style={{ color: "#64748b", marginBottom: 20 }}>
            The property you're trying to edit doesn't exist or may have been removed.
          </p>
          <Link href="/host/my-properties">
            <button className="btn-primary-hs">Back to My Properties</button>
          </Link>
        </div>
      </div>
    );
  }


  // ── Helpers ──────────────────────────────────────────────────────────────
  const update = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
    if (errors[key]) setErrors(prev => { const n = { ...prev }; delete n[key]; return n; });
  };

  const toggleAmenity = (key: string) => {
    setForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(key)
        ? prev.amenities.filter(a => a !== key)
        : [...prev.amenities, key],
    }));
    setHasChanges(true);
  };

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
    if (coverIndex >= idx && coverIndex > 0) setCoverIndex(c => c - 1);
    setHasChanges(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewImageFiles(prev => [...prev, ...files]);
    setHasChanges(true);
  };

  const removeNewFile = (idx: number) => {
    setNewImageFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim())       e.title       = "Property name is required.";
    if (!form.address.trim())     e.address     = "Full address is required.";
    if (!form.city.trim())        e.city        = "City is required.";
    if (!form.country.trim())     e.country     = "Country is required.";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = "Enter a valid price (greater than 0).";
    if (!form.description.trim() || form.description.length < 50)
      e.description = "Description must be at least 50 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to first error
      const firstErrEl = document.querySelector("[data-error]");
      firstErrEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSaved(true);
    setHasChanges(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const discardChanges = () => {
    setForm({ title: property.title, type: property.type, address: property.location, city: property.city, country: property.country, price: String(property.price), maxGuests: String(property.maxGuests), bedrooms: String(property.bedrooms), bathrooms: String(property.bathrooms), description: property.description, amenities: [...property.amenities] }); 
    setImages([...property.images]); 
    setNewImageFiles([]); 
    setHasChanges(false); 
    setErrors({});
  };

  // ── Re-approval notice for Approved properties ────────────────────────────
  const showReapprovalWarning = property.status === "Approved" && hasChanges;

  // ─────────────────────────────────────────────────────────────────────────
  // SUCCESS STATE
  // ─────────────────────────────────────────────────────────────────────────
  if (saved) {
    return (
      <div style={{ padding: "48px 28px", textAlign: "center" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
            boxShadow: "0 4px 20px rgba(22,163,74,0.2)"
          }}>
            <Check size={38} color="#16a34a" />
          </div>
          <h2 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 8, fontSize: "1.5rem" }}>
            Changes Saved!
          </h2>
          <p style={{ color: "#64748b", lineHeight: 1.7, marginBottom: 6 }}>
            <strong>"{form.title}"</strong> has been updated successfully.
          </p>
          {property.status === "Approved" && (
            <div style={{
              background: "#fef3c7", borderRadius: 12, padding: "14px 18px",
              marginBottom: 24, display: "flex", gap: 10, textAlign: "left",
              border: "1px solid #fde68a"
            }}>
              <ShieldAlert size={18} color="#d97706" style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <div style={{ fontWeight: 700, color: "#92400e", fontSize: "0.88rem" }}>
                  Pending Re-approval
                </div>
                <div style={{ color: "#92400e", fontSize: "0.81rem", marginTop: 2 }}>
                  Your listing has been temporarily hidden while our team reviews the changes. Usually takes 1–2 business days.
                </div>
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/host/my-properties">
              <button className="btn-primary-hs" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Home size={14} /> My Properties
              </button>
            </Link>
            <Link href={`/listings/${property.id}`}>
              <button className="btn-outline-hs" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Eye size={14} /> View Listing
              </button>
            </Link>
            <button
              className="btn-outline-hs"
              onClick={() => { setSaved(false); setHasChanges(false); }}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <RefreshCw size={14} /> Edit Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // MAIN FORM
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={{ padding: "28px", background: "#f8fafc", minHeight: "100%" }}>

      {/* ── Breadcrumb ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.81rem", color: "#94a3b8", marginBottom: 20, flexWrap: "wrap" }}>
        <Link href="/host/dashboard" style={{ color: "#94a3b8", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
          <Home size={13} /> Host Panel
        </Link>
        <ChevronRight size={12} />
        <Link href="/host/my-properties" style={{ color: "#94a3b8", textDecoration: "none" }}>My Properties</Link>
        <ChevronRight size={12} />
        <span style={{ color: "#475569", fontWeight: 600 }}>Edit Property</span>
      </div>

      {/* ── Page Header ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={() => router.push("/host/my-properties")}
            style={{
              background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 10,
              width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#475569", flexShrink: 0
            }}
          >
            <ArrowLeft size={17} />
          </button>
          <div>
            <h1 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 4, fontSize: "1.45rem", lineHeight: 1.2 }}>
              Edit Property
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ color: "#64748b", fontSize: "0.83rem" }}>#{property.id} · {property.type}</span>
              <StatusPill status={property.status} />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <Link href={`/listings/${property.id}`}>
            <button className="btn-outline-hs" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem" }}>
              <Eye size={14} /> Preview Listing
            </button>
          </Link>
          {hasChanges && (
            <button
              onClick={discardChanges}
              style={{ background: "#f1f5f9", border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "8px 14px", cursor: "pointer", color: "#64748b", fontWeight: 600, fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 5 }}
            >
              <RefreshCw size={13} /> Discard
            </button>
          )}
        </div>
      </div>

      {/* ── Re-approval warning banner ── */}
      {showReapprovalWarning && (
        <div style={{
          background: "linear-gradient(135deg, #fef9ec, #fef3c7)",
          border: "1.5px solid #fde68a", borderRadius: 12,
          padding: "14px 18px", marginBottom: 22,
          display: "flex", alignItems: "flex-start", gap: 12
        }}>
          <ShieldAlert size={20} color="#d97706" style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ fontWeight: 700, color: "#92400e", fontSize: "0.9rem", marginBottom: 2 }}>
              Admin Re-approval Required
            </div>
            <div style={{ color: "#78350f", fontSize: "0.82rem", lineHeight: 1.6 }}>
              This property is currently <strong>Approved</strong> and live. Saving these changes will temporarily set the status to
              <strong> Pending Review</strong> until our admin team re-approves the updated listing.
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSave} noValidate>
        <div className="row g-4" style={{ alignItems: "flex-start" }}>

          {/* ══════════════════════════════════════════════
              LEFT COLUMN — Main form sections
          ══════════════════════════════════════════════ */}
          <div className="col-lg-8">

            {/* ─ Section 1: Basic Information ────────────── */}
            <div
              className="hs-card"
              style={{ padding: "26px 28px", marginBottom: 20, cursor: "default" }}
              onClick={() => setActiveSection("basic")}
            >
              <SectionHeader
                icon={<FileText size={18} color="#2563EB" />}
                title="Basic Information"
                subtitle="Core property details and identity"
              />
              <div className="row g-3">

                {/* Property Name */}
                <div className="col-12" data-error={errors.title ? "true" : undefined}>
                  <label className="hs-form-label">
                    Property Name <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <input
                    className="hs-form-control"
                    placeholder="e.g. Tropical Villa with Private Pool"
                    value={form.title}
                    onChange={e => update("title", e.target.value)}
                    style={{ borderColor: errors.title ? "#dc2626" : undefined }}
                  />
                  <FieldError msg={errors.title} />
                </div>

                {/* Type + Price */}
                <div className="col-md-6">
                  <label className="hs-form-label">Property Type</label>
                  <select
                    className="hs-form-control"
                    value={form.type}
                    onChange={e => update("type", e.target.value)}
                  >
                    {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="col-md-6" data-error={errors.price ? "true" : undefined}>
                  <label className="hs-form-label">
                    Price per Night ($) <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <DollarSign size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }} />
                    <input
                      type="number" min="1" className="hs-form-control"
                      placeholder="0" style={{ paddingLeft: 34, borderColor: errors.price ? "#dc2626" : undefined }}
                      value={form.price}
                      onChange={e => update("price", e.target.value)}
                    />
                  </div>
                  <FieldError msg={errors.price} />
                </div>

                {/* Address */}
                <div className="col-12" data-error={errors.address ? "true" : undefined}>
                  <label className="hs-form-label">
                    Full Address <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <MapPin size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }} />
                    <input
                      className="hs-form-control"
                      placeholder="Street address, district, area"
                      style={{ paddingLeft: 34, borderColor: errors.address ? "#dc2626" : undefined }}
                      value={form.address}
                      onChange={e => update("address", e.target.value)}
                    />
                  </div>
                  <FieldError msg={errors.address} />
                </div>

                {/* City + Country */}
                <div className="col-md-6" data-error={errors.city ? "true" : undefined}>
                  <label className="hs-form-label">
                    City <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <input
                    className="hs-form-control"
                    placeholder="Bali"
                    value={form.city}
                    style={{ borderColor: errors.city ? "#dc2626" : undefined }}
                    onChange={e => update("city", e.target.value)}
                  />
                  <FieldError msg={errors.city} />
                </div>

                <div className="col-md-6" data-error={errors.country ? "true" : undefined}>
                  <label className="hs-form-label">
                    Country <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <input
                    className="hs-form-control"
                    placeholder="Indonesia"
                    value={form.country}
                    style={{ borderColor: errors.country ? "#dc2626" : undefined }}
                    onChange={e => update("country", e.target.value)}
                  />
                  <FieldError msg={errors.country} />
                </div>
               </div>
            </div>

            {/* ─ Section 2: Capacity & Details ────────────── */}
            <div className="hs-card" style={{ padding: "26px 28px", marginBottom: 20 }}>
              <SectionHeader
                icon={<Users size={18} color="#2563EB" />}
                title="Capacity & Details"
                subtitle="Guests, rooms, and accommodation specs"
              />
              <div className="row g-3">

                {/* Max Guests */}
                <div className="col-sm-4">
                  <label className="hs-form-label">
                    <Users size={13} style={{ marginRight: 5, color: "#94a3b8" }} />
                    Max Guests
                  </label>
                  <select
                    className="hs-form-control"
                    value={form.maxGuests}
                    onChange={e => update("maxGuests", e.target.value)}
                  >
                    {[1,2,3,4,5,6,7,8,10,12,16].map(n =>
                      <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                    )}
                  </select>
                </div>

                {/* Bedrooms */}
                <div className="col-sm-4">
                  <label className="hs-form-label">
                    <Bed size={13} style={{ marginRight: 5, color: "#94a3b8" }} />
                    Bedrooms
                  </label>
                  <select
                    className="hs-form-control"
                    value={form.bedrooms}
                    onChange={e => update("bedrooms", e.target.value)}
                  >
                    {[1,2,3,4,5,6,7,8].map(n =>
                      <option key={n} value={n}>{n} Bedroom{n > 1 ? "s" : ""}</option>
                    )}
                  </select>
                </div>

                {/* Bathrooms */}
                <div className="col-sm-4">
                  <label className="hs-form-label">
                    <Bath size={13} style={{ marginRight: 5, color: "#94a3b8" }} />
                    Bathrooms
                  </label>
                  <select
                    className="hs-form-control"
                    value={form.bathrooms}
                    onChange={e => update("bathrooms", e.target.value)}
                  >
                    {[1,2,3,4,5,6].map(n =>
                      <option key={n} value={n}>{n} Bathroom{n > 1 ? "s" : ""}</option>
                    )}
                  </select>
                </div>

                {/* Capacity Summary */}
                <div className="col-12">
                  <div style={{
                    background: "#f8fafc", borderRadius: 10, padding: "12px 16px",
                    display: "flex", gap: 24, flexWrap: "wrap",
                    border: "1px solid #e2e8f0"
                  }}>
                    {[
                      { label: "Max Guests", value: form.maxGuests, icon: "👥" },
                      { label: "Bedrooms",   value: form.bedrooms,  icon: "🛏️" },
                      { label: "Bathrooms",  value: form.bathrooms, icon: "🚿" },
                      { label: "Nightly Rate", value: `$${form.price || 0}`, icon: "💵" },
                    ].map(({ label, value, icon }) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: "1rem" }}>{icon}</span>
                        <div>
                          <div style={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 600, lineHeight: 1 }}>{label}</div>
                          <div style={{ fontWeight: 800, color: "#1e293b", fontSize: "0.92rem" }}>{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ─ Section 3: Description ────────────────────── */}
            <div className="hs-card" style={{ padding: "26px 28px", marginBottom: 20 }}>
              <SectionHeader
                icon={<FileText size={18} color="#2563EB" />}
                title="Description"
                subtitle="Tell guests what makes your property special"
              />
              <div data-error={errors.description ? "true" : undefined}>
                <textarea
                  className="hs-form-control"
                  rows={7}
                  placeholder="Describe your property in detail. Include the style, unique features, nearby attractions, and what makes it special. (Minimum 50 characters)"
                  style={{ resize: "vertical", borderColor: errors.description ? "#dc2626" : undefined }}
                  value={form.description}
                  onChange={e => update("description", e.target.value)}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, alignItems: "center" }}>
                  <FieldError msg={errors.description} />
                  <span style={{
                    fontSize: "0.75rem", fontWeight: 600, marginLeft: "auto",
                    color: form.description.length < 50 ? "#d97706" : "#16a34a"
                  }}>
                    {form.description.length} / 50 min
                  </span>
                </div>
              </div>

              {/* Writing tips */}
              <div style={{ background: "#eff6ff", borderRadius: 10, padding: "12px 16px", marginTop: 14, display: "flex", gap: 10 }}>
                <Info size={15} color="#2563EB" style={{ flexShrink: 0, marginTop: 1 }} />
                <div style={{ fontSize: "0.79rem", color: "#1d4ed8", lineHeight: 1.65 }}>
                  <strong>Writing tips:</strong> Mention the vibe/style, proximity to beaches or attractions, what's unique about the space, and who it's perfect for.
                </div>
              </div>
            </div>

            {/* ─ Section 4: Amenities ──────────────────────── */}
            <div className="hs-card" style={{ padding: "26px 28px", marginBottom: 20 }}>
              <SectionHeader
                icon={<CheckSquare size={18} color="#2563EB" />}
                title="Amenities"
                subtitle={`${form.amenities.length} amenities selected`}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(168px, 1fr))", gap: 10 }}>
                {ALL_AMENITIES.map(({ key, icon, label }) => {
                  const selected = form.amenities.includes(key);
                  return (
                    <label
                      key={key}
                      style={{
                        display: "flex", alignItems: "center", gap: 9,
                        padding: "10px 14px",
                        border: `1.5px solid ${selected ? "#2563EB" : "#e2e8f0"}`,
                        borderRadius: 10, cursor: "pointer",
                        background: selected ? "#eff6ff" : "#fff",
                        color: selected ? "#1d4ed8" : "#475569",
                        fontWeight: selected ? 600 : 400,
                        fontSize: "0.83rem",
                        transition: "all 0.15s",
                        userSelect: "none",
                      }}
                    >
                      <input
                        type="checkbox" checked={selected}
                        onChange={() => toggleAmenity(key)}
                        style={{ accentColor: "#2563EB", width: 15, height: 15 }}
                      />
                      <span style={{ fontSize: "1rem" }}>{icon}</span>
                      {label}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ─ Section 5: Photos ─────────────────────────── */}
            <div className="hs-card" style={{ padding: "26px 28px", marginBottom: 20 }}>
              <SectionHeader
                icon={<Image size={18} color="#2563EB" />}
                title="Property Photos"
                subtitle={`${images.length + newImageFiles.length} photo${images.length + newImageFiles.length !== 1 ? "s" : ""} · Click a photo to set as cover`}
              />

              {/* Existing images grid */}
              {images.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 12 }}>
                    Current Photos
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
                    {images.map((src, idx) => (
                      <div
                        key={idx}
                        style={{
                          position: "relative", borderRadius: 12, overflow: "hidden",
                          border: coverIndex === idx ? "2.5px solid #2563EB" : "2px solid transparent",
                          cursor: "pointer", aspectRatio: "4/3"
                        }}
                        onClick={() => setCoverIndex(idx)}
                      >
                        <img
                          src={src} alt={`Photo ${idx + 1}`}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                        {/* Cover badge */}
                        {coverIndex === idx && (
                          <div style={{
                            position: "absolute", top: 6, left: 6,
                            background: "#2563EB", color: "#fff",
                            fontSize: "0.65rem", fontWeight: 700,
                            padding: "2px 7px", borderRadius: 20,
                            display: "flex", alignItems: "center", gap: 3
                          }}>
                            <Check size={9} /> Cover
                          </div>
                        )}
                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={e => { e.stopPropagation(); removeImage(idx); }}
                          style={{
                            position: "absolute", top: 6, right: 6,
                            background: "rgba(0,0,0,0.6)", border: "none",
                            borderRadius: "50%", width: 26, height: 26,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", color: "#fff"
                          }}
                        >
                          <X size={12} />
                        </button>
                        {/* Photo number */}
                        <div style={{
                          position: "absolute", bottom: 5, left: 6,
                          background: "rgba(0,0,0,0.45)", color: "#fff",
                          fontSize: "0.62rem", fontWeight: 600,
                          padding: "1px 6px", borderRadius: 10
                        }}>
                          #{idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New files queued */}
              {newImageFiles.length > 0 && (
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10 }}>
                    New Photos to Upload ({newImageFiles.length})
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {newImageFiles.map((file, i) => (
                      <div key={i} style={{
                        display: "flex", alignItems: "center", gap: 6,
                        background: "#f0fdf4", border: "1px solid #bbf7d0",
                        borderRadius: 8, padding: "6px 10px",
                        fontSize: "0.78rem", color: "#15803d"
                      }}>
                        <Image size={12} />
                        <span style={{ maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</span>
                        <button type="button" onClick={() => removeNewFile(i)}
                          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#dc2626", display: "flex" }}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload zone */}
              <label style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                border: "2px dashed #bfdbfe", borderRadius: 14, padding: "32px 20px",
                cursor: "pointer", background: "#f8fafc", transition: "all 0.15s",
              }}
              >
                <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <Upload size={22} color="#2563EB" />
                </div>
                <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 4, fontSize: "0.9rem" }}>
                  Click to upload new photos
                </div>
                <div style={{ color: "#94a3b8", fontSize: "0.78rem" }}>
                  PNG, JPG, WEBP — up to 10 MB each
                </div>
                <input
                  ref={fileInputRef}
                  type="file" multiple accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
              </label>

              {images.length === 0 && newImageFiles.length === 0 && (
                <div style={{ marginTop: 14, background: "#fef3c7", borderRadius: 10, padding: "10px 14px", display: "flex", gap: 8, alignItems: "center", fontSize: "0.8rem", color: "#92400e" }}>
                  <AlertTriangle size={14} />
                  Properties need at least 1 photo to be approved and visible in listings.
                </div>
              )}

              {/* Photo tips */}
              <div style={{ background: "#faf5ff", borderRadius: 10, padding: "12px 16px", marginTop: 14, display: "flex", gap: 10 }}>
                <span style={{ fontSize: "1rem" }}>📸</span>
                <div style={{ fontSize: "0.79rem", color: "#6d28d9", lineHeight: 1.65 }}>
                  <strong>Pro tip:</strong> Properties with 5+ high-quality photos receive <strong>3× more bookings</strong>. Wide-angle shots with good natural lighting work best.
                </div>
              </div>
            </div>

          </div>

          {/* ══════════════════════════════════════════════
              RIGHT COLUMN — Sidebar info + actions
          ══════════════════════════════════════════════ */}
          <div className="col-lg-4">
            <div style={{ position: "sticky", top: 24 }}>

              {/* ─ Listing Status (read-only) ── */}
              <div className="hs-card" style={{ padding: "20px 22px", marginBottom: 16 }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 14 }}>
                  Listing Status
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <StatusPill status={property.status} />
                  <div style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: 600 }}>Read-only</div>
                </div>

                {/* Status descriptions */}
                {property.status === "Approved" && (
                  <div style={{ background: "#f0fdf4", borderRadius: 8, padding: "10px 12px", fontSize: "0.79rem", color: "#166534", lineHeight: 1.6 }}>
                    ✅ Your property is <strong>live and visible</strong> to guests in search results.
                  </div>
                )}
                {property.status === "Pending" && (
                  <div style={{ background: "#fef3c7", borderRadius: 8, padding: "10px 12px", fontSize: "0.79rem", color: "#92400e", lineHeight: 1.6 }}>
                    ⏳ Your property is awaiting admin review. Usually takes 1–2 business days.
                  </div>
                )}
                {property.status === "Rejected" && (
                  <div style={{ background: "#fef2f2", borderRadius: 8, padding: "10px 12px", fontSize: "0.79rem", color: "#991b1b", lineHeight: 1.6 }}>
                    ❌ Rejected. Review admin feedback and update your listing to resubmit.
                  </div>
                )}

                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #f1f5f9", fontSize: "0.76rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: 5 }}>
                  <Info size={11} /> Status is managed by the admin team only.
                </div>
              </div>

               {/* ─ Save Actions ── */}
               <div className="hs-card" style={{ padding: "20px 22px", marginBottom: 16 }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 14 }}>
                  Actions
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button
                    type="submit"
                    className="btn-primary-hs"
                    style={{
                      width: "100%", display: "flex", alignItems: "center",
                      justifyContent: "center", gap: 8, fontSize: "0.95rem",
                      opacity: !hasChanges ? 0.6 : 1,
                    }}
                  >
                    <Save size={15} /> Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn-outline-hs"
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: "0.87rem" }}
                    onClick={() => router.push("/host/my-properties")}
                  >
                    <X size={14} /> Cancel
                  </button>
                </div>

                {!hasChanges && (
                  <div style={{ marginTop: 12, textAlign: "center", fontSize: "0.76rem", color: "#94a3b8" }}>
                    No unsaved changes
                  </div>
                )}
                {hasChanges && (
                  <div style={{ marginTop: 12, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, fontSize: "0.76rem", color: "#d97706", fontWeight: 600 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#d97706" }} />
                    Unsaved changes
                  </div>
                )}
              </div>

              {/* ─ Quick Summary ── */}
              <div className="hs-card" style={{ padding: "20px 22px", marginBottom: 16 }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 14 }}>
                  Current Summary
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { label: "Type",          value: form.type },
                    { label: "Location",      value: `${form.city}, ${form.country}` },
                    { label: "Price/night",   value: `$${form.price || "—"}` },
                    { label: "Max guests",    value: `${form.maxGuests} guests` },
                    { label: "Bedrooms",      value: form.bedrooms },
                    { label: "Amenities",     value: `${form.amenities.length} selected` },
                    { label: "Photos",        value: `${images.length + newImageFiles.length}` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem" }}>
                      <span style={{ color: "#64748b" }}>{label}</span>
                      <span style={{ fontWeight: 700, color: "#1e293b", maxWidth: 120, textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─ Danger Zone ── */}
              <div className="hs-card" style={{ padding: "18px 22px", border: "1.5px solid #fee2e2" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#dc2626", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 12 }}>
                  Danger Zone
                </div>
                <p style={{ fontSize: "0.79rem", color: "#64748b", marginBottom: 12, lineHeight: 1.6 }}>
                  Permanently remove this property and all its data. This cannot be undone.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete "${property.title}"? This action cannot be undone.`)) {
                      router.push("/host/my-properties");
                    }
                  }}
                  style={{
                    width: "100%", background: "#fff", border: "1.5px solid #fca5a5",
                    borderRadius: 8, padding: "8px 14px", cursor: "pointer",
                    color: "#dc2626", fontSize: "0.83rem", fontWeight: 600,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    transition: "all 0.15s"
                  }}
                >
                  <Trash2 size={14} /> Delete This Property
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* ── Bottom Save Bar (visible when scrolled down with changes) ── */}
        {hasChanges && (
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0,
            background: "#fff", borderTop: "1.5px solid #e2e8f0",
            padding: "12px 24px", zIndex: 900,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            boxShadow: "0 -4px 20px rgba(0,0,0,0.08)", flexWrap: "wrap", gap: 10
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#d97706" }} />
              <span style={{ color: "#64748b" }}>You have unsaved changes.</span>
              {property.status === "Approved" && (
                <span style={{ color: "#d97706", fontWeight: 600, fontSize: "0.8rem" }}>
                  Saving will require admin re-approval.
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={discardChanges}
                style={{ background: "#f1f5f9", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: "#64748b", fontWeight: 600, fontSize: "0.84rem" }}
              >
                Discard
              </button>
              <button
                type="submit"
                className="btn-primary-hs"
                style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.87rem" }}
              >
                <Save size={14} /> Save Changes
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
