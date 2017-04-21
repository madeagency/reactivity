import React from 'react'
import Link from 'react-router-dom/Link'

import styles from './Menu.scss'

const Menu = () => (
  <nav className={styles.nav}>
    <Link to="/" className={styles.link}>Home!!!!</Link>
    <Link to="/about" className={styles.link}>About!</Link>
  </nav>
)

export default Menu
