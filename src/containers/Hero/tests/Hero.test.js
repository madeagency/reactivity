import React from 'react'
import { shallow } from 'enzyme'
import Hero from '../Hero'

const renderComponent = () => shallow(
  <Hero />
)

describe('<Hero />', () => {
  it('should render the heading', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find('h1').text()).toEqual('Reactivity')
  })

  it('should render the github star button', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find('GithubButton').first().props().type).toEqual('star')
  })

  it('should render the github fork button', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find('GithubButton').last().props().type).toEqual('fork')
  })
})
