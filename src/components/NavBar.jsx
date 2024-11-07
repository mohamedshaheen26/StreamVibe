import React from "react";
import styles from "./NavBar.module.css";

function Navbar() {
  return (
    <nav className={styles.Navbar}>
      <div className={styles.logo}>
        <img src='src\assets\Vector.png' alt='Logo Stream' />
        StreamVibe
      </div>
      <ul className={styles.navLinks}>
        <li>Home</li>
        <li>Movies & Shows</li>
        <li>Support</li>
        <li>Subscriptions</li>
      </ul>
    </nav>
  );
}

export default Navbar;
