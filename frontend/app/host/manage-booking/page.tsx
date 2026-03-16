"use client";

import "./page.css";
import Image from "next/image";
import { useState } from "react";

export default function HostBookings() {
  const [filter, setFilter] = useState("all");

  const bookings = [
    {
      id: "#BK0001",
      guest: "Alice Johnson",
      email: "alice@example.com",
      property: "Tropical Villa with Private Pool",
      img: "/img/property1.jpg",
      checkin: "2025-03-15",
      checkout: "2025-03-20",
      nights: 5,
      guests: 2,
      total: "$925",
      status: "confirmed",
    },
    {
      id: "#BK0002",
      guest: "Bob Williams",
      email: "bob@example.com",
      property: "Modern City Apartment",
      img: "/img/property2.jpg",
      checkin: "2025-04-01",
      checkout: "2025-04-05",
      nights: 4,
      guests: 2,
      total: "$880",
      status: "pending",
    },
    {
      id: "#BK0006",
      guest: "Bob Williams",
      email: "bob@example.com",
      property: "Charming Bali Bamboo House",
      img: "/img/property3.jpg",
      checkin: "2025-04-18",
      checkout: "2025-04-22",
      nights: 4,
      guests: 2,
      total: "$352",
      status: "confirmed",
    },
    {
      id: "#BK0008",
      guest: "Emma Wilson",
      email: "emma@example.com",
      property: "Tropical Villa with Private Pool",
      img: "/img/property1.jpg",
      checkin: "2025-08-05",
      checkout: "2025-08-10",
      nights: 5,
      guests: 4,
      total: "$925",
      status: "confirmed",
    },
  ];

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="booking-page">
      {/* HEADER */}

      <div className="booking-header">
        <div>
          <h1>Bookings</h1>
          <p>Manage all reservations for your properties</p>
        </div>
      </div>

      {/* STATS */}

      <div className="booking-stats">
        <div className="stat total">
          <h2>4</h2>
          <p>Total</p>
        </div>

        <div className="stat confirmed">
          <h2>3</h2>
          <p>Confirmed</p>
        </div>

        <div className="stat pending">
          <h2>1</h2>
          <p>Pending</p>
        </div>

        <div className="stat cancelled">
          <h2>0</h2>
          <p>Cancelled</p>
        </div>
      </div>

      {/* FILTER */}

      <div className="booking-tools">
        <input className="search" placeholder="Search guest or property..." />

        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "confirmed" ? "active" : ""}
            onClick={() => setFilter("confirmed")}
          >
            Confirmed
          </button>

          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>

          <button
            className={filter === "cancelled" ? "active" : ""}
            onClick={() => setFilter("cancelled")}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* TABLE */}

      <div className="booking-table">
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Guest</th>
              <th>Property</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Nights</th>
              <th>Guests</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((b, i) => (
              <tr key={i}>
                <td className="id">{b.id}</td>

                <td>
                  <div className="guest">
                    <div className="avatar">{b.guest.charAt(0)}</div>

                    <div>
                      <p>{b.guest}</p>
                      <span>{b.email}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="property">
                    <Image src={b.img} alt="" width={40} height={30} />

                    {b.property}
                  </div>
                </td>

                <td>{b.checkin}</td>
                <td>{b.checkout}</td>
                <td>{b.nights}</td>
                <td>{b.guests}</td>
                <td>{b.total}</td>

                <td>
                  <span className={`status ${b.status}`}>{b.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
