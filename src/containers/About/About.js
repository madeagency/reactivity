import React from 'react'
import Helmet from 'react-helmet'
import TypicalFrom from 'components/TypicalForm/TypicalForm'
import styles from './About.scss'

function typicalSubmit(values) {
  console.log(values)
}

const About = () => (
  <div id="about" className={styles.background}>
    <Helmet
      title="About"
      meta={[
        { name: 'description', content: 'My About Page' }
      ]}
    />
    <TypicalFrom onSubmit={typicalSubmit} />
  </div>
)

export default About
