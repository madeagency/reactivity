import React from 'react'
import PropTypes from 'prop-types'
import Route from 'react-router-dom/Route'
import Redirect from 'react-router-dom/Redirect'

const RedirectWithStatus = ({ from, to, status }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) { staticContext.status = status } // eslint-disable-line no-param-reassign
    return <Redirect from={from} to={to} />
  }}
  />
)

RedirectWithStatus.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired
}

export default RedirectWithStatus
