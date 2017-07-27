import React from 'react'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import Helmet from 'react-helmet'
import Menu from '../../components/Menu/Menu'
import Home from '../Home'
import About from '../About'
import NotFound from '../NotFound'
import Loading from '../../components/Loading/Loading'
import config from '../../config'

const App = () => (
  <div>
    <Helmet {...config.head} />
    <Menu />
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} exact />
      <Route path="/shell" component={Loading} exact />
      <Route component={NotFound} exact />
    </Switch>
  </div>
)

export default App
