import React, { PropTypes } from 'react'
import serialize from 'serialize-javascript'

const Html = (props) => {
  const { component, stateId, state } = props
  const content = component || ''

  return (
    <html lang="en">
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script src="http://localhost:3001/client.js" />
        <script type="text/javascript">
          window.${stateId} = ${serialize(state)}
        </script>
      </body>
    </html>
  )
}

Html.propTypes = {
  component: PropTypes.node.isRequired,
  stateId: PropTypes.string.isRequired,
  state: PropTypes.shape({}).isRequired
}

export default Html
