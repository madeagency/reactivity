import React from 'react'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import Helmet from 'react-helmet'
import Menu from '../../components/Menu/Menu'
import Home from '../Home'
import About from '../About'
import config from '../../config'

const App = () => (
  <div>
    <Helmet {...config.head} />
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route component={Home} />
    </Switch>
  </div>
)

export default App
