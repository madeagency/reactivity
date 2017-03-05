import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router'
import App from './containers/App/App'

render(
	<AppContainer>
		<BrowserRouter>
			{
				({ location }) => <App location={location} />
			}
		</BrowserRouter>
	</AppContainer>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept('./containers/App/App', () => {
		render(
			<AppContainer>
				<BrowserRouter>
					{
						({ location }) => <App location={location} />
					}
				</BrowserRouter>
			</AppContainer>,
			document.getElementById('root')
		)
	})
}
