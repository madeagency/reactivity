import React, { PropTypes } from 'react'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'

const Html = (props) => {
  const { component, asyncComponents, preLoadedState, assets } = props
  const head = Helmet.renderStatic()
  const htmlAttrs = head.htmlAttributes.toComponent()
  return (
    <html {...htmlAttrs}>
      <head>
        { head.title.toComponent() }
        { head.meta.toComponent() }
        { head.link.toComponent() }
        { Object.keys(assets.styles || {}).map(name => (
          <link rel="stylesheet" key={name} href={assets.styles[name]} />
        ))}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: component }} />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(preLoadedState)};` }}
          charSet="UTF-8"
        />
        { asyncComponents.STATE_IDENTIFIER && <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: `window.${asyncComponents.STATE_IDENTIFIER}=${serialize(asyncComponents.state)};` }}
          charSet="UTF-8"
        /> }
        { assets && assets.javascript && <script src={assets.javascript.vendor} /> }
        { assets && assets.javascript && <script src={assets.javascript.client} /> }
      </body>
    </html>
  )
}

Html.propTypes = {
  assets: PropTypes.shape({}).isRequired,
  component: PropTypes.node,
  preLoadedState: PropTypes.shape({}).isRequired,
  asyncComponents: PropTypes.shape({
    state: PropTypes.object,
    STATE_IDENTIFIER: PropTypes.string
  }).isRequired
}

Html.defaultProps = {
  component: null
}

export default Html
