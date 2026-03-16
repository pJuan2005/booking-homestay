"use client";

import "./page.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ManageProperties() {
  const router = useRouter();

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const properties = [
    {
      id: 1,
      name: "Tropical Villa with Private Pool",
      host: "Made Wijaya",
      location: "Bali",
      type: "villa",
      price: "$185 / night",
      rating: "4.9",
      status: "approved",
      img: "/img/property1.jpg",
      meta: "3 beds · 6 guests max",
    },
    {
      id: 2,
      name: "Cozy Mountain Cabin Retreat",
      host: "Sarah Connor",
      location: "Aspen",
      type: "cabin",
      price: "$130 / night",
      rating: "4.8",
      status: "approved",
      img: "/img/property2.jpg",
      meta: "2 beds · 4 guests max",
    },
    {
      id: 3,
      name: "Minimalist Tokyo Studio",
      host: "Yuki Tanaka",
      location: "Tokyo",
      type: "studio",
      price: "$95 / night",
      rating: "4.7",
      status: "pending",
      img: "/img/property3.jpg",
      meta: "1 bed · 2 guests max",
    },
  ];

  return (
    <div className="manage-properties-container">
      {/* TITLE */}
      <div className="properties-title">
        <h1>Manage Properties</h1>
        <p>All properties listed on the platform</p>
      </div>

      {/* STATS */}
      <div className="properties-stats">
        <div className="stat-card total">
          <h2>9</h2>
          <p>Total</p>
        </div>

        <div className="stat-card approved">
          <h2>7</h2>
          <p>Approved</p>
        </div>

        <div className="stat-card pending">
          <h2>1</h2>
          <p>Pending</p>
        </div>

        <div className="stat-card rejected">
          <h2>1</h2>
          <p>Rejected</p>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="properties-filter">
        <input
          className="search-input"
          placeholder="Search by title, location, or host..."
        />

        <div className="filter-group">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Approved</button>
          <button className="filter-btn">Pending</button>
          <button className="filter-btn">Rejected</button>
        </div>
      </div>

      {/* TABLE */}
      <div className="properties-table">
        <table>
          <thead>
            <tr>
              <th>PROPERTY</th>
              <th>HOST</th>
              <th>LOCATION</th>
              <th>TYPE</th>
              <th>PRICE</th>
              <th>RATING</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {properties.map((p) => (
              <tr key={p.id}>
                <td className="property-cell">
                  <div className="property-info">
                    <Image
                      src={p.img}
                      alt=""
                      width={40}
                      height={40}
                      className="property-img"
                    />

                    <div>
                      <p className="property-name">{p.name}</p>
                      <span className="property-meta">{p.meta}</span>
                    </div>
                  </div>
                </td>

                <td>{p.host}</td>

                <td>{p.location}</td>

                <td>
                  <span className={`type ${p.type}`}>{p.type}</span>
                </td>

                <td>{p.price}</td>

                <td>⭐ {p.rating}</td>

                <td>
                  <span className={`status ${p.status}`}>{p.status}</span>
                </td>

                <td className="actions">
                  {/* VIEW */}
                  <button
                    className="btn-view"
                    onClick={() => router.push(`/admin/properties/${p.id}`)}
                  >
                    👁
                  </button>

                  {/* EDIT */}
                  <button
                    className="btn-edit"
                    onClick={() => router.push(`/admin/edit-property/${p.id}`)}
                  >
                    ✏
                  </button>

                  {/* DELETE */}
                  <button
                    className="btn-delete"
                    onClick={() => setDeleteId(p.id)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}

        <div className="table-pagination">
          <p>Showing 9 of 9 properties</p>

          <div className="pagination-controls">
            <button className="page-btn">Previous</button>

            <button className="page-number active">1</button>

            <button className="page-btn">Next</button>
          </div>
        </div>
      </div>

      {/* DELETE POPUP */}

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
