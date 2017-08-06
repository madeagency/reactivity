import React from 'react'
import Helmet from 'react-helmet'
import Status from 'components/RouterStatus/Status'

const NotFound = () => (
  <Status code={404}>
    <div>
      <Helmet
        title="NotFound"
        meta={[
          { name: 'description', content: 'NotFound' }
        ]}
      />
      Not Found
    </div>
  </Status>
)

export default NotFound
