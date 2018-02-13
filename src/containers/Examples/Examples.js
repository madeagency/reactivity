// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import TypicalFrom from 'components/TypicalForm/TypicalForm'
import { fetchData } from 'reducers/neo'
import type { Neo } from 'reducers/neo'

type Props = {
  neo: Array<Neo>,
  loaded: boolean,
  loading: boolean,
  fetchData: (newDate: string, oldDate: string) => mixed
}

class Examples extends Component<Props> {
  static defaultProps = {
    neo: []
  }

  componentWillMount() {
    if (!this.props.loaded) {
      const date = new Date().toISOString().slice(0, 10)
      this.props.fetchData(date, date)
    }
  }

  typicalSubmit = (values: Object) => {
    console.log(values)
  }

  render() {
    const { neo, loading, loaded } = this.props

    return (
      <div>
        <Helmet
          title="Examples"
          meta={[{ name: 'description', content: 'Reactivity Examples' }]}
        />
        <h1>What can it do?</h1>

        <p>
          We know our demo app is not particularly exciting, but stay tuned as
          we&apos;re working on something a little more special
        </p>
        <p>
          For the moment this should suffice as a demonstration of what{' '}
          <b>Reactivity</b> can do:
        </p>

        <h3>
          Here&apos;s some Data {loading ? 'Loading' : 'Loaded'} from NASA 🛰:
        </h3>

        {loading && <p>loading..</p>}
        {loaded && (
          <ul>
            {neo &&
              neo.map(object => (
                <li key={object.neo_reference_id}>{object.name}</li>
              ))}
          </ul>
        )}

        <p>
          We use <b>RXJS</b> and the concept of{' '}
          <a
            href="https://redux-observable.js.org/docs/basics/Epics.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Epics
          </a>{' '}
          for our asynchronous actions. Check
          <a
            href="https://github.com/madeagency/reactivity/blob/master/src/redux/reducers/neo.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            this file 
          </a>{' '}
          which is responsible for fetching the above data.
        </p>
        <p>
          Both client and server make calls to load data from separate API
          server. If you were to disable JavaScript or refresh the page, the
          data will be here waiting for you.
        </p>

        <h3>
          Universal Code-splitting{' '}
          <span role="img" aria-label="earth">
            🌍
          </span>
        </h3>

        <p>
          For this one your gonna need to open your network tab, and you will be
          able to see which chunks are being sent. You&apos;re currently viewing
          the{' '}
          <a
            href="https://github.com/madeagency/reactivity/blob/master/src/containers/Examples/index.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Examples chunk.
          </a>
        </p>

        <h3>
          Progressive Web App Ready{' '}
          <span role="img" aria-label="island">
            🏝
          </span>
        </h3>

        <p>
          This Boilerplate currently passes all the PWA requirements of
          lighthouse and you can {'fully '}
          <a
            href="https://github.com/madeagency/reactivity/blob/master/src/sw.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            customize the service worker
          </a>{' '}
          to suite the needs of your App.
        </p>

        <h2>Oh look a typical Form Example</h2>
        <p>
          Powered By redux Forms which integrates perfectly into our
          Boilerplate. Check the console for values once you&apos;ve submitted
          the form.
        </p>

        <TypicalFrom onSubmit={this.typicalSubmit} />
      </div>
    )
  }
}
export default connect(
  state => ({
    neo: state.neo.data[state.neo.startDate],
    loaded: state.neo.fetched,
    loading: state.neo.fetching
  }),
  {
    fetchData
  }
)(Examples)
