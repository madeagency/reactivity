import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../../redux/reducers/users'

@connect(state => ({
  users: state.users
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
    fetchData: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchData()
  }

  render() {
    const { users } = this.props

    return (
      <div id="home">
        {users.data.length ? (
          users.data.map(person => (
            <div key={person.id}>
              <p>Name: {person.name}</p>
              <p>Age: {person.age}</p>
            </div>
          ))
        ) : null}
        <button onClick={this.props.fetchData}>{users.label}</button>
      </div>
    )
  }
}
