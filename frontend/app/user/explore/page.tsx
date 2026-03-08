import Image from "next/image";
import "./page.css";

export default function Explore() {
  return (
    <>
      <hr />
      <div className="explore-top">
        <div className="explore-top-left">
          <p className="title-name-web">Explore Homestays</p>
          <p className="desc-name-web">7 properties available</p>
        </div>
        <div className="explore-top-right">
          <form className="search-name-location" action="#!">
            <Image
              src={"/img/search-gray.svg"}
              alt="search"
              width={14}
              height={14}
            />
            <input
              className="search-top"
              type="text"
              placeholder="Search by name or location..."
            />
          </form>
        </div>
      </div>
      <hr />
      <div className="explore-bottom">
        <div className="explore-bottom-left">
          <div className="filter-or-cancel">
            <div className="foc-left">
              <Image
                src={"/img/filter.svg"}
                alt="filter"
                width={16}
                height={16}
              />
              <p>Filters</p>
            </div>
            <div className="foc-right">
              <Image src={"/img/huy.svg"} alt="filter" width={16} height={16} />
              <p> Clear All</p>
            </div>
          </div>
          <div className="recommend">
            <div className="recommend-left">Price Per Night</div>
            <div className="recommend-right">Up to $500</div>
          </div>
          <div className="up-to-price">
            <div className="up-to-left">$30</div>
            <div className="up-to-right">$500+</div>
          </div>
          <div className="list-prototype">
            <div className="title-list">Property Type</div>
            <div className="list-data">
              <button className="prototype filter-active">All</button>
              <button className="prototype">Villa</button>
              <button className="prototype">Apartment</button>
              <button className="prototype">Cabin</button>
              <button className="prototype">Cottage</button>
              <button className="prototype">Studio</button>
              <button className="prototype">House</button>
              <button className="prototype">Penthouse</button>
            </div>
          </div>
          <div className="list-location">
            <div className="title-list-location">Location</div>
            <div className="list-data-location">
              <div className="data-location">
                <Image
                  src={"/img/gps-gray.svg"}
                  alt="Location"
                  width={12}
                  height={12}
                />
                <p className="name-data-location">Bali, Indonesia</p>
              </div>
              <div className="data-location">
                <Image
                  src={"/img/gps-gray.svg"}
                  alt="Location"
                  width={12}
                  height={12}
                />
                <p className="name-data-location">Aspen, Colorado, USA</p>
              </div>
              <div className="data-location">
                <Image
                  src={"/img/gps-gray.svg"}
                  alt="Location"
                  width={12}
                  height={12}
                />
                <p className="name-data-location">Manhattan, New York, USA</p>
              </div>
              <div className="data-location">
                <Image
                  src={"/img/gps-gray.svg"}
                  alt="Location"
                  width={12}
                  height={12}
                />
                <p className="name-data-location">Phuket, Thailand</p>
              </div>
              <div className="data-location">
                <Image
                  src={"/img/gps-gray.svg"}
                  alt="Location"
                  width={12}
                  height={12}
                />
                <p className="name-data-location">Bergen, Norway</p>
              </div>
              <div className="data-location">
                <Image
                  src={"/img/gps-gray.svg"}
                  alt="Location"
                  width={12}
                  height={12}
                />
                <p className="name-data-location">Paris, France</p>
              </div>
              <div className="data-location">
                <Image
                  src={"/img/gps-gray.svg"}
                  alt="Location"
                  width={12}
                  height={12}
                />
                <p className="name-data-location">Tokyo, Japan</p>
              </div>
            </div>
          </div>
          <div className="see-rate">
            <p className="title-rate">Minimum Rating</p>
            <div className="list-data-rate">
              <div className="data-rate active-data-rate">Any</div>
              <div className="data-rate-star">
                <p className="number-star">4+</p>
                <Image
                  src={"/img/star.svg"}
                  alt="Star"
                  width={13}
                  height={13}
                />
              </div>
              <div className="data-rate-star">
                <p className="number-star">4.5+</p>
                <Image
                  src={"/img/star.svg"}
                  alt="Star"
                  width={13}
                  height={13}
                />
              </div>
              <div className="data-rate-star">
                <p className="number-star">4.8+</p>
                <Image
                  src={"/img/star.svg"}
                  alt="Star"
                  width={13}
                  height={13}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="explore-bottom-right">
          <div className="list-featured">
            <div className="row-list-featured">
              <div className="container-featured">
                <div className="img-featured">
                  <Image
                    className="pic-home"
                    src={"/img/home1.png"}
                    alt="img-featured"
                    width={302}
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
                      <p className="name-location">Seminyak, Bali, Indonesia</p>
                    </div>
                    <div className="desc-home">
                      Escape to this stunning tropical villa nestled in the
                      heart of Seminyak. Featuring lush gardens, a private pool,
                      open-air living spaces, and exquisite Balinese décor, this
                      retreat offers total privacy and serenity. The villa is
                      located just 10 minutes from world-class beaches,
                      restaurants, and nightlife. Perfect for couples or small
                      families seeking a luxurious, authentic Balinese
                      experience.
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
                    width={302}
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
                    width={302}
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
                      <p className="name-location">Manhattan, New York, USA</p>
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
                    src={"/img/home4.jpg"}
                    alt="img-featured"
                    width={302}
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
                      <p className="name-location">Seminyak, Bali, Indonesia</p>
                    </div>
                    <div className="desc-home">
                      Escape to this stunning tropical villa nestled in the
                      heart of Seminyak. Featuring lush gardens, a private pool,
                      open-air living spaces, and exquisite Balinese décor, this
                      retreat offers total privacy and serenity. The villa is
                      located just 10 minutes from world-class beaches,
                      restaurants, and nightlife. Perfect for couples or small
                      families seeking a luxurious, authentic Balinese
                      experience.
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
                    src={"/img/home7.jpg"}
                    alt="img-featured"
                    width={302}
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
                    src={"/img/home6.jpg"}
                    alt="img-featured"
                    width={302}
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
                      <p className="name-location">Manhattan, New York, USA</p>
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
        </div>
      </div>
    </>
  );
}
