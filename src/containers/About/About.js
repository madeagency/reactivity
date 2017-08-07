import React from 'react'
import Helmet from 'react-helmet'
import TypicalFrom from 'components/TypicalForm/TypicalForm'
// import styles from './About.scss'

function typicalSubmit(values) {
  console.log(values)
}

const About = () => (
  <div id="about">
    <Helmet
      title="About"
      meta={[
        { name: 'description', content: 'About Reactivity' }
      ]}
    />
    <h1>What is Reactivity?</h1>
    <p>que description...</p>

    <h2>Oh look a typical Form</h2>
    <TypicalFrom onSubmit={typicalSubmit} />
  </div>
)

export default About
