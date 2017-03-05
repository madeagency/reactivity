import React, { PropTypes } from 'react'

const Html = (props) => {
  const { component } = props
  const content = component || ''

  return (
    <html lang="en">
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script src="http://localhost:3001/client.js" />
      </body>
    </html>
  )
}

Html.propTypes = {
  component: PropTypes.node.isRequired
}

export default Html
