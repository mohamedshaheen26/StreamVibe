import React from "react";

function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg'>
      <div className='container'>
        <a className='navbar-brand' href='#'>
          <img
            src='src/assets/Vector.png'
            alt='Logo Stream'
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
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='navbarNav' id='navbarNav'>
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
        </div>
        <span class='navbar-text'>
          <i className='fas fa-search'></i>
          <i className='fa-regular fa-bell'></i>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
