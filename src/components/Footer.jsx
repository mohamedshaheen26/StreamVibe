import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer>
      <div className='container'>
        <div className='footer'>
          <div className='row mb-5'>
            <div className='col-6 col-md-4 col-lg-3 col-xl-2 mb-5'>
              <h4 className='mb-4'>Home</h4>
              <ul>
                <li>
                  <Link
                    to='#categories'
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("categories");
                    }}
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to='#device-compatibility'
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("device-compatibility");
                    }}
                  >
                    Devices
                  </Link>
                </li>
                <li>
                  <Link
                    to='#subscription-plans'
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("subscription-plans");
                    }}
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to='#faq'
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("faq");
                    }}
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className='col-6 col-md-4 col-lg-3 col-xl-2 mb-5'>
              <h4 className='mb-4'>Movies</h4>
              <ul>
                <li>
                  <a href='#'>Gernes</a>
                </li>
                <li>
                  <a href='#'>Trending</a>
                </li>
                <li>
                  <a href='#'>New Release</a>
                </li>
                <li>
                  <a href='#'>Popular</a>
                </li>
              </ul>
            </div>
            <div className='col-6 col-md-4 col-lg-3 col-xl-2 mb-5'>
              <h4 className='mb-4'>Shows</h4>
              <ul>
                <li>
                  <a href='#'>Gernes</a>
                </li>
                <li>
                  <a href='#'>Trending</a>
                </li>
                <li>
                  <a href='#'>New Release</a>
                </li>
                <li>
                  <a href='#'>Popular</a>
                </li>
              </ul>
            </div>
            <div className='col-6 col-md-4 col-lg-3 col-xl-2 mb-5'>
              <h4 className='mb-4'>Support</h4>
              <ul>
                <li>
                  <Link to='support'>Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className='col-6 col-md-4 col-lg-3 col-xl-2 mb-5'>
              <h4 className='mb-4'>Subscription</h4>
              <ul>
                <li>
                  <Link to='subscriptions'>Plans</Link>
                </li>
                <li>
                  <Link to='subscriptions'>Features</Link>
                </li>
              </ul>
            </div>
            <div className='col-6 col-md-4 col-lg-3 col-xl-2 mb-5'>
              <h4 className='mb-4'>Connect With Us</h4>
              <ul className='social-media d-flex justify-content-between align-content-center'>
                <li>
                  <a href='#'>
                    <i class='fa-brands fa-facebook'></i>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <i class='fa-brands fa-twitter'></i>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <i class='fa-brands fa-linkedin'></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='row copyrights-footer'>
            <div className='col-12 col-lg-6 col-xl-7 mb-4 mb-lg-0'>
              <p className='copyright'>
                &copy; 2023 StreamVibe. All rights reserved.
              </p>
            </div>
            <div className='col-12 col-lg-6 col-xl-5 mb-4'>
              <ul className='footer-bottom-links d-flex align-content-center float-lg-end'>
                <li>
                  <a href='#'>Terms of Use</a>
                </li>
                <li>
                  <a href='#'>Privacy Policy</a>
                </li>
                <li>
                  <a href='#'>Cookie Policy</a>
                </li>
              </ul>
            </div>
            <div className='col-12'>
              <p className='copyright text-center'>
                Developed by{" "}
                <strong>
                  <a
                    href='https://www.linkedin.com/in/mohamed-shaheen-208718234'
                    target='_blank'
                  >
                    Mohamed Shaheen
                  </a>
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
