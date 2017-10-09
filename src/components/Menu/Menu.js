// @flow

import React from 'react'
import NavLink from 'react-router-dom/NavLink'
import style from './Menu.scss'

const Menu = () => (
  <nav className={style.nav}>
    <NavLink
      to="/"
      className={style.link}
      activeClassName={style.activeLink}
      exact
    >
      Home
    </NavLink>
    <NavLink
      to="/examples"
      className={style.link}
      activeClassName={style.activeLink}
      exact
    >
      Examples
    </NavLink>
  </nav>
)

export default Menu
