import Link from "next/link";
import { Home, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="hs-footer">
      <div className="container">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <Home size={18} color="#fff" />
              </div>
              <span style={{ color: "#f1f5f9", fontWeight: 800, fontSize: "1.3rem", letterSpacing: -0.5 }}>HomeStay</span>
            </div>
            <p style={{ fontSize: "0.87rem", lineHeight: 1.75, color: "#94a3b8", marginBottom: 20, maxWidth: 300 }}>
              Find your perfect home away from home. We connect travelers with unique, comfortable homestays around the world.
            </p>
            <div style={{ display: "flex", gap: 0 }}>
              {[
                { icon: <Twitter size={15} />, href: "#" },
                { icon: <Facebook size={15} />, href: "#" },
                { icon: <Instagram size={15} />, href: "#" },
                { icon: <Youtube size={15} />, href: "#" },
              ].map((item, i) => (
                <a key={i} href={item.href} className="hs-social-btn">{item.icon}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5>Explore</h5>
            <Link href="/">Home</Link>
            <Link href="/listings">Explore Stays</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <a href="#">How It Works</a>
          </div>

          {/* Hosting */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5>Hosting</h5>
            <Link href="/auth/register">Become a Host</Link>
            <Link href="/auth/login">Host Login</Link>
            <a href="#">Host Guidelines</a>
            <a href="#">Pricing Plans</a>
            <a href="#">Success Stories</a>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5>Support</h5>
            <a href="#">Help Center</a>
            <a href="#">Safety</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>

          {/* Contact */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5>Contact</h5>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <MapPin size={14} style={{ flexShrink: 0, marginTop: 3, color: "#2563EB" }} />
                <span style={{ fontSize: "0.87rem", lineHeight: 1.6, color: "#94a3b8" }}>123 Stay Ave,<br />San Francisco, CA</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Mail size={14} style={{ color: "#2563EB", flexShrink: 0 }} />
                <a href="mailto:hello@homestay.com" style={{ fontSize: "0.87rem" }}>hello@homestay.com</a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Phone size={14} style={{ color: "#2563EB", flexShrink: 0 }} />
                <a href="tel:+14155550123" style={{ fontSize: "0.87rem" }}>+1 (415) 555-0123</a>
              </div>
            </div>
          </div>
        </div>

        <hr className="hs-footer-divider" />

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <p style={{ margin: 0, fontSize: "0.83rem", color: "#64748b" }}>
            © 2026 HomeStay. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="#" style={{ fontSize: "0.83rem", color: "#64748b" }}>Privacy</a>
            <a href="#" style={{ fontSize: "0.83rem", color: "#64748b" }}>Terms</a>
            <a href="#" style={{ fontSize: "0.83rem", color: "#64748b" }}>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
