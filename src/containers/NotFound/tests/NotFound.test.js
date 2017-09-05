import React from 'react'
import { shallow } from 'enzyme'
import NotFound from '../NotFound'

const renderComponent = () => shallow(
  <NotFound />
)

describe('<NotFound />', () => {
  it('should render Heading', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find('h1').text()).toEqual('This Page is no longer with us.')
  })
})
