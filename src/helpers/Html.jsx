import React, { PropTypes } from 'react'
import serialize from 'serialize-javascript'

const Html = (props) => {
  const { component, asyncComponents, preLoadedState } = props
  const content = component || ''

  return (
    <html lang="en">
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script src="http://localhost:3001/client.js" />
        <script type="text/javascript">{`${serialize(preLoadedState)}`}</script>
        <script type="text/javascript">
          {`window.${asyncComponents.STATE_IDENTIFIER}=${serialize(asyncComponents.state)};`}
        </script>
      </body>
    </html>
  )
}

Html.propTypes = {
  component: PropTypes.node.isRequired,
  preLoadedState: PropTypes.object.isRequired,
  asyncComponents: PropTypes.shape({
    state: PropTypes.object,
    STATE_IDENTIFIER: PropTypes.string
  }).isRequired
}

export default Html
