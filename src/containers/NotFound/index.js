import React from 'react'
import Helmet from 'react-helmet'

const NotFound = () => (
  <div>
    <Helmet
      title="Not Found"
      meta={[
        { name: 'description', content: 'Not Found' }
      ]}
    />
    <h1>This Page is no longer with us.</h1>
    <p>Its in a better place now...</p>
  </div>
)

export default NotFound
