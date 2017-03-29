import React from 'react'
import ReactDOM from 'react-dom/server'
import Html from './Html'

export default function () {
  return `<!doctype html>${ReactDOM.renderToStaticMarkup(
    <Html
      assets={{}}
      component={{}}
      preLoadedState={{}}
      asyncComponents={{}}
    />
  )}`
}
