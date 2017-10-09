// @flow

import React from 'react'
import Helmet from 'react-helmet'
import Status from 'components/RouterStatus/Status'

const NotFound = () => (
  <Status code={404}>
    <div>
      <Helmet
        title="Not Found"
        meta={[{ name: 'description', content: 'Not Found' }]}
      />
      <h1>This Page is no longer with us.</h1>
      <p>Its in a better place now...</p>
    </div>
  </Status>
)

export default NotFound
