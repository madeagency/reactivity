import React from 'react'
import { Match } from 'react-router'
import { createAsyncComponent } from 'react-async-component'
import Menu from '../../components/Menu/Menu'

const Home = createAsyncComponent({
  resolve: () => System.import('../Home/Home')
})

const About = createAsyncComponent({
  resolve: () => System.import('../About/About')
})

const App = () => (
  <div>
    <Menu />
    <Match exactly pattern="/" component={Home} />
    <Match exactly pattern="/about" component={About} />
  </div>
)

export default App
