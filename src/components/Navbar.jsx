import React, { useState, useEffect } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (
        document.body.scrollTop >= 50 ||
        document.documentElement.scrollTop >= 50
      ) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg ${scrolled ? "scrolled " : ""}`}>
      <div className='container'>
        <a className='navbar-brand' href='#'>
          <img
            src='/assets/StreamVibeLogo.png'
            alt='Logo StreamVibe'
            width='30'
            height='30'
          />
          StreamVibe
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='true'
          aria-label='Toggle navigation'
        >
          <img src='/assets/MenuIcon.png' alt='menuIcon' />
        </button>
        <nav className='navbarNav collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto p-2'>
            <li className='nav-item'>
              <a className='nav-link active' aria-current='page' href='#'>
                Home
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                Movies & Shows
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                Support
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                Subscriptions
              </a>
            </li>
          </ul>
        </nav>
        <span className='navbar-icon'>
          <a href='#'>
            <i className='fas fa-search'></i>
          </a>
          <a href='#'>
            <i className='fa-regular fa-bell'></i>
          </a>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
