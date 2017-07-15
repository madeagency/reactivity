import React from 'react'
import Link from 'react-router-dom/Link'
import styles from './Menu.scss'

const Menu = () => (
  <nav className={styles.nav}>
    <Link to="/">Home!!!!</Link>
    <Link to="/about">About!</Link>
  </nav>
)

export default Menu
