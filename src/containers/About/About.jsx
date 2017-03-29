import React from 'react'
import Helmet from 'react-helmet'

const About = () => (
  <div id="about">
    <Helmet
      title="About"
      meta={[
        { name: 'description', content: 'My About Page' }
      ]}
    />
    test about!!!!
  </div>
)

export default About
