// @flow

import React from 'react'
import type { Node } from 'react'
import Helmet from 'react-helmet'
import serialize from 'serialize-javascript'

type Props = {
  styles: Array<string>,
  cssHash: {},
  js: Array<string>,
  component: Node,
  state: {}
}

const Html = (props: Props) => {
  const { js, component, state } = props
  const head = Helmet.renderStatic()
  const htmlAttrs = head.htmlAttributes.toComponent()

  return (
    <html lang="en" {...htmlAttrs}>
      <head>
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
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

export default Html
