import "./layout.css";
import Image from "next/image";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* HEADER */}
      <header>
        <div className="header-left">
          <div className="icon-home">
            <Image
              src={"/img/icon-home.svg"}
              alt="icon-home"
              width={13}
              height={13}
            />
          </div>
          <p className="title-web">HomeStay</p>
        </div>
        <div className="header-mid">
          <ul className="list-page">
            <li>
              <a href="" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="./user/explore" className="list-header">
                Explore
              </a>
            </li>
            <li>
              <a href="#!" className="list-header">
                About
              </a>
            </li>
            <li>
              <a href="#!" className="list-header">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="header-right">
          <div className="btn btn-left">
            <Image
              src={"/img/icon-logout.svg"}
              alt="icon-user"
              width={14}
              height={14}
            />
            <p className="action-button">Log In</p>
          </div>
          <div className="btn btn-right">
            <p className="action-button-right">Get Started</p>
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main>{children}</main>

      {/* FOOTER */}
      <footer>
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-top-left">
              <div className="title-top-left">
                <div className="icon">
                  <Image
                    src={"/img/icon-home.svg"}
                    alt="icon-home"
                    width={14}
                    height={14}
                  />
                </div>
                <p className="title-web-footer">HomeStay</p>
              </div>
              <div className="content-top-left">
                <p className="desc">
                  Find your perfect home away from home. We connect travelers
                  with unique, comfortable homestays around the world.
                </p>
                <div className="list-mxh">
                  <div className="container-mxh">
                    <Image
                      src={"/img/twitter.svg"}
                      alt="icon-twitter"
                      width={15}
                      height={15}
                    />
                  </div>
                  <div className="container-mxh">
                    <Image
                      src={"/img/fb.svg"}
                      alt="icon-fb"
                      width={15}
                      height={15}
                    />
                  </div>
                  <div className="container-mxh">
                    <Image
                      src={"/img/ig.svg"}
                      alt="icon-ig"
                      width={15}
                      height={15}
                    />
                  </div>
                  <div className="container-mxh">
                    <Image
                      src={"/img/ytb.svg"}
                      alt="icon-ytb"
                      width={15}
                      height={15}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-top-right">
              <div className="content-top-right">
                <div className="container-information">
                  <div className="title-information">Explore</div>
                  <ul className="list-information">
                    <li className="unique">Home</li>
                    <li className="unique">Explore Stays</li>
                    <li className="unique">About Us</li>
                    <li className="unique">Contact</li>
                    <li className="unique">How It Works</li>
                  </ul>
                </div>
                <div className="container-information">
                  <div className="title-information">Hosting</div>
                  <ul className="list-information">
                    <li className="unique">Become a Host</li>
                    <li className="unique">Host Login</li>
                    <li className="unique">Host Guidelines</li>
                    <li className="unique">Pricing Plans</li>
                    <li className="unique">Success Stories</li>
                  </ul>
                </div>
                <div className="container-information">
                  <div className="title-information">Support</div>
                  <ul className="list-information">
                    <li className="unique">Help Center</li>
                    <li className="unique">Safety</li>
                    <li className="unique">Privacy Policy</li>
                    <li className="unique">Terms of Service</li>
                    <li className="unique">Cookie Policy</li>
                  </ul>
                </div>
                <div className="container-information">
                  <div className="title-information">Contact</div>
                  <ul className="list-information">
                    <li className="unique-contact">
                      <Image
                        src={"/img/gps.svg"}
                        alt="icon-gps"
                        width={15}
                        height={15}
                      />
                      <p className="desc-contact">
                        Tân Hưng, Tân Việt - Bình Giang - Hải Dương.
                      </p>
                    </li>
                    <li className="unique-contact">
                      <Image
                        src={"/img/mail.svg"}
                        alt="icon-mail"
                        width={15}
                        height={15}
                      />
                      <p className="desc-contact">phamchuan2608@gmail.com</p>
                    </li>
                    <li className="unique-contact">
                      <Image
                        src={"/img/phone.svg"}
                        alt="icon-phone"
                        width={15}
                        height={15}
                      />
                      <p className="desc-contact">+84 362 111 527</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-left">
              © 2026 HomeStay. All rights reserved.
            </div>
            <div className="footer-bottom-right">
              <ul className="footer-more">
                <li className="more">Privacy</li>
                <li className="more">Terms</li>
                <li className="more">Cookies</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
