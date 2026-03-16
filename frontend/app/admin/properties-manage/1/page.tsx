"use client";

import "./page.css";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function ViewProperty() {
  const router = useRouter();
  const params = useParams();

  const property = {
    id: params.id,
    name: "Tropical Villa with Private Pool",
    location: "Seminyak, Bali, Indonesia",
    rating: "4.7",
    price: "$185",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    host: "Made Wijaya",
    description:
      "Escape to this stunning tropical villa nestled in the heart of Seminyak...",
    images: ["/img/property1.jpg", "/img/property2.jpg", "/img/property3.jpg"],
    amenities: [
      "WiFi",
      "Private Pool",
      "Full Kitchen",
      "Air Conditioning",
      "Parking",
      "Beach Access",
      "Outdoor Shower",
      "BBQ Grill",
    ],
  };

  return (
    <div className="view-property">
      {/* HEADER */}

      <div className="view-header">
        <button className="btn-back" onClick={() => router.back()}>
          ← Back
        </button>

        <div>
          <h1>{property.name}</h1>
          <p>{property.location}</p>
        </div>
      </div>

      {/* MAIN IMAGE */}

      <div className="gallery">
        <Image
          src={property.images[0]}
          alt=""
          width={900}
          height={400}
          className="main-image"
        />

        <div className="thumbs">
          {property.images.map((img, i) => (
            <Image key={i} src={img} alt="" width={120} height={80} />
          ))}
        </div>
      </div>

      <div className="view-grid">
        {/* LEFT */}

        <div className="left">
          <div className="info-card">
            <div className="stats">
              <span>👥 {property.guests} Guests</span>
              <span>🛏 {property.bedrooms} Bedrooms</span>
              <span>🛁 {property.bathrooms} Bathrooms</span>
              <span>⭐ {property.rating}</span>
            </div>
          </div>

          <div className="info-card">
            <h3>Hosted by {property.host}</h3>
            <p>Superhost · Member since 2022</p>
          </div>

          <div className="info-card">
            <h3>About This Property</h3>

            <p>{property.description}</p>
          </div>

          <div className="info-card">
            <h3>Amenities</h3>

            <div className="amenities">
              {property.amenities.map((a, i) => (
                <span key={i}>{a}</span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="right">
          <div className="booking-card">
            <h2>
              {property.price}
              <span>/night</span>
            </h2>

            <button
              className="btn-edit"
              onClick={() => router.push(`/admin/edit-property/${property.id}`)}
            >
              Edit Property
            </button>

            <button className="btn-delete">Delete Property</button>
          </div>
        </div>
      </div>
    </div>
  );
}
