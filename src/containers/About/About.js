import React from 'react'
import Helmet from 'react-helmet'
import TypicalFrom from '../../components/TypicalForm/TypicalForm'

function typicalSubmit(values) {
  console.log(values)
}

const About = () => (
  <div id="about">
    <Helmet
      title="About"
      meta={[
        { name: 'description', content: 'My About Page' }
      ]}
    />

    test about!!!!

    <TypicalFrom onSubmit={typicalSubmit} />
  </div>
)

export default About
