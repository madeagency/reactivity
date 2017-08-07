import React from 'react'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import Helmet from 'react-helmet'
import Menu from 'components/Menu/Menu'
import Loading from 'components/Loading/Loading'
import RedirectWithStatus from 'components/RouterStatus/RedirectWithStatus'
import Home from '../Home'
import About from '../About'
import NotFound from '../NotFound'
import config from '../../config'
import style from './App.scss'
import logo from './logo.svg'

const App = () => (
  <div>
    <div className={style.Hero}>
      <Helmet {...config.head} />
      <div className={style.Header}>
        <img src={logo} className={style.Logo} alt="logo" />
        <h2>Welcome to Reactivity</h2>
      </div>
    </div>

    <Menu />
    <div className={style.container}>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} exact />
        <RedirectWithStatus status={302} from="/home" to="/" />
        <Route path="/shell" component={Loading} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  </div>
)

export default App
