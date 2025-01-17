import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom"; // Import NavLink

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

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

  useEffect(() => {
    // Close the menu when the route changes
    setIsNavOpen(false);
  }, [location]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click is outside the navbar
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
    };

    if (isNavOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isNavOpen]);

  return (
    <nav className={`navbar navbar-expand-lg ${scrolled ? "scrolled " : ""}`} ref={navRef}>
      <div className='container'>
        <NavLink className='navbar-brand' to='/'>
          <img
            src='/assets/StreamVibeLogo.png'
            alt='Logo StreamVibe'
            width='30'
            height='30'
          />
          StreamVibe
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-expanded={isNavOpen}
          aria-label='Toggle navigation'
        >
          <img src='/assets/MenuIcon.png' alt='menuIcon' />
        </button>
        <nav
          className={`navbarNav collapse navbar-collapse ${
            isNavOpen ? "show" : ""
          }`} 
          id='navbarNav'
        >
          <ul className='navbar-nav ms-auto p-2'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/'>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/movies&shows'>
                Movies & Shows
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/support'>
                Support
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/subscriptions'>
                Subscriptions
              </NavLink>
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
