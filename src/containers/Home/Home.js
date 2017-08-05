import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { fetchData } from 'reducers/neo'

class Home extends Component {
  static propTypes = {
    neo: PropTypes.arrayOf(PropTypes.shape({})),
    loaded: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired
  }

  static defaultProps = {
    neo: []
  }

  componentWillMount() {
    if (!this.props.loaded) {
      this.props.fetchData()
    }
  }

  typicalSubmit = (values) => {
    console.log(values)
  }

  render() {
    const { neo } = this.props

    return (
      <div id="home">
        <Helmet
          title="Home"
          meta={[
            { name: 'description', content: 'My Home Page' }
          ]}
        />
        <ul>
          {neo && neo.map(object => (
            <li key={object.neo_reference_id}>{object.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default connect(state => ({
  neo: state.neo.data,
  loaded: state.neo.fetched
}), { fetchData })(Home)
