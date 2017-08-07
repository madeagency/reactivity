import React from 'react'
import Helmet from 'react-helmet'
import Link from 'react-router-dom/Link'

const Home = () => (
  <div>
    <Helmet
      title="Home"
      meta={[
        { name: 'description', content: 'Welcome to Reactivity' }
      ]}
    />
    <h1>What is Reactivity?</h1>
    <p>
      Well at its most basic definition it is how easily an atom has a
      chemical reaction with another element. Our goal is to achieve stable valence levels,
      A full valence shell if you will.
    </p>

    <p>But really its just a Boilerplate.</p>

    <h2>We make use of the following technologies</h2>
    <ul>
      <li>Universal Rendering with Code-Splitting</li>
      <li>React</li>
      <li>React Router 4</li>
      <li>Express</li>
      <li>Webpack</li>
      <li>Redux</li>
      <li>Eslint</li>
      <li>Redux Form</li>
      <li>Style and Sass Loader</li>
      <li>RXJS</li>
      <li>Service Worker</li>
    </ul>

    <p>
      Take a look at our <Link to="/examples">Examples Page</Link> to see parts of this in action.
    </p>
  </div>
)

export default Home

