import React from 'react'
import { shallow } from 'enzyme'
import Home from '../Home'

const renderComponent = () => shallow(
  <Home />
)

describe('<Home />', () => {
  it('should render Heading', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find('h1').text()).toEqual('What is it really?')
  })

  it('should render a list with 10 items', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find('ul').children().length).toEqual(10)
  })
})
