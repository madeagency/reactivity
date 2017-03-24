import React, { PropTypes } from 'react'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'

const Html = (props) => {
  const { component, asyncComponents, preLoadedState } = props
  const content = component || ''
  const head = Helmet.rewind()

  return (
    <html lang="en">
      <head>
        { head.title.toComponent() }
        { head.meta.toComponent() }
        { head.link.toComponent() }
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.__data=${serialize(preLoadedState)};
            window.${asyncComponents.STATE_IDENTIFIER}=${serialize(asyncComponents.state)};`
          }}
          charSet="UTF-8"
        />
        <script
          src={`${process.env.PUBLIC_PATH}/client.js`}
        />
      </body>
    </html>
  )
}

Html.propTypes = {
  component: PropTypes.node.isRequired,
  preLoadedState: PropTypes.shape({}).isRequired,
  asyncComponents: PropTypes.shape({
    state: PropTypes.object,
    STATE_IDENTIFIER: PropTypes.string
  }).isRequired
}

export default Html
