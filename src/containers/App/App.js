// @flow

import React from 'react'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import Helmet from 'react-helmet'
import { css, injectGlobal } from 'emotion'

import Menu from 'components/Menu/Menu'
import Loading from 'components/Loading/Loading'
import RedirectWithStatus from 'components/RouterStatus/RedirectWithStatus'
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
    color: darken(#61dafb, 40);
  }
`)

const container = css`
  max-width: 80%;
  margin: 40px auto;
`
const App = () => (
  <div>
    <Helmet {...config.head} />
    <Hero />

    <Menu />
    <div className={container}>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/examples" component={Examples} exact />
        <RedirectWithStatus status={302} from="/home" to="/" />
        <Route path="/shell" component={Loading} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  </div>
)

export default App
