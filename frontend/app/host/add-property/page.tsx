"use client";

import "./page.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProperty() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<File[]>([]);

  const amenitiesList = [
    "WiFi",
    "Full Kitchen",
    "Air Conditioning",
    "Parking",
    "Pool",
    "Beachfront",
    "Fireplace",
    "Washer/Dryer",
    "Gym Access",
    "Hot Tub",
    "BBQ Grill",
    "Smart TV",
    "Workspace",
    "Elevator",
    "Breakfast Included",
    "Pet Friendly",
    "Sauna",
    "Mountain View",
    "City View",
    "Sea View",
  ];

  const [amenities, setAmenities] = useState<string[]>([]);

  const toggleAmenity = (a: string) => {
    if (amenities.includes(a)) {
      setAmenities(amenities.filter((x) => x !== a));
    } else {
      setAmenities([...amenities, a]);
    }
  };

  const handleUpload = (e: any) => {
    setPhotos([...photos, ...Array.from(e.target.files)]);
  };

  return (
    <div className="add-property">
      {/* HEADER */}

      <h1>Add New Property</h1>
      <p>Fill in the details to list your property</p>

      {/* STEPS */}

      <div className="steps">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={`step ${step >= s ? "active" : ""}`}>
            {s}
          </div>
        ))}
      </div>

      {/* STEP 1 */}

      {step === 1 && (
        <div className="card">
          <h3>Basic Information</h3>

          <label>Property Title</label>
          <input placeholder="Cozy Beachside Villa with Pool" />

          <div className="row">
            <div>
              <label>Property Type</label>
              <input />
            </div>

            <div>
              <label>Price Per Night ($)</label>
              <input />
            </div>
          </div>

          <label>Street Address</label>
          <input placeholder="123 Beach Road" />

          <div className="row">
            <div>
              <label>City</label>
              <input />
            </div>

            <div>
              <label>Country</label>
              <input />
            </div>
          </div>

          <button className="next" onClick={() => setStep(2)}>
            Next Step →
          </button>
        </div>
      )}

      {/* STEP 2 */}

      {step === 2 && (
        <div className="card">
          <h3>Property Details</h3>

          <div className="row">
            <div>
              <label>Max Guests</label>
              <input />
            </div>

            <div>
              <label>Bedrooms</label>
              <input />
            </div>

            <div>
              <label>Bathrooms</label>
              <input />
            </div>
          </div>

          <label>Description</label>

          <textarea rows={6} placeholder="Describe your property..." />

          <div className="buttons">
            <button onClick={() => setStep(1)}>← Previous</button>

            <button onClick={() => setStep(3)}>Next Step →</button>
          </div>
        </div>
      )}

      {/* STEP 3 */}

      {step === 3 && (
        <div className="card">
          <h3>Amenities</h3>

          <div className="amenities">
            {amenitiesList.map((a) => (
              <button
                key={a}
                className={amenities.includes(a) ? "amenity active" : "amenity"}
                onClick={() => toggleAmenity(a)}
              >
                {a}
              </button>
            ))}
          </div>

          <div className="buttons">
            <button onClick={() => setStep(2)}>← Previous</button>

            <button onClick={() => setStep(4)}>Next Step →</button>
          </div>
        </div>
      )}

      {/* STEP 4 */}

      {step === 4 && (
        <div className="card">
          <h3>Upload Photos</h3>

          <label className="upload">
            Click to upload photos
            <input type="file" multiple onChange={handleUpload} />
          </label>

          {photos.length > 0 && <p>{photos.length} photo selected</p>}

          <div className="buttons">
            <button onClick={() => setStep(3)}>← Previous</button>

            <button onClick={() => setStep(5)}>Submit Property</button>
          </div>
        </div>
      )}

      {/* SUCCESS */}

      {step === 5 && (
        <div className="success">
          <h2>Property Submitted!</h2>

          <p>Your property has been submitted for review.</p>

          <div className="buttons">
            <button onClick={() => router.push("/host/properties")}>
              View My Properties
            </button>

            <button onClick={() => setStep(1)}>Add Another</button>
          </div>
        </div>
      )}
    </div>
  );
}
