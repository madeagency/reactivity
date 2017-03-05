import React from 'react'
import { Match } from 'react-router'
import Menu from '../../components/Menu/Menu'
import Home from '../Home/Home'
import About from '../About/About'

const App = () => (
  <div>
    <Menu />
    <Match exactly pattern="/" component={Home} />
    <Match exactly pattern="/about" component={About} />
  </div>
)

export default App
