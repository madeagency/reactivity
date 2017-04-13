import React from 'react'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import { asyncComponent } from 'react-async-component'
import Helmet from 'react-helmet'
import Menu from 'components/Menu/Menu'
import config from '../../config'

const Home = asyncComponent({
  resolve: () => System.import('../Home/Home'),
  ssrMode: 'boundary'
})

const About = asyncComponent({
  resolve: () => System.import('../About/About'),
  ssrMode: 'defer'
})

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
