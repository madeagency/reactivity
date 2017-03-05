import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import Html from './helpers/Html';
import App from './containers/App/App'
const app = express()

app.get('/api', (req, res) => {
	res.send({
		message: 'I am a server route and can also be hot reloaded!'
	})
})
app.get('*', (req, res) => {
	res.send(`<!doctype html>\n${renderToString(<Html component={App} />)}`);
})

export default app
