import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import TypicalFrom from 'components/TypicalForm/TypicalForm'
import { fetchData } from 'reducers/neo'

class Examples extends Component {
  static propTypes = {
    neo: PropTypes.arrayOf(PropTypes.shape({})),
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
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
    const { neo, loading, loaded } = this.props

    return (
      <div>
        <Helmet
          title="Examples"
          meta={[
            { name: 'description', content: 'Reactivity Examples' }
          ]}
        />
        <h1>Examples</h1>

        <p>Our demo app is not particularly exciting we know, we are actively planning something a little more special.</p>
        <p>But for the moment this should suffice as a simple example of how it all works.</p>

        <h3>Here's some Data {loading ? 'Loading' : 'Loaded'} from NASA:</h3>

        {loading && (<p>loading..</p>)}
        {loaded && (
          <ul>
            {neo && neo.map(object => (
              <li key={object.neo_reference_id}>{object.name}</li>
            ))}
          </ul>
        )}

        <p>
          Both client and server make calls to load data from separate API server.
          If you were to disable javascript or refresh the page,
          the data will be here waiting for you.
        </p>

        <h3>Universal Code-splitting</h3>

        <p>
          For this one your gonna need to open your network tab,
          and you will be able to see which chunks are being sent.
        </p>

        <h3>Progressive Web App Ready</h3>

        <p>
          This Boilerplate currently passes all the PWA requirements of lighthouse
          and you can fully customize the service worker to suite the needs of your
          App.
        </p>

        <h2>Oh look a typical Form Example</h2>
        <p>
          Powered By redux Forms which integrates perfectly into our
          Boilerplate.
        </p>

        <TypicalFrom onSubmit={this.typicalSubmit} />
      </div>
    )
  }
}

export default connect(state => ({
  neo: state.neo.data,
  loaded: state.neo.fetched,
  loading: state.neo.fetching
}), { fetchData })(Examples)
