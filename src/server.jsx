import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { withAsyncComponents } from 'react-async-component'
import { ServerRouter, createServerRenderContext } from 'react-router'
import Html from './helpers/Html'
import App from './containers/App/App'

const app = express()

app.use((req, res) => {
  const context = createServerRenderContext()
  const component = (
    <ServerRouter
      location={req.url}
      context={context}
    >
      {({ location }) => <App location={location} />}
    </ServerRouter>
  )

  withAsyncComponents(component).then((result) => {
    const {
      appWithAsyncComponents,
      state,
      STATE_IDENTIFIER
    } = result

    const componentString = renderToString(appWithAsyncComponents)

    res.send(`<!doctype html>\n${renderToString(
      <Html
        component={componentString}
        stateId={STATE_IDENTIFIER}
        state={state}
      />
    )}`)
  })
})

export default app
