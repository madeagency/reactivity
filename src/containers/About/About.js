import React from 'react'
import Helmet from 'react-helmet'
import TypicalFrom from 'components/TypicalForm/TypicalForm'

function typicalSubmit(values) {
  console.log(values)
}

const About = () => (
  <div>
    <Helmet
      title="About"
      meta={[
        { name: 'description', content: 'About Reactivity' }
      ]}
    />
    <h1>What is Reactivity?</h1>
    <p>
      Well at its most basic definition it is how easily an atom has a chemical reaction with another element. Our goal is to achieve stable valence levels, A full valence shell if you will.
    </p>

    <p>But really its just a Boilerplate.</p>

    <p>We are actively working on documentation however if you are fimiliar with the react ecosystem then you should be able to get started without any hassles.</p>

    <h2>Oh look a typical Form Example</h2>
    <TypicalFrom onSubmit={typicalSubmit} />
  </div>
)

export default About
