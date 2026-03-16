import Image from "next/image";
import "./page.css";

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-container">
          <p className="about-tag">About HomeStay Platform</p>

          <h1 className="about-title">Redefining the Way the World Stays</h1>

          <p className="about-desc">
            HomeStay is a global marketplace connecting travelers with unique,
            authentic accommodations — and giving hosts the tools to build
            world-class hospitality businesses.
          </p>

          <div className="about-actions">
            <button className="btn-explore">
              Explore Properties{" "}
              <Image
                src={"/img/view-all-white.svg"}
                alt="next"
                width={16}
                height={16}
              />
            </button>
            <button className="btn-host">Become a Host</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="about-stats">
        <div className="stats-container">
          <div className="stats-box">
            <div className="stats-icon">
              <Image src="/img/about-1.svg" alt="" width={20} height={20} />
            </div>
            <p className="stats-number">12,400+</p>
            <p className="stats-desc">Properties Listed</p>
          </div>

          <div className="stats-box">
            <div className="stats-icon">
              <Image src="/img/about-2.svg" alt="" width={20} height={20} />
            </div>
            <p className="stats-number">85,000+</p>
            <p className="stats-desc">Happy Guests</p>
          </div>

          <div className="stats-box">
            <div className="stats-icon">
              <Image src="/img/about-3.svg" alt="" width={20} height={20} />
            </div>
            <p className="stats-number">64</p>
            <p className="stats-desc">Countries</p>
          </div>

          <div className="stats-box">
            <div className="stats-icon">
              <Image src="/img/about-4.svg" alt="" width={20} height={20} />
            </div>
            <p className="stats-number">4.9 / 5</p>
            <p className="stats-desc">Average Rating</p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="about-mission">
        <div className="mission-container">
          <div className="mission-left">
            <Image
              src="/img/about-5.jpg"
              alt="about"
              width={624}
              height={420}
              className="mission-img"
            />
          </div>

          <div className="mission-right">
            <p className="mission-tag">OUR MISSION</p>

            <h2 className="mission-title">
              Making Authentic Travel Accessible to Everyone
            </h2>

            <p className="mission-desc">
              We believe that the best travel experiences happen when you stay
              like a local. HomeStay was founded to bridge the gap between
              travelers seeking genuine cultural immersion and homeowners
              wanting to share their spaces with the world.
            </p>

            <div className="mission-desc">
              Our platform combines the warmth of a personal recommendation with
              the trust of a verified marketplace — ensuring every stay is safe,
              comfortable, and memorable.
            </div>

            <ul className="mission-list">
              <li>Verified host profiles and listings</li>
              <li>Secure end-to-end encrypted payments</li>
              <li>Transparent reviews and rating system</li>
            </ul>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <p className="values-tag">OUR VALUES</p>

        <h2 className="values-title">What We Stand For</h2>

        <p className="values-desc">
          Our core values guide every product decision, every hire, and every
          partnership we make.
        </p>

        <div className="values-grid">
          <div className="value-box">
            <div className="icon-value">
              <Image
                src={"/img/about-6.svg"}
                alt="about"
                width={24}
                height={24}
              />
            </div>
            <p className="value-title">Guest-First Always</p>
            <p className="value-text">
              Every feature and decision starts with what’s best for the
              traveler.
            </p>
          </div>

          <div className="value-box">
            <div className="icon-value">
              <Image
                src={"/img/about-7.svg"}
                alt="about"
                width={24}
                height={24}
              />
            </div>
            <p className="value-title">Trust & Safety</p>
            <p className="value-text">
              Verified hosts and secure payments ensure every booking is safe.
            </p>
          </div>

          <div className="value-box">
            <div className="icon-value">
              <Image
                src={"/img/about-8.svg"}
                alt="about"
                width={24}
                height={24}
              />
            </div>
            <p className="value-title">Host Empowerment</p>
            <p className="value-text">
              Tools and insights help hosts build thriving businesses.
            </p>
          </div>

          <div className="value-box">
            <div className="icon-value">
              <Image
                src={"/img/about-9.svg"}
                alt="about"
                width={24}
                height={24}
              />
            </div>
            <p className="value-title">Seamless Technology</p>
            <p className="value-text">
              Our platform makes booking effortless from search to checkout.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="about-how">
        <p className="how-tag">BUSINESS MODEL</p>

        <h2 className="how-title">How HomeStay Works</h2>

        <div className="how-list">
          <div className="how-step">
            <p className="step-number">01</p>
            <p className="step-title">Search & Discover</p>
            <p className="step-desc">
              Browse thousands of homestays worldwide.
            </p>
          </div>

          <div className="how-step">
            <p className="step-number">02</p>
            <p className="step-title">Book Instantly</p>
            <p className="step-desc">
              Choose your dates and confirm your stay.
            </p>
          </div>

          <div className="how-step">
            <p className="step-number">03</p>
            <p className="step-title">Experience & Review</p>
            <p className="step-desc">
              Enjoy your stay and share your experience.
            </p>
          </div>

          <div className="how-step">
            <p className="step-number">04</p>
            <p className="step-title">Host Your Space</p>
            <p className="step-desc">
              List your property and welcome travelers.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="about-team">
        <p className="team-tag">OUR TEAM</p>

        <h2 className="team-title">The People Behind HomeStay</h2>

        <Image
          src="/img/about-10.jpg"
          alt=""
          width={1296}
          height={320}
          className="team-banner"
        />

        <div className="team-members">
          <div className="member">
            <div className="avatar">JM</div>
            <p className="member-name">James Mitchell</p>
            <p className="member-role">CEO & Co-Founder</p>
          </div>

          <div className="member">
            <div className="avatar">SC</div>
            <p className="member-name">Sarah Chen</p>
            <p className="member-role">CTO & Co-Founder</p>
          </div>

          <div className="member">
            <div className="avatar">PS</div>
            <p className="member-name">Priya Sharma</p>
            <p className="member-role">Head of Product</p>
          </div>

          <div className="member">
            <div className="avatar">EL</div>
            <p className="member-name">Erik Larsen</p>
            <p className="member-role">Head of Growth</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2 className="cta-title">Ready to Experience HomeStay?</h2>

        <p className="cta-desc">
          Join thousands of travelers discovering the future of travel stays.
        </p>

        <div className="cta-buttons">
          <button className="cta-primary">
            Start Exploring
            {/* <Image
              src={"/img/view-all-white.svg"}
              alt="about"
              width={16}
              height={16}
            /> */}
          </button>
          <button className="cta-secondary">Contact Us</button>
        </div>
      </section>
    </>
  );
}
