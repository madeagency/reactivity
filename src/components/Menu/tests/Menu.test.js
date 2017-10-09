import React from 'react'
import { shallow } from 'enzyme'
import Menu from '../Menu'

const renderComponent = (props = {}) => shallow(<Menu {...props} />)

describe('<Menu />', () => {
  it('should render a <nav> element', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find('nav').length).toEqual(1)
  })
})
