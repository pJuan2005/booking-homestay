"use client";

import "./page.css";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function PropertyDetail() {
  const { id } = useParams();

  const property = {
    name: "Tropical Villa with Private Pool",
    location: "Seminyak, Bali, Indonesia",
    rating: 4.7,
    reviews: 3,
    price: 185,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    host: "Made Wijaya",
    description:
      "Escape to this stunning tropical villa nestled in the heart of Seminyak. Featuring lush gardens, a private pool, open-air living spaces, and exquisite Balinese décor.",
    images: ["/img/property1.jpg", "/img/property2.jpg", "/img/property3.jpg"],
  };

  return (
    <div className="property-container">
      {/* HEADER */}

      <div className="property-header">
        <p className="breadcrumb">← Back / Listings</p>

        <h1>{property.name}</h1>

        <span className="location">📍 {property.location}</span>
      </div>

      {/* GALLERY */}

      <div className="gallery">
        <Image
          src={property.images[0]}
          alt=""
          width={1000}
          height={450}
          className="main-image"
        />

        <div className="thumbs">
          {property.images.map((img, i) => (
            <Image key={i} src={img} alt="" width={140} height={90} />
          ))}
        </div>
      </div>

      <div className="property-grid">
        {/* LEFT SIDE */}

        <div className="property-left">
          {/* INFO ROW */}

          <div className="info-row">
            <span>👥 Up to {property.guests} Guests</span>
            <span>🛏 {property.bedrooms} Bedrooms</span>
            <span>🛁 {property.bathrooms} Bathrooms</span>
            <span>⭐ {property.rating} Rating</span>
          </div>

          {/* HOST */}

          <div className="host-card">
            <div className="avatar">MW</div>

            <div>
              <h4>Hosted by {property.host}</h4>
              <p>Superhost · Member since 2022</p>
            </div>
          </div>

          {/* DESCRIPTION */}

          <div className="card">
            <h3>About This Property</h3>

            <p>{property.description}</p>
          </div>

          {/* AMENITIES */}

          <div className="card">
            <h3>Amenities</h3>

            <div className="amenities">
              <span>WiFi</span>
              <span>Private Pool</span>
              <span>Full Kitchen</span>
              <span>Air Conditioning</span>
              <span>Parking</span>
              <span>Beach Access</span>
              <span>Outdoor Shower</span>
              <span>BBQ Grill</span>
            </div>
          </div>

          {/* REVIEW NOTICE */}

          <div className="review-notice">
            ✔ You have already reviewed this stay
          </div>

          {/* REVIEWS */}

          <div className="reviews">
            <h3>Guest Reviews</h3>

            <div className="review">
              <div className="review-avatar">A</div>

              <div className="review-content">
                <strong>Alice J.</strong>

                <p>
                  Absolutely magical stay! The villa exceeded all expectations.
                </p>
              </div>

              <span className="rating">★★★★★</span>
            </div>

            <div className="review">
              <div className="review-avatar">T</div>

              <div className="review-content">
                <strong>Tom K.</strong>

                <p>Perfect in every way. The location is unbeatable.</p>
              </div>

              <span className="rating">★★★★★</span>
            </div>

            <div className="review">
              <div className="review-avatar">L</div>

              <div className="review-content">
                <strong>Laura B.</strong>

                <p>Stunning property with a truly beautiful pool.</p>
              </div>

              <span className="rating">★★★★☆</span>
            </div>
          </div>
        </div>

        {/* BOOKING CARD */}

        <div className="booking-card">
          <div className="price">
            <h2>${property.price}</h2>
            <span>/ night</span>
          </div>

          <input type="date" />

          <input type="date" />

          <input type="number" placeholder="Guests" />

          <button className="book-btn">Book Now</button>

          <p className="note">You won't be charged yet</p>
        </div>
      </div>
    </div>
  );
}
