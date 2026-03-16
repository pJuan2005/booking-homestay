"use client";

import "./page.css";

export default function HostProfile() {
  return (
    <div className="profile-page">
      {/* HEADER */}

      <div className="profile-header">
        <div>
          <h1>My Profile</h1>
          <p>Manage your host profile information</p>
        </div>
      </div>

      <div className="profile-grid">
        {/* LEFT CARD */}

        <div className="profile-card">
          <div className="avatar">MW</div>

          <h3>Made Wijaya</h3>
          <p className="host">Superhost · Since 2022</p>

          <span className="badge">Host</span>

          <div className="stats">
            <div>
              <p>Properties</p>
              <strong>3</strong>
            </div>

            <div>
              <p>Bookings</p>
              <strong>47</strong>
            </div>

            <div>
              <p>Avg Rating</p>
              <strong className="rating">4.9 ★</strong>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}

        <div className="profile-form">
          <h3>Personal Information</h3>

          <div className="form-grid">
            <div>
              <label>Full Name</label>
              <input defaultValue="Made Wijaya" />
            </div>

            <div>
              <label>Email Address</label>
              <input defaultValue="made@example.com" />
            </div>

            <div>
              <label>Phone Number</label>
              <input defaultValue="+62 812 345 6789" />
            </div>

            <div>
              <label>Location</label>
              <input defaultValue="Seminyak, Bali, Indonesia" />
            </div>

            <div>
              <label>Website</label>
              <input defaultValue="www.madewijayabali.com" />
            </div>

            <div>
              <label>Languages Spoken</label>
              <input defaultValue="English, Bahasa Indonesia" />
            </div>
          </div>

          <label>Bio / About Me</label>

          <textarea
            rows={4}
            defaultValue="Welcome to my homestay! I love hosting guests from around the world."
          />

          <button className="save-btn">Save Changes</button>
        </div>
      </div>

      {/* PASSWORD */}

      <div className="password-card">
        <h3>Change Password</h3>

        <div className="password-grid">
          <div>
            <label>Current Password</label>
            <input type="password" />
          </div>

          <div>
            <label>New Password</label>
            <input type="password" />
          </div>

          <div>
            <label>Confirm New Password</label>
            <input type="password" />
          </div>
        </div>

        <button className="update-btn">Update Password</button>
      </div>
    </div>
  );
}
