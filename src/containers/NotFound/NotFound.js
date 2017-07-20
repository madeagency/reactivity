import React from 'react'
import Helmet from 'react-helmet'

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

export default NotFound
