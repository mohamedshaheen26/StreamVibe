import React from "react";


function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg'>
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
          <img src='/assets/menuIcon.png' alt='' />
        </button>
        <nav className='navbarNav collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
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
        <span className='navbar-text'>
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
