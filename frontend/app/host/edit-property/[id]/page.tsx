"use client";

import "./page.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EditProperty() {
  const router = useRouter();

  return (
    <div className="edit-page">
      {/* HEADER */}

      <div className="edit-header">
        <div>
          <h1>Edit Property</h1>
          <span className="status">Approved</span>
        </div>

        <button
          className="preview-btn"
          onClick={() => router.push("/property/1")}
        >
          👁 Preview Listing
        </button>
      </div>

      <div className="edit-grid">
        {/* LEFT SIDE */}

        <div className="edit-left">
          {/* BASIC INFO */}

          <div className="card">
            <h3>Basic Information</h3>

            <label>Property Name</label>
            <input defaultValue="Tropical Villa with Private Pool" />

            <div className="row">
              <div>
                <label>Property Type</label>
                <input placeholder="Villa" />
              </div>

              <div>
                <label>Price per Night ($)</label>
                <input defaultValue="185" />
              </div>
            </div>

            <label>Full Address</label>
            <input defaultValue="Seminyak, Bali, Indonesia" />

            <div className="row">
              <div>
                <label>City</label>
                <input defaultValue="Bali" />
              </div>

              <div>
                <label>Country</label>
                <input defaultValue="Indonesia" />
              </div>
            </div>
          </div>

          {/* CAPACITY */}

          <div className="card">
            <h3>Capacity & Details</h3>

            <div className="row">
              <div>
                <label>Max Guests</label>
                <input defaultValue="6" />
              </div>

              <div>
                <label>Bedrooms</label>
                <input defaultValue="3" />
              </div>

              <div>
                <label>Bathrooms</label>
                <input defaultValue="2" />
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}

          <div className="card">
            <h3>Description</h3>

            <textarea
              rows={6}
              defaultValue="Escape to this stunning tropical villa nestled in the heart of Seminyak..."
            />
          </div>

          {/* AMENITIES */}

          <div className="card">
            <h3>Amenities</h3>

            <div className="amenities">
              {[
                "WiFi",
                "Parking",
                "Air Conditioning",
                "Private Pool",
                "Full Kitchen",
                "BBQ Grill",
                "Beach Access",
                "Smart TV",
                "Workspace",
                "Gym",
                "Elevator",
              ].map((a, i) => (
                <button key={i} className="amenity active">
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* PHOTOS */}

          <div className="card">
            <h3>Property Photos</h3>

            <div className="photos">
              <Image src="/img/property1.jpg" alt="" width={120} height={80} />

              <Image src="/img/property2.jpg" alt="" width={120} height={80} />

              <Image src="/img/property3.jpg" alt="" width={120} height={80} />
            </div>

            <div className="upload-box">Click to upload new photos</div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="edit-right">
          {/* STATUS */}

          <div className="side-card">
            <h4>Listing Status</h4>

            <span className="approved">Approved</span>

            <p>Your property is live and visible to guests.</p>
          </div>

          {/* ACTIONS */}

          <div className="side-card">
            <button className="save-btn">Save Changes</button>

            <button className="cancel-btn" onClick={() => router.back()}>
              Cancel
            </button>
          </div>

          {/* SUMMARY */}

          <div className="side-card">
            <h4>Current Summary</h4>

            <p>Type: Villa</p>
            <p>Location: Bali, Indonesia</p>
            <p>Price: $185/night</p>
            <p>Guests: 6</p>
            <p>Bedrooms: 3</p>
          </div>

          {/* DELETE */}

          <div className="danger">
            <h4>Danger Zone</h4>

            <p>This will permanently delete the property.</p>

            <button className="delete-btn">Delete This Property</button>
          </div>
        </div>
      </div>
    </div>
  );
}
