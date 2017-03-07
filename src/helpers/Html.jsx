import React, { PropTypes } from 'react'
import serialize from 'serialize-javascript'

const Html = (props) => {
  const { component, asyncComponents } = props
  const content = component || ''

  return (
    <html lang="en">
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script src="http://localhost:3001/client.js" />
        <script type="text/javascript">
          {`window.${asyncComponents.STATE_IDENTIFIER}=${serialize(asyncComponents.state)};`}
        </script>
      </body>
    </html>
  )
}

Html.propTypes = {
  component: PropTypes.node.isRequired,
  asyncComponents: PropTypes.shape({
    state: PropTypes.object,
    STATE_IDENTIFIER: PropTypes.string
  }).isRequired
}

export default Html
