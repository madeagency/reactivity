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
      <div>
        <Helmet
          title="Home"
          meta={[
            { name: 'description', content: 'Welcome to Reactivity' }
          ]}
        />
        <h1>Our bare demo app</h1>

        <p>Our demo app is not particularly exciting we know, we are actively planning something a little more special.</p>
        <p>But for the moment this will have to suffice as a simple example of how it all works.</p>

        <p>
          What your currently experiencing is a is a fully universal react boilerplate, that uses RXJS to handle side effects, along with Universal HMR and Universal Code-Splitting without the framework approach you will find in something like Next.js.
        </p>

        <p>
          View the <a href="https://github.com/madeagency/reactivity" target="_blank">Github Repo</a> for this project since that is where the beauty currently lies and to find out more, However please note that this project is very new in terms of us being confident enough in its stability to release it into the wild so we are still actively working on the documentation and examples.
        </p>

        <h3>Here's some Data loaded from NASA:</h3>
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
