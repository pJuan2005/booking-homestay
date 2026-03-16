"use client";

import "./page.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MyProperties() {
  const router = useRouter();

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const properties = [
    {
      id: 1,
      name: "Tropical Villa with Private Pool",
      price: "$185/night",
      location: "Seminyak, Bali, Indonesia",
      rating: "4.9 (142)",
      guests: 6,
      beds: 3,
      img: "/img/property1.jpg",
    },
    {
      id: 2,
      name: "Modern City Apartment – Skyline View",
      price: "$220/night",
      location: "Manhattan, New York, USA",
      rating: "4.7 (204)",
      guests: 3,
      beds: 2,
      img: "/img/property2.jpg",
    },
    {
      id: 3,
      name: "Charming Bali Bamboo House",
      price: "$88/night",
      location: "Ubud, Bali, Indonesia",
      rating: "4.9 (312)",
      guests: 2,
      beds: 1,
      img: "/img/property3.jpg",
    },
  ];

  return (
    <div className="properties-page">
      {/* HEADER */}

      <div className="properties-header">
        <div>
          <h1>My Properties</h1>
          <p>{properties.length} properties listed</p>
        </div>

        <button
          className="add-btn"
          onClick={() => router.push("/host/add-property")}
        >
          + Add New Property
        </button>
      </div>

      {/* GRID */}

      <div className="properties-grid">
        {properties.map((p) => (
          <div className="property-card" key={p.id}>
            <div className="image">
              <span className="status">Approved</span>

              <Image src={p.img} alt="" width={400} height={200} />
            </div>

            <div className="property-info">
              <div className="title-price">
                <h3>{p.name}</h3>
                <span>{p.price}</span>
              </div>

              <p className="location">📍 {p.location}</p>

              <div className="meta">
                <span>⭐ {p.rating}</span>
                <span>👥 Max {p.guests} guests</span>
                <span>🛏 {p.beds} beds</span>
              </div>
            </div>

            {/* ACTIONS */}

            <div className="actions">
              <button
                className="view"
                onClick={() => router.push(`/host/properties/${p.id}`)}
              >
                👁 View
              </button>

              <button
                className="edit"
                onClick={() => router.push(`/host/edit-property/${p.id}`)}
              >
                ✏ Edit
              </button>

              <button className="delete" onClick={() => setDeleteId(p.id)}>
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DELETE MODAL */}

      {deleteId && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Property</h3>

            <p>This action cannot be undone.</p>

            <div className="modal-actions">
              <button onClick={() => setDeleteId(null)}>Cancel</button>

              <button className="danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
