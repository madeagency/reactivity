import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import serialize from '../utils/serialize'

const Html = (props) => {
  const { styles, cssHash, js, publicPath, component, state } = props
  const head = Helmet.renderStatic()
  const htmlAttrs = head.htmlAttributes.toComponent()

  return (
    <html {...htmlAttrs}>
      <head>
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {styles.map(name => (
          <link
            rel="stylesheet"
            src={`${publicPath}/${name}`}
            key={name}
            charSet="UTF-8"
          />
        ))}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: component }} />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(state, { isJSON: true })};` }}
          charSet="UTF-8"
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: `window.__CSS_CHUNKS__=${serialize(cssHash, { isJSON: true })};` }}
          charSet="UTF-8"
        />
        {js.map(name => (
          <script
            type="text/javascript"
            src={`${publicPath}/${name}`}
            key={name}
            charSet="UTF-8"
          />
        ))}
      </body>
    </html>
  )
}

Html.propTypes = {
  styles: PropTypes.arrayOf(PropTypes.string).isRequired,
  cssHash: PropTypes.shape({}).isRequired,
  js: PropTypes.arrayOf(PropTypes.string).isRequired,
  component: PropTypes.node,
  state: PropTypes.shape({}).isRequired,
  publicPath: PropTypes.string.isRequired
}

Html.defaultProps = {
  component: null
}

export default Html
