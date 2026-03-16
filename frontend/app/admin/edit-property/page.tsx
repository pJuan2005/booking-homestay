"use client";

import "./page.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EditProperty() {
  const router = useRouter();

  return (
    <div className="edit-property-container">
      {/* HEADER */}
      <div className="edit-header">
        <button className="btn-back" onClick={() => router.back()}>
          ← Back
        </button>

        <div>
          <h1>Edit Property</h1>
          <p>ID #1 — Tropical Villa with Private Pool</p>
        </div>

        <span className="status approved">Approved</span>
      </div>

      <div className="edit-layout">
        {/* LEFT */}
        <div className="edit-left">
          {/* BASIC INFO */}
          <div className="card">
            <h3>Basic Information</h3>

            <div className="form-group">
              <label>Property Name</label>
              <input defaultValue="Tropical Villa with Private Pool" />
            </div>

            <div className="form-group">
              <label>Full Address</label>
              <input defaultValue="Seminyak, Bali, Indonesia" />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label>City</label>
                <input defaultValue="Bali" />
              </div>

              <div className="form-group">
                <label>Country</label>
                <input defaultValue="Indonesia" />
              </div>
            </div>

            <div className="grid-3">
              <div className="form-group">
                <label>Price / Night</label>
                <input defaultValue="$185" />
              </div>

              <div className="form-group">
                <label>Property Type</label>
                <input defaultValue="Villa" />
              </div>

              <div className="form-group">
                <label>Max Guests</label>
                <input defaultValue="6" />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label>Bedrooms</label>
                <input defaultValue="3" />
              </div>

              <div className="form-group">
                <label>Bathrooms</label>
                <input defaultValue="2" />
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="card">
            <h3>Property Description</h3>

            <textarea placeholder="Describe the property in detail..." />
          </div>

          {/* AMENITIES */}
          <div className="card">
            <div className="card-header">
              <h3>Amenities</h3>
              <span>8 selected</span>
            </div>

            <div className="amenities-grid">
              {[
                "WiFi",
                "Private Pool",
                "Full Kitchen",
                "Air Conditioning",
                "Parking",
                "Beach Access",
                "Outdoor Shower",
                "BBQ Grill",
                "Gym Access",
                "Workspace",
                "Balcony",
                "Smart TV",
              ].map((item) => (
                <button key={item} className="amenity">
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* IMAGES */}
          <div className="card">
            <h3>Property Images</h3>

            <div className="images">
              <Image src="/img/property1.jpg" alt="" width={120} height={80} />

              <Image src="/img/property2.jpg" alt="" width={120} height={80} />

              <Image src="/img/property3.jpg" alt="" width={120} height={80} />
            </div>

            <div className="upload-box">
              <p>Click to Upload New Images</p>
              <span>PNG, JPG, WEBP — max 5MB each</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="edit-right">
          {/* STATUS */}
          <div className="card">
            <h3>Status & Actions</h3>

            <div className="status-list">
              <button className="status approved">Approved</button>

              <button className="status pending">Pending</button>

              <button className="status rejected">Rejected</button>
            </div>

            <button className="btn-primary">Save Changes</button>

            <button className="btn-cancel">Cancel</button>
          </div>

          {/* SNAPSHOT */}
          <div className="card">
            <h3>Property Snapshot</h3>

            <Image
              src="/img/property1.jpg"
              alt=""
              width={300}
              height={200}
              className="snapshot-img"
            />

            <div className="snapshot-info">
              <p>Host: Made Wijaya</p>
              <p>Rating: ⭐ 4.9 (142 reviews)</p>
              <p>Bedrooms: 3 bed · 2 bath</p>
              <p>Status: Approved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
