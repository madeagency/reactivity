import React from 'react'
import PropTypes from 'prop-types'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'

const Html = (props) => {
  const { Styles, CssHash, Js, component, state } = props
  const head = Helmet.renderStatic()
  const htmlAttrs = head.htmlAttributes.toComponent()

  return (
    <html {...htmlAttrs}>
      <head>
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {Styles.map(name => (
          <script
            type="text/javascript"
            src={`/static/${name}`}
            key={name}
            charSet="UTF-8"
          />
        ))}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: component }} />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(state)};` }}
          charSet="UTF-8"
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: `window.__CSS_CHUNKS__=${serialize(CssHash)};` }}
          charSet="UTF-8"
        />
        {Js.map(name => (
          <script
            type="text/javascript"
            src={`/static/${name}`}
            key={name}
            charSet="UTF-8"
          />
        ))}
      </body>
    </html>
  )
}

Html.propTypes = {
  Styles: PropTypes.arrayOf(PropTypes.string).isRequired,
  CssHash: PropTypes.shape({}).isRequired,
  Js: PropTypes.arrayOf(PropTypes.string).isRequired,
  component: PropTypes.node,
  state: PropTypes.shape({}).isRequired
}

Html.defaultProps = {
  component: null
}

export default Html
