"use client";

import "./page.css";
import Image from "next/image";

export default function HostDashboard() {
  const bookings = [
    {
      guest: "Alice Johnson",
      property: "Tropical Villa with Private Pool",
      date: "2025-03-15 → 2025-03-20",
      total: "$925",
      status: "confirmed",
      avatar: "AJ",
    },
    {
      guest: "Bob Williams",
      property: "Modern City Apartment – Skyline",
      date: "2025-04-01 → 2025-04-05",
      total: "$880",
      status: "pending",
      avatar: "BW",
    },
    {
      guest: "Bob Williams",
      property: "Charming Bali Bamboo House",
      date: "2025-04-18 → 2025-04-22",
      total: "$352",
      status: "confirmed",
      avatar: "BW",
    },
    {
      guest: "Emma Wilson",
      property: "Tropical Villa with Private Pool",
      date: "2025-08-05 → 2025-08-10",
      total: "$925",
      status: "confirmed",
      avatar: "EW",
    },
  ];

  const properties = [
    {
      name: "Tropical Villa with Private Pool",
      price: "$185/night",
      img: "/img/property1.jpg",
    },
    {
      name: "Modern City Apartment – Skyline View",
      price: "$220/night",
      img: "/img/property2.jpg",
    },
    {
      name: "Charming Bali Bamboo House",
      price: "$88/night",
      img: "/img/property3.jpg",
    },
  ];

  return (
    <div className="dashboard">
      {/* HEADER */}

      <div className="dashboard-header">
        <h1>Welcome back, Made! 👋</h1>
        <p>Here's an overview of your hosting activity</p>
      </div>

      {/* STATS */}

      <div className="stats">
        <div className="stat-card">
          <p>My Properties</p>
          <h2>3</h2>
          <span className="green">↑ +1 this month</span>
        </div>

        <div className="stat-card">
          <p>Total Bookings</p>
          <h2>4</h2>
          <span className="green">↑ +3 this week</span>
        </div>

        <div className="stat-card">
          <p>Total Revenue</p>
          <h2>$2,202</h2>
          <span className="green">↑ +12% vs last month</span>
        </div>

        <div className="stat-card">
          <p>Avg. Rating</p>
          <h2>4.8 ⭐</h2>
          <span className="green">↑ Based on 47 reviews</span>
        </div>
      </div>

      {/* MAIN GRID */}

      <div className="dashboard-grid">
        {/* BOOKINGS */}

        <div className="card">
          <div className="card-header">
            <h3>Recent Bookings</h3>
            <a>View All →</a>
          </div>

          <table>
            <thead>
              <tr>
                <th>Guest</th>
                <th>Property</th>
                <th>Dates</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b, i) => (
                <tr key={i}>
                  <td className="guest">
                    <div className="avatar">{b.avatar}</div>

                    <div>
                      <p>{b.guest}</p>
                      <span>2 guests</span>
                    </div>
                  </td>

                  <td>{b.property}</td>

                  <td>{b.date}</td>

                  <td>{b.total}</td>

                  <td>
                    <span className={`status ${b.status}`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SIDEBAR */}

        <div className="side">
          {/* PROPERTIES */}

          <div className="card">
            <div className="card-header">
              <h3>My Properties</h3>
              <a>View All →</a>
            </div>

            {properties.map((p, i) => (
              <div className="property" key={i}>
                <Image src={p.img} alt="" width={50} height={50} />

                <div>
                  <p>{p.name}</p>
                  <span>⭐ 4.9 · {p.price}</span>
                </div>

                <span className="approved">Approved</span>
              </div>
            ))}

            <button className="add-btn">+ Add New Property</button>
          </div>

          {/* HOST TIPS */}

          <div className="tips">
            <h4>💡 Host Tips</h4>

            <ul>
              <li>Respond to bookings within 24 hours</li>
              <li>Update your calendar regularly</li>
              <li>Add high-quality photos to boost views</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
