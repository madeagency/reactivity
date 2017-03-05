import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerRouter, createServerRenderContext } from 'react-router'
import Html from './helpers/Html';
import App from './containers/App/App'
const app = express()

app.use((req, res) => {
  const context = createServerRenderContext();
  const component = renderToString(
    <ServerRouter
      location={req.url}
      context={context}
    >
      {({ location }) => <App location={location} />}
    </ServerRouter>
  );

  res.send(`<!doctype html>\n${renderToString(<Html component={component} />)}`);
});

app.get('/api', (req, res) => {
  res.send({
    message: 'I am a server route and can also be hot reloaded!'
  })
})

export default app
