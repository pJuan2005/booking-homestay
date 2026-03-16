"use client";

import "./page.css";

export default function ContactPage() {
  return (
    <div className="contact-page">
      {/* HERO */}

      <section className="contact-hero">
        <span className="hero-badge">Get in Touch</span>

        <h1>We'd Love to Hear From You</h1>

        <p>
          Whether you have a question, feedback, or just want to say hello — our
          team is always here to help.
        </p>
      </section>

      {/* CONTACT INFO */}

      <section className="contact-cards">
        <div className="contact-card">
          <div className="icon">📧</div>
          <h3>Email Us</h3>
          <p>hello@homestay.com</p>
          <p>support@homestay.com</p>
        </div>

        <div className="contact-card">
          <div className="icon">📞</div>
          <h3>Call Us</h3>
          <p>+1 (415) 555-0123</p>
          <p>Mon – Fri, 9am – 6pm PST</p>
        </div>

        <div className="contact-card">
          <div className="icon">📍</div>
          <h3>Visit Us</h3>
          <p>123 Stay Avenue</p>
          <p>San Francisco, CA 94107</p>
        </div>

        <div className="contact-card">
          <div className="icon">⏰</div>
          <h3>Support Hours</h3>
          <p>24/7 Guest Support</p>
          <p>Mon-Fri Host Inquiries</p>
        </div>
      </section>

      {/* CONTACT FORM */}

      <section className="contact-grid">
        {/* FORM */}

        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <p>Fill out the form below and we'll respond within 24 hours.</p>

          <div className="form-grid">
            <input placeholder="Full Name" />
            <input placeholder="Email Address" />

            <input placeholder="Category" />
            <input placeholder="Subject" />
          </div>

          <textarea placeholder="Tell us how we can help you..."></textarea>

          <button className="send-btn">Send Message</button>
        </div>

        {/* MAP + SOCIAL */}

        <div className="contact-side">
          <div className="map-card">
            <div className="map-overlay">
              <h3>San Francisco, CA</h3>
              <p>123 Stay Avenue, Suite 400</p>
            </div>
          </div>

          <div className="social-card">
            <h3>Follow Us</h3>

            <div className="social-links">
              <button>Twitter</button>
              <button>Instagram</button>
              <button>Facebook</button>
              <button>LinkedIn</button>
            </div>

            <p className="social-note">
              Stay updated with the latest homestay deals, travel tips, and
              platform updates.
            </p>
          </div>
        </div>
      </section>

      {/* OTHER SUPPORT */}

      <section className="contact-support">
        <h2>Other Ways to Reach Us</h2>
        <p>Choose the support channel that works best for you.</p>

        <div className="support-grid">
          <div className="support-card">
            <h3>Live Chat</h3>
            <p>Chat with our support team in real time.</p>
            <button>Start Chat</button>
          </div>

          <div className="support-card">
            <h3>Phone Support</h3>
            <p>Speak directly with a HomeStay specialist.</p>
            <button>Call Now</button>
          </div>

          <div className="support-card">
            <h3>Help Center</h3>
            <p>Browse 200+ articles covering bookings and hosting.</p>
            <button>Browse Articles</button>
          </div>

          <div className="support-card">
            <h3>Safety & Trust</h3>
            <p>Report safety concerns or suspicious activity.</p>
            <button>Report Issue</button>
          </div>
        </div>
      </section>
    </div>
  );
}
