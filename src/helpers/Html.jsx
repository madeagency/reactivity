import React, { PropTypes } from 'react'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'

const Html = (props) => {
  const { component, asyncState, preLoadedState, assets } = props
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
        { asyncState && <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: `window.ASYNC_COMPONENTS_STATE=${serialize(asyncState)}` }}
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
  asyncState: PropTypes.shape({})
}

Html.defaultProps = {
  component: null
}

export default Html
