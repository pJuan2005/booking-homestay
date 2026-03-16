"use client";

import "./page.css";
import Image from "next/image";

export default function ManageBookings() {
  const bookings = [
    {
      id: "#BK0001",
      guest: "Alice Johnson",
      email: "alice@example.com",
      avatar: "AJ",
      property: "Tropical Villa with Private Pool",
      propertyImg: "/img/property1.jpg",
      host: "Made Wijaya",
      checkin: "2025-03-15",
      checkout: "2025-03-20",
      nights: 5,
      total: "$925",
      status: "Confirmed",
    },
    {
      id: "#BK0002",
      guest: "Bob Williams",
      email: "bob@example.com",
      avatar: "BW",
      property: "Modern City Apartment",
      propertyImg: "/img/property2.jpg",
      host: "James Rodriguez",
      checkin: "2025-04-01",
      checkout: "2025-04-05",
      nights: 4,
      total: "$880",
      status: "Pending",
    },
    {
      id: "#BK0003",
      guest: "Carol Davis",
      email: "carol@example.com",
      avatar: "CD",
      property: "Cozy Mountain Cabin",
      propertyImg: "/img/property3.jpg",
      host: "Sarah Connor",
      checkin: "2025-02-10",
      checkout: "2025-02-14",
      nights: 4,
      total: "$520",
      status: "Cancelled",
    },
  ];

  return (
    <div className="booking-container">
      {/* TITLE */}
      <div className="booking-title">
        <h1>Manage Bookings</h1>
        <p>View and manage all platform bookings</p>
      </div>

      {/* STATS */}
      <div className="booking-stats">
        <div className="stat total">
          <h2>8</h2>
          <p>Total Bookings</p>
        </div>

        <div className="stat confirmed">
          <h2>4</h2>
          <p>Confirmed</p>
        </div>

        <div className="stat pending">
          <h2>3</h2>
          <p>Pending</p>
        </div>

        <div className="stat revenue">
          <h2>$4,442</h2>
          <p>Revenue</p>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="booking-filter">
        <input
          className="search-input"
          placeholder="Search guest, property, or host..."
        />

        <div className="filter-group">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Confirmed</button>
          <button className="filter-btn">Pending</button>
          <button className="filter-btn">Cancelled</button>
        </div>
      </div>

      {/* TABLE */}
      <div className="booking-table">
        <table>
          <thead>
            <tr>
              <th>BOOKING ID</th>
              <th>GUEST</th>
              <th>PROPERTY</th>
              <th>HOST</th>
              <th>CHECK-IN</th>
              <th>CHECK-OUT</th>
              <th>NIGHTS</th>
              <th>TOTAL</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b, index) => (
              <tr key={index}>
                <td className="booking-id">{b.id}</td>

                <td>
                  <div className="guest-info">
                    <div className="avatar">{b.avatar}</div>

                    <div>
                      <p>{b.guest}</p>
                      <span>{b.email}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="property-info">
                    <Image src={b.propertyImg} alt="" width={40} height={40} />
                    <p>{b.property}</p>
                  </div>
                </td>

                <td>{b.host}</td>

                <td>{b.checkin}</td>

                <td>{b.checkout}</td>

                <td>{b.nights}</td>

                <td className="price">{b.total}</td>

                <td>
                  <span className={`status ${b.status.toLowerCase()}`}>
                    {b.status}
                  </span>
                </td>

                <td>
                  <button className="btn-update">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="table-pagination">
          <p>Showing 8 of 8 bookings</p>

          <div className="pagination-controls">
            <button className="page-btn">Previous</button>
            <button className="page-number active">1</button>
            <button className="page-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
