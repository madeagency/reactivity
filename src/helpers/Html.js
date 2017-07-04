import React from 'react'
import PropTypes from 'prop-types'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'

const Html = (props) => {
  const { component, state, Styles, Js } = props
  const head = Helmet.renderStatic()
  const htmlAttrs = head.htmlAttributes.toComponent()

  return (
    <html {...htmlAttrs}>
      <head>
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        <Styles />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: component }} />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(state)};` }}
          charSet="UTF-8"
        />
        <Js />
      </body>
    </html>
  )
}

Html.propTypes = {
  Styles: PropTypes.node.isRequired,
  Js: PropTypes.node.isRequired,
  component: PropTypes.node,
  state: PropTypes.shape({}).isRequired
}

Html.defaultProps = {
  component: null
}

export default Html
