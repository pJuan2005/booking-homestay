"use client";

import "./page.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-wrapper">
      {/* LOGO */}
      <div className="login-logo">
        <div className="logo-icon">
          <Image src="/img/icon-home.svg" alt="" width={14} height={14} />
        </div>

        <span className="logo-text">HomeStay</span>
      </div>

      {/* CARD */}
      <div className="login-card">
        <h2>Welcome back</h2>
        <p className="subtitle">Sign in to access your account</p>

        {/* FORM */}
        <form className="login-form">
          {/* EMAIL */}
          <div className="form-group">
            <label>Email Address</label>

            <div className="input-box">
              <input type="email" placeholder="you@example.com" />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <div className="password-header">
              <label>Password</label>
            </div>

            <div className="input-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />

              <span
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </span>
            </div>
          </div>

          {/* REMEMBER */}

          <label className="remember">
            <input type="checkbox" />
            Remember me for 30 days
          </label>

          {/* BUTTON */}

          <button className="login-btn">Sign In</button>
        </form>

        {/* REGISTER */}

        <p className="register-text">
          Don't have an account?
          <Link href="/auth/register">Create one</Link>
        </p>
      </div>

      <Link href="/" className="back-home">
        ← Back to HomeStay
      </Link>
    </div>
  );
}
