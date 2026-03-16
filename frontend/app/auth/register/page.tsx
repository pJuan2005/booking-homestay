"use client";

import "./page.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [role, setRole] = useState("guest");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="register-wrapper">
      {/* LOGO */}

      <div className="logo">
        <div className="logo-icon">
          <Image src="/img/icon-home.svg" alt="" width={14} height={14} />
        </div>

        <span>HomeStay</span>
      </div>

      {/* CARD */}

      <div className="register-card">
        <h2>Create your account</h2>
        <p className="subtitle">
          Join thousands of travelers and hosts worldwide
        </p>

        {/* ROLE */}

        <p className="role-title">I want to join as a...</p>

        <div className="role-select">
          <div
            className={`role-box ${role === "guest" ? "active" : ""}`}
            onClick={() => setRole("guest")}
          >
            <span>👤</span>
            <h4>Guest</h4>
            <p>Browse & book stays</p>
          </div>

          <div
            className={`role-box ${role === "host" ? "active" : ""}`}
            onClick={() => setRole("host")}
          >
            <span>🏠</span>
            <h4>Host</h4>
            <p>List my property</p>
          </div>
        </div>

        {/* FORM */}

        <form className="register-form">
          <div className="form-group">
            <label>Full Name</label>

            <input type="text" placeholder="John Doe" />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input type="email" placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 6 characters"
              />

              <span
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <input type="password" placeholder="Repeat your password" />
          </div>

          {/* TERMS */}

          <p className="terms">
            By registering, you agree to our
            <a href="#"> Terms of Service </a>
            and
            <a href="#"> Privacy Policy</a>
          </p>

          {/* BUTTON */}

          <button className="register-btn">Create Account →</button>
        </form>

        {/* LOGIN */}

        <p className="login-link">
          Already have an account?
          <Link href="/auth/login">Sign in</Link>
        </p>
      </div>

      <Link href="/" className="back-home">
        ← Back to HomeStay
      </Link>
    </div>
  );
}
