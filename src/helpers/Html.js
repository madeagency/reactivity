import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import serialize from "serialize-javascript"

const Html = props => {
  const { styles, cssHash, js, component, state } = props
  const head = Helmet.renderStatic()
  const htmlAttrs = head.htmlAttributes.toComponent()

  return (
    <html lang="en" {...htmlAttrs}>
      <head>
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {styles.map(name => (
          <link rel="stylesheet" href={`/${name}`} key={name} />
        ))}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: component }} />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.__data=${serialize(state)};`
          }}
          charSet="UTF-8"
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.__CSS_CHUNKS__=${serialize(cssHash)};`
          }}
          charSet="UTF-8"
        />
        {js.map(name => (
          <script
            type="text/javascript"
            src={`/${name}`}
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
  state: PropTypes.shape({}).isRequired
}

Html.defaultProps = {
  component: null
}

export default Html
