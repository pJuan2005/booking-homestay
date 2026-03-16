"use client";

import "./page.css";
import { useState } from "react";

export default function Dashboard() {
  const [tab, setTab] = useState("booking");

  const bookings = [
    {
      property: "Tropical Villa with Private Pool",
      location: "Bali, Indonesia",
      date: "2025-03-15 → 2025-03-20",
      nights: "5 nights",
      guests: 2,
      total: "$925",
      status: "Confirmed",
    },
    {
      property: "Luxury Beachfront Villa",
      location: "Phuket, Thailand",
      date: "2025-05-10 → 2025-05-17",
      nights: "7 nights",
      guests: 4,
      total: "$2240",
      status: "Confirmed",
    },
  ];

  return (
    <div className="dashboard-container">
      {/* HEADER */}

      <div className="dashboard-header">
        <div>
          <h1>My Dashboard</h1>
          <p>Welcome back, Alice! Manage your bookings and account settings.</p>
        </div>

        <button className="find-btn">Find a Stay</button>
      </div>

      <div className="dashboard-grid">
        {/* LEFT SIDEBAR */}

        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="avatar">AJ</div>

            <h3>Alice Johnson</h3>

            <p className="email">alice@example.com</p>

            <span className="role">Guest</span>

            <div className="profile-info">
              <p>📧 alice@example.com</p>
              <p>📞 +1 (415) 555-0142</p>
              <p>📍 San Francisco, CA</p>
              <p>📅 Member since January 2024</p>
            </div>

            <button className="edit-btn">Edit Profile</button>
          </div>

          <div className="stats-card">
            <h4>MY STATS</h4>

            <p>
              Total Bookings <span>2</span>
            </p>
            <p>
              Confirmed <span className="green">2</span>
            </p>
            <p>
              Pending <span className="orange">0</span>
            </p>
            <p>
              Cancelled <span className="red">0</span>
            </p>
          </div>

          <div className="quick-card">
            <h4>QUICK ACTIONS</h4>

            <button className="browse">Browse Properties</button>

            <button className="logout">Sign Out</button>
          </div>
        </div>

        {/* RIGHT CONTENT */}

        <div className="dashboard-content">
          {/* TABS */}

          <div className="tabs">
            <button
              className={tab === "booking" ? "active" : ""}
              onClick={() => setTab("booking")}
            >
              Booking History
            </button>

            <button
              className={tab === "profile" ? "active" : ""}
              onClick={() => setTab("profile")}
            >
              Profile Settings
            </button>
          </div>

          {/* BOOKING TAB */}

          {tab === "booking" && (
            <div className="booking-table">
              <div className="filters">
                <span>Filter:</span>
                <button className="active">All</button>
                <button>Confirmed</button>
                <button>Pending</button>
                <button>Cancelled</button>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>PROPERTY</th>
                    <th>DATES</th>
                    <th>GUESTS</th>
                    <th>TOTAL</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={i}>
                      <td>
                        <strong>{b.property}</strong>
                        <p>{b.location}</p>
                      </td>

                      <td>
                        <p>{b.date}</p>
                        <span>{b.nights}</span>
                      </td>

                      <td>{b.guests}</td>

                      <td>{b.total}</td>

                      <td>
                        <span className="status confirmed">{b.status}</span>
                      </td>

                      <td>
                        <button className="view-btn">View</button>
                        <button className="review-btn">Write Review</button>
                        <button className="cancel-btn">Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* PROFILE TAB */}

          {tab === "profile" && (
            <div className="profile-form">
              <h3>Profile Information</h3>

              <div className="form-grid">
                <div>
                  <label>Full Name</label>
                  <input defaultValue="Alice Johnson" />
                </div>

                <div>
                  <label>Email Address</label>
                  <input defaultValue="alice@example.com" />
                </div>

                <div>
                  <label>Phone Number</label>
                  <input defaultValue="+1 (415) 555-0142" />
                </div>

                <div>
                  <label>Location</label>
                  <input defaultValue="San Francisco, CA" />
                </div>
              </div>

              <label>Bio</label>

              <textarea placeholder="Tell us about yourself..."></textarea>

              <div className="form-buttons">
                <button className="save">Save Changes</button>

                <button className="cancel">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
