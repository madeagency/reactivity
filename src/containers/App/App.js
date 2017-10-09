// @flow

import React from "react"
import Switch from "react-router-dom/Switch"
import Route from "react-router-dom/Route"
import Helmet from "react-helmet"
import Menu from "components/Menu/Menu"
import Loading from "components/Loading/Loading"
import RedirectWithStatus from "components/RouterStatus/RedirectWithStatus"
import Home from "../Home"
import Examples from "../Examples"
import NotFound from "../NotFound"
import Hero from "../Hero/Hero"
import config from "../../config"
import style from "./App.scss"

const App = () => (
  <div>
    <Helmet {...config.head} />
    <Hero />

    <Menu />
    <div className={style.container}>
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
