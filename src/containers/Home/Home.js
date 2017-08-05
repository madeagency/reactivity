import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import TypicalFrom from 'components/TypicalForm/TypicalForm'
import { fetchData } from 'reducers/users'

@connect(state => ({
  users: state.users,
  loaded: state.users.dataFetched
}), { fetchData })
export default class Home extends Component {
  static propTypes = {
    users: PropTypes.shape({
      label: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        age: PropTypes.number
      }))
    }).isRequired,
    loaded: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired
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
    const { users } = this.props

    return (
      <div id="home">
        <Helmet
          title="Home"
          meta={[
            { name: 'description', content: 'My Home Page' }
          ]}
        />
        {users.data.length ? (
          users.data.map(person => (
            <div key={person.id}>
              <p>Name: {person.name}</p>
              <p>Age: {person.age}</p>
            </div>
          ))
        ) : null}
        <button onClick={this.props.fetchData}>{users.label}</button>
        <TypicalFrom onSubmit={this.typicalSubmit} />
      </div>
    )
  }
}
