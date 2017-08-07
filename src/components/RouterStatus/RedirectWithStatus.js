import React from 'react'
import PropTypes from 'prop-types'
import Route from 'react-router-dom/Route'
import Redirect from 'react-router-dom/Redirect'

const RedirectWithStatus = props => (
  <Route render={({ staticContext }) => {
    if (staticContext) { staticContext.status = props.status } // eslint-disable-line no-param-reassign
    return <Redirect from={props.from} to={props.to} />
  }}
  />
)

RedirectWithStatus.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired
}

export default RedirectWithStatus
