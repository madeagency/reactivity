// @flow

import React from 'react'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import Helmet from 'react-helmet'
import { injectGlobal } from 'react-emotion'
import Menu from 'components/Menu/Menu'
import Loading from 'components/Loading/Loading'
import RedirectWithStatus from 'components/RouterStatus/RedirectWithStatus'
import Container from './Container'
import Home from '../Home'
import Examples from '../Examples'
import NotFound from '../NotFound'
import Hero from '../Hero/Hero'
import config from '../../config'

injectGlobal(`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  a {
    color: darken(#61DAFB, 40);
  }
`)

const App = () => (
  <div>
    <Helmet {...config.head} />
    <Hero />

    <Menu />
    <Container>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/examples" component={Examples} exact />
        <RedirectWithStatus status={302} from="/home" to="/" />
        <Route path="/shell" component={Loading} exact />
        <Route component={NotFound} />
      </Switch>
    </Container>
  </div>
)

export default App
