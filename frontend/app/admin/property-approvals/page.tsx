"use client";

import "./page.css";
import Image from "next/image";

export default function PropertyApprovals() {
  const pendingProperties = [
    {
      id: 7,
      name: "Minimalist Tokyo Studio",
      host: "Yuki Tanaka",
      location: "Tokyo",
      type: "Studio",
      price: "$95/night",
      capacity: "2 max",
      beds: "1 beds",
      img: "/img/property3.jpg",
    },
  ];

  const reviewedProperties = [
    {
      name: "Tropical Villa with Private Pool",
      host: "Made Wijaya",
      type: "Villa",
      price: "$185/night",
      status: "Approved",
      img: "/img/property1.jpg",
    },
    {
      name: "Cozy Mountain Cabin Retreat",
      host: "Sarah Connor",
      type: "Cabin",
      price: "$130/night",
      status: "Approved",
      img: "/img/property2.jpg",
    },
    {
      name: "Modern City Apartment – Skyline View",
      host: "James Rodriguez",
      type: "Apartment",
      price: "$220/night",
      status: "Approved",
      img: "/img/property3.jpg",
    },
  ];

  return (
    <div className="approval-container">
      {/* TITLE */}
      <div className="approval-title">
        <h1>Property Approvals</h1>
        <p>Review and approve pending property listings</p>
      </div>

      {/* STATS */}
      <div className="approval-stats">
        <div className="stat pending">
          <h2>1</h2>
          <p>Pending Review</p>
        </div>

        <div className="stat approved">
          <h2>7</h2>
          <p>Approved</p>
        </div>

        <div className="stat rejected">
          <h2>1</h2>
          <p>Rejected</p>
        </div>

        <div className="stat total">
          <h2>9</h2>
          <p>Total</p>
        </div>
      </div>

      {/* PENDING TABLE */}
      <div className="approval-card">
        <h3>Pending Properties (1)</h3>

        <table>
          <thead>
            <tr>
              <th>PROPERTY</th>
              <th>HOST</th>
              <th>LOCATION</th>
              <th>TYPE</th>
              <th>PRICE</th>
              <th>CAPACITY</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {pendingProperties.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="property-info">
                    <Image src={p.img} alt="" width={40} height={40} />

                    <div>
                      <p>{p.name}</p>
                      <span>ID #{p.id}</span>
                    </div>
                  </div>
                </td>

                <td>{p.host}</td>

                <td>{p.location}</td>

                <td>
                  <span className="type">{p.type}</span>
                </td>

                <td>{p.price}</td>

                <td>
                  {p.capacity}
                  <br />
                  {p.beds}
                </td>

                <td>
                  <span className="status pending">Pending</span>
                </td>

                <td className="actions">
                  <button className="btn-view">View</button>

                  <button className="btn-approve">Approve</button>

                  <button className="btn-reject">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RECENTLY REVIEWED */}

      <div className="approval-card">
        <h3>Recently Reviewed</h3>

        <table>
          <thead>
            <tr>
              <th>PROPERTY</th>
              <th>HOST</th>
              <th>TYPE</th>
              <th>PRICE</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>
            {reviewedProperties.map((p, i) => (
              <tr key={i}>
                <td>
                  <div className="property-info">
                    <Image src={p.img} alt="" width={40} height={40} />

                    <p>{p.name}</p>
                  </div>
                </td>

                <td>{p.host}</td>

                <td>
                  <span className="type">{p.type}</span>
                </td>

                <td>{p.price}</td>

                <td>
                  <span className="status approved">{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
