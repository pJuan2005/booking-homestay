"use client";

import "./page.css";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

export default function ViewProperty() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const property = {
    id: id,
    name: "Tropical Villa with Private Pool",
    location: "Seminyak, Bali, Indonesia",
    price: "$185",
    rating: "4.9",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    description:
      "Escape to this stunning tropical villa nestled in the heart of Seminyak. Featuring lush gardens, a private pool, open-air living spaces, and exquisite Balinese décor.",
    images: ["/img/property1.jpg", "/img/property2.jpg", "/img/property3.jpg"],
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this property?")) {
      alert("Property deleted");
      router.push("/host/my-properties");
    }
  };

  return (
    <div className="view-property">
      {/* HEADER */}
      <div className="view-header">
        <div>
          <h1>{property.name}</h1>
          <p>📍 {property.location}</p>
        </div>

        <div className="host-actions">
          <button
            className="preview-btn"
            onClick={() => router.push(`/property/${property.id}`)}
          >
            👁 Preview Listing
          </button>

          <button
            className="edit-btn"
            onClick={() => router.push(`/host/edit-property/${property.id}`)}
          >
            ✏ Edit Property
          </button>

          <button className="delete-btn" onClick={handleDelete}>
            🗑 Delete
          </button>
        </div>
      </div>

      {/* GALLERY */}
      <div className="gallery">
        <Image
          src={property.images[0]}
          alt="Property image"
          width={900}
          height={400}
          className="main-image"
        />

        <div className="thumbs">
          {property.images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Property image ${i}`}
              width={200}
              height={120}
            />
          ))}
        </div>
      </div>

      {/* INFO */}
      <div className="property-info">
        <div className="info-left">
          <div className="stats">
            <span>👥 {property.guests} guests</span>
            <span>🛏 {property.bedrooms} bedrooms</span>
            <span>🛁 {property.bathrooms} bathrooms</span>
            <span>⭐ {property.rating}</span>
          </div>

          <div className="description">
            <h3>About This Property</h3>
            <p>{property.description}</p>
          </div>
        </div>

        {/* PRICE CARD */}
        <div className="booking-card">
          <h2>{property.price} / night</h2>
          <p>⭐ {property.rating}</p>

          <button
            className="edit-btn big"
            onClick={() => router.push(`/host/edit-property/${property.id}`)}
          >
            Edit Property
          </button>
        </div>
      </div>
    </div>
  );
}
