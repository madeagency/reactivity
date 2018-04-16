// @flow

import React from 'react'
import NavLink from 'react-router-dom/NavLink'
import { css } from 'emotion'

const navStyle = css`
  border-bottom: 1px solid #eee;
  display: block;
  padding: 15px 10%;
`
const linkStyle = css`
  margin-right: 10px;
  font-size: 16px;
  color: #000;
  text-decoration: underline;
`
const activeLinkStyle = css`
  pointer-events: none;
  text-decoration: none;
`

const Menu = () => (
  <nav className={navStyle}>
    <NavLink
      to="/"
      className={linkStyle}
      activeClassName={activeLinkStyle}
      exact
    >
      Home
    </NavLink>
    <NavLink
      to="/examples"
      className={linkStyle}
      activeClassName={activeLinkStyle}
      exact
    >
      Examples
    </NavLink>
  </nav>
)

export default Menu
