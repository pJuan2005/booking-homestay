import Image from "next/image";
import "./page.css";

export default function Home() {
  return (
    <>
      <main>
        <div className="container-home">
          <section className="intro">
            <div className="trust">
              <div className="icon-trust">
                <Image
                  src={"/img/trust.svg"}
                  alt="icon-trust"
                  width={14}
                  height={14}
                />
                <p className="desc-trust">
                  Trusted by 50,000+ travelers worldwide
                </p>
              </div>
            </div>
            <div className="title-big-top">Find Your Perfect</div>
            <div className="title-big-bottom">
              <span className="noi">Home Away</span> From Home
            </div>
            <div className="desc-title-big">
              Discover unique homestays, cozy cabins, and luxury villas across
              80+ countries. Book with confidence.
            </div>
            <div className="form-filter">
              <form action="#!">
                <div className="list-filter">
                  <div className="filter">
                    <div className="top-filter">
                      <Image
                        src={"/img/gps.svg"}
                        alt="icon-location"
                        width={14}
                        height={14}
                      />
                      <p className="name-filter"> Location</p>
                    </div>
                    <div className="bottom-filter">
                      <input type="text" placeholder="Where to go?" />
                    </div>
                  </div>
                  <div className="filter">
                    <div className="top-filter">
                      <Image
                        src={"/img/date.svg"}
                        alt="icon-location"
                        width={14}
                        height={14}
                      />
                      <p className="name-filter"> Check-In</p>
                    </div>
                    <div className="bottom-filter">
                      <input type="date" />
                    </div>
                  </div>
                  <div className="filter">
                    <div className="top-filter">
                      <Image
                        src={"/img/date.svg"}
                        alt="icon-location"
                        width={14}
                        height={14}
                      />
                      <p className="name-filter"> Check-Out</p>
                    </div>
                    <div className="bottom-filter">
                      <input type="date" />
                    </div>
                  </div>
                  <div className="filter">
                    <div className="top-filter">
                      <Image
                        src={"/img/guest.svg"}
                        alt="icon-guest"
                        width={14}
                        height={14}
                      />
                      <p className="name-filter"> Guests</p>
                    </div>
                    <div className="bottom-filter">
                      <input type="text" />
                    </div>
                  </div>
                  <div className="action-filter">
                    <button className="btn-action-filter">
                      <Image
                        src={"/img/search.svg"}
                        alt="search"
                        width={14}
                        height={14}
                      />
                    </button>
                  </div>
                </div>
                <div className="list-location">
                  <button className="location">Bali 🌴</button>
                  <button className="location">Paris 🗼</button>
                  <button className="location">Tokyo 🏯</button>
                  <button className="location">New York 🌆</button>
                  <button className="location">Cabin 🏡</button>
                  <button className="location">Villa 🏖️</button>
                </div>
              </form>
            </div>
            <div className="thanhtuu">
              <div className="box-thanhtuu">
                <div className="thanhtuu-top">10K+</div>
                <div className="thanhtuu-bottom">Properties</div>
              </div>
              <div className="box-thanhtuu">
                <div className="thanhtuu-top">80+</div>
                <div className="thanhtuu-bottom">Countries</div>
              </div>
              <div className="box-thanhtuu">
                <div className="thanhtuu-top">50K+</div>
                <div className="thanhtuu-bottom">Happy Guests</div>
              </div>
              <div className="box-thanhtuu">
                <div className="thanhtuu-top">4.9★</div>
                <div className="thanhtuu-bottom">Average Rating</div>
              </div>
            </div>
          </section>
          <section className="featured">
            <div className="intro-featured">
              <div className="intro-featured-left">
                <div className="title-featured">Featured Homestays</div>
                <p className="desc-title-featured">
                  Handpicked properties loved by our guests
                </p>
              </div>
              <div className="intro-featured-right">
                <p className="action-view-all">View All </p>
                <Image
                  src={"/img/view-all.svg"}
                  alt="icon-arrow-right"
                  width={14}
                  height={14}
                />
              </div>
            </div>
            <div className="list-featured">
              <div className="row-list-featured">
                <div className="container-featured">
                  <div className="img-featured">
                    <Image
                      className="pic-home"
                      src={"/img/home1.png"}
                      alt="img-featured"
                      width={414}
                      height={210}
                    />
                  </div>
                  <div className="info-featured">
                    <div className="info-featured-top">
                      <div className="featured-top-left">Villa</div>
                      <div className="featured-top-right">
                        <Image
                          src={"/img/star.svg"}
                          alt="icon-star"
                          width={14}
                          height={14}
                        />
                        <p className="rating-featured">4.9</p>
                        <p className="number-rate">(142)</p>
                      </div>
                    </div>
                    <div className="featured-content">
                      <p className="name-home">
                        Tropical Villa with Private Pool
                      </p>
                      <div className="location-home">
                        <Image
                          src={"/img/gps-gray.svg"}
                          alt="icon-location"
                          width={14}
                          height={14}
                        />
                        <p className="name-location">
                          Seminyak, Bali, Indonesia
                        </p>
                      </div>
                      <div className="desc-home">
                        Escape to this stunning tropical villa nestled in the
                        heart of Seminyak. Featuring lush gardens, a private
                        pool, open-air living spaces, and exquisite Balinese
                        décor, this retreat offers total privacy and serenity.
                        The villa is located just 10 minutes from world-class
                        beaches, restaurants, and nightlife. Perfect for couples
                        or small families seeking a luxurious, authentic
                        Balinese experience.
                      </div>
                    </div>
                    <div className="featured-bottom">
                      <div className="price">
                        $185 <span className="night">/ night</span>
                      </div>
                      <div className="details">
                        <p className="title-btn-details">View Details</p>
                        <Image
                          src={"/img/view-all-white.svg"}
                          alt="icon-arrow-right"
                          width={14}
                          height={14}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-featured">
                  <div className="img-featured">
                    <Image
                      className="pic-home"
                      src={"/img/home2.png"}
                      alt="img-featured"
                      width={414}
                      height={210}
                    />
                  </div>
                  <div className="info-featured">
                    <div className="info-featured-top">
                      <div className="featured-top-left">Cabin</div>
                      <div className="featured-top-right">
                        <Image
                          src={"/img/star.svg"}
                          alt="icon-star"
                          width={14}
                          height={14}
                        />
                        <p className="rating-featured">4.8</p>
                        <p className="number-rate">(89)</p>
                      </div>
                    </div>
                    <div className="featured-content">
                      <p className="name-home">Cozy Mountain Cabin Retreat</p>
                      <div className="location-home">
                        <Image
                          src={"/img/gps-gray.svg"}
                          alt="icon-location"
                          width={14}
                          height={14}
                        />
                        <p className="name-location">Aspen, Colorado, USA</p>
                      </div>
                      <div className="desc-home">
                        A warm and inviting mountain cabin set among towering
                        pines with breathtaking views. Wake up to the sound of
                        nature, enjoy evenings by the fire, and explore the
                        Rockies just steps away. This cabin blends rustic charm
                        with modern comforts for an unforgettable mountain
                        getaway.
                      </div>
                    </div>
                    <div className="featured-bottom">
                      <div className="price">
                        $130 <span className="night">/ night</span>
                      </div>
                      <div className="details">
                        <p className="title-btn-details">View Details</p>
                        <Image
                          src={"/img/view-all-white.svg"}
                          alt="icon-arrow-right"
                          width={14}
                          height={14}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-featured">
                  <div className="img-featured">
                    <Image
                      className="pic-home"
                      src={"/img/home3.png"}
                      alt="img-featured"
                      width={414}
                      height={210}
                    />
                  </div>
                  <div className="info-featured">
                    <div className="info-featured-top">
                      <div className="featured-top-left">Apartment</div>
                      <div className="featured-top-right">
                        <Image
                          src={"/img/star.svg"}
                          alt="icon-star"
                          width={14}
                          height={14}
                        />
                        <p className="rating-featured">4.7</p>
                        <p className="number-rate">(204)</p>
                      </div>
                    </div>
                    <div className="featured-content">
                      <p className="name-home">
                        Modern City Apartment – Skyline View
                      </p>
                      <div className="location-home">
                        <Image
                          src={"/img/gps-gray.svg"}
                          alt="icon-location"
                          width={14}
                          height={14}
                        />
                        <p className="name-location">
                          Manhattan, New York, USA
                        </p>
                      </div>
                      <div className="desc-home">
                        Experience New York like a local in this sleek, modern
                        apartment on the 32nd floor with stunning panoramic
                        skyline views. Fully equipped with premium appliances,
                        high-speed internet, and just minutes from Times Square,
                        Central Park, and world-class dining. Ideal for business
                        travelers and city explorers.
                      </div>
                    </div>
                    <div className="featured-bottom">
                      <div className="price">
                        $220 <span className="night">/ night</span>
                      </div>
                      <div className="details">
                        <p className="title-btn-details">View Details</p>
                        <Image
                          src={"/img/view-all-white.svg"}
                          alt="icon-arrow-right"
                          width={14}
                          height={14}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row-list-featured">
                <div className="container-featured">
                  <div className="img-featured">
                    <Image
                      className="pic-home"
                      src={"/img/home1.png"}
                      alt="img-featured"
                      width={414}
                      height={210}
                    />
                  </div>
                  <div className="info-featured">
                    <div className="info-featured-top">
                      <div className="featured-top-left">Villa</div>
                      <div className="featured-top-right">
                        <Image
                          src={"/img/star.svg"}
                          alt="icon-star"
                          width={14}
                          height={14}
                        />
                        <p className="rating-featured">4.9</p>
                        <p className="number-rate">(142)</p>
                      </div>
                    </div>
                    <div className="featured-content">
                      <p className="name-home">
                        Tropical Villa with Private Pool
                      </p>
                      <div className="location-home">
                        <Image
                          src={"/img/gps-gray.svg"}
                          alt="icon-location"
                          width={14}
                          height={14}
                        />
                        <p className="name-location">
                          Seminyak, Bali, Indonesia
                        </p>
                      </div>
                      <div className="desc-home">
                        Escape to this stunning tropical villa nestled in the
                        heart of Seminyak. Featuring lush gardens, a private
                        pool, open-air living spaces, and exquisite Balinese
                        décor, this retreat offers total privacy and serenity.
                        The villa is located just 10 minutes from world-class
                        beaches, restaurants, and nightlife. Perfect for couples
                        or small families seeking a luxurious, authentic
                        Balinese experience.
                      </div>
                    </div>
                    <div className="featured-bottom">
                      <div className="price">
                        $185 <span className="night">/ night</span>
                      </div>
                      <div className="details">
                        <p className="title-btn-details">View Details</p>
                        <Image
                          src={"/img/view-all-white.svg"}
                          alt="icon-arrow-right"
                          width={14}
                          height={14}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-featured">
                  <div className="img-featured">
                    <Image
                      className="pic-home"
                      src={"/img/home2.png"}
                      alt="img-featured"
                      width={414}
                      height={210}
                    />
                  </div>
                  <div className="info-featured">
                    <div className="info-featured-top">
                      <div className="featured-top-left">Cabin</div>
                      <div className="featured-top-right">
                        <Image
                          src={"/img/star.svg"}
                          alt="icon-star"
                          width={14}
                          height={14}
                        />
                        <p className="rating-featured">4.8</p>
                        <p className="number-rate">(89)</p>
                      </div>
                    </div>
                    <div className="featured-content">
                      <p className="name-home">Cozy Mountain Cabin Retreat</p>
                      <div className="location-home">
                        <Image
                          src={"/img/gps-gray.svg"}
                          alt="icon-location"
                          width={14}
                          height={14}
                        />
                        <p className="name-location">Aspen, Colorado, USA</p>
                      </div>
                      <div className="desc-home">
                        A warm and inviting mountain cabin set among towering
                        pines with breathtaking views. Wake up to the sound of
                        nature, enjoy evenings by the fire, and explore the
                        Rockies just steps away. This cabin blends rustic charm
                        with modern comforts for an unforgettable mountain
                        getaway.
                      </div>
                    </div>
                    <div className="featured-bottom">
                      <div className="price">
                        $130 <span className="night">/ night</span>
                      </div>
                      <div className="details">
                        <p className="title-btn-details">View Details</p>
                        <Image
                          src={"/img/view-all-white.svg"}
                          alt="icon-arrow-right"
                          width={14}
                          height={14}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-featured">
                  <div className="img-featured">
                    <Image
                      className="pic-home"
                      src={"/img/home3.png"}
                      alt="img-featured"
                      width={414}
                      height={210}
                    />
                  </div>
                  <div className="info-featured">
                    <div className="info-featured-top">
                      <div className="featured-top-left">Apartment</div>
                      <div className="featured-top-right">
                        <Image
                          src={"/img/star.svg"}
                          alt="icon-star"
                          width={14}
                          height={14}
                        />
                        <p className="rating-featured">4.7</p>
                        <p className="number-rate">(204)</p>
                      </div>
                    </div>
                    <div className="featured-content">
                      <p className="name-home">
                        Modern City Apartment – Skyline View
                      </p>
                      <div className="location-home">
                        <Image
                          src={"/img/gps-gray.svg"}
                          alt="icon-location"
                          width={14}
                          height={14}
                        />
                        <p className="name-location">
                          Manhattan, New York, USA
                        </p>
                      </div>
                      <div className="desc-home">
                        Experience New York like a local in this sleek, modern
                        apartment on the 32nd floor with stunning panoramic
                        skyline views. Fully equipped with premium appliances,
                        high-speed internet, and just minutes from Times Square,
                        Central Park, and world-class dining. Ideal for business
                        travelers and city explorers.
                      </div>
                    </div>
                    <div className="featured-bottom">
                      <div className="price">
                        $220 <span className="night">/ night</span>
                      </div>
                      <div className="details">
                        <p className="title-btn-details">View Details</p>
                        <Image
                          src={"/img/view-all-white.svg"}
                          alt="icon-arrow-right"
                          width={14}
                          height={14}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="popular">
            <div className="title-popular">Popular Destinations</div>
            <div className="extend-popular">
              Explore top locations loved by travelers
            </div>
            <div className="box-popular">
              <div className="popular-container">
                <Image
                  src={"/img/home8.jpg"}
                  alt="Home stay"
                  width={306}
                  height={220}
                  className="pic-popular"
                />
                <p className="name-popular">Bali</p>
                <p className="desc-popular">
                  Indonesia · <span className="number-property">128</span>{" "}
                  properties
                </p>
              </div>
              <div className="popular-container">
                <Image
                  src={"/img/home9.jpg"}
                  alt="Home stay"
                  width={306}
                  height={220}
                  className="pic-popular"
                />
                <p className="name-popular">Paris</p>
                <p className="desc-popular">
                  France · <span className="number-property">94</span>{" "}
                  properties
                </p>
              </div>
              <div className="popular-container">
                <Image
                  src={"/img/home10.jpg"}
                  alt="Home stay"
                  width={306}
                  height={220}
                  className="pic-popular"
                />
                <p className="name-popular">Tokyo</p>
                <p className="desc-popular">
                  Japan · <span className="number-property">76</span> properties
                </p>
              </div>
              <div className="popular-container">
                <Image
                  src={"/img/home11.jpg"}
                  alt="Home stay"
                  width={306}
                  height={220}
                  className="pic-popular"
                />
                <p className="name-popular">New York</p>
                <p className="desc-popular">
                  USA · <span className="number-property">215</span> properties
                </p>
              </div>
            </div>
          </section>
          <div className="section how-it-work">
            <p className="title-how">How It Works</p>
            <p className="desc-how-top">
              Book your perfect stay in 3 simple steps
            </p>
            <div className="list-how">
              <div className="how-container">
                <div className="icon-how">
                  <Image
                    src={"/img/search-blue.svg"}
                    alt="Search"
                    width={26}
                    height={26}
                  />
                </div>
                <div className="step">Step 01</div>
                <div className="name-how">Search & Discover</div>
                <div className="desc-how">
                  Browse thousands of unique homestays filtered by your
                  preferences, budget, and destination.
                </div>
              </div>
              <div className="how-container">
                <div className="icon-how">
                  <Image
                    src={"/img/date.svg"}
                    alt="Search"
                    width={26}
                    height={26}
                  />
                </div>
                <div className="step">Step 02</div>
                <div className="name-how">Book Your Stay</div>
                <div className="desc-how">
                  Select your dates, confirm your booking instantly, and receive
                  a confirmation email.
                </div>
              </div>
              <div className="how-container">
                <div className="icon-how">
                  <Image
                    src={"/img/protect.svg"}
                    alt="Search"
                    width={26}
                    height={26}
                  />
                </div>
                <div className="step">Step 03</div>
                <div className="name-how">Stay with Confidence</div>
                <div className="desc-how">
                  Enjoy your stay protected by our guest guarantee and 24/7
                  customer support.
                </div>
              </div>
            </div>
          </div>
          <section className="more-rate">
            <div className="box-more">
              <div className="icon-more">
                <Image src={"/img/protect.svg"} alt="" width={20} height={20} />
              </div>
              <div className="name-more">Secure Payments</div>
              <div className="desc-more">
                Bank-level encryption on all transactions
              </div>
            </div>
            <div className="box-more">
              <div className="icon-more">
                <Image
                  src={"/img/star-blue.svg"}
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
              <div className="name-more">Verified Reviews</div>
              <div className="desc-more">
                Only guests who've stayed can review
              </div>
            </div>
            <div className="box-more">
              <div className="icon-more">
                <Image
                  src={"/img/clock-blue.svg"}
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
              <div className="name-more">24/7 Support</div>
              <div className="desc-more">Round-the-clock assistance</div>
            </div>
            <div className="box-more">
              <div className="icon-more">
                <Image
                  src={"/img/guarantee.svg"}
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
              <div className="name-more">Best Price Guarantee</div>
              <div className="desc-more">Find it cheaper? We'll match it</div>
            </div>
          </section>
          <section className="ready">
            <p className="title-ready">Ready to List Your Property?</p>
            <p className="desc-ready">
              Join thousands of hosts earning extra income. List your space and
              reach millions of travelers.
            </p>
            <div className="bottom-ready">
              <a href="#!">
                <div className="become-host">
                  <p className="title-become">Become a Host </p>
                  <Image
                    src={"/img/next-blue.svg"}
                    alt="Next"
                    width={16}
                    height={16}
                  />
                </div>
              </a>
              <a href="#!">
                <button className="title-browse">Browse Listings</button>
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
