import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

const NotFound = ({ staticContext }) => {
  if (staticContext) {
    staticContext.statusCode = 404
  }

  return (
    <div id="NotFound">
      <Helmet
        title="NotFound"
        meta={[
          { name: 'description', content: 'NotFound' }
        ]}
      />
      Not Found
  </div>
  )
}

NotFound.propTypes = {
  staticContext: PropTypes.shape({
    statusCode: PropTypes.number
  }).isRequired
}

export default NotFound
