import React, { Component } from 'react'
import Helmet from 'react-helmet'
import universal from 'react-universal-component'
import { connect } from 'react-redux'
import Loading from 'components/Loading/Loading'
import NotFound from '../NotFound/NotFound'
import Hero from '../Hero/Hero'
import config from '../../config'
import style from './App.scss'

const UniversalComponent = universal(props => import(`../${props.page}`), {
  loading: Loading,
  error: NotFound
})

class App extends Component {
  beforeChange = () => {}
  afterChange = () => {}
  handleError = () => {}

  render() {
    // const { index, done, loading } = this.state

    console.log(this.props.location)

    return (
      <div>
        <Helmet {...config.head} />
        <Hero />

        <div className={style.container}>
          <UniversalComponent
            page={'Home'}
            onBefore={this.beforeChange}
            onAfter={this.afterChange}
            onError={this.handleError}
          />
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  location: state.location
}))(App)
