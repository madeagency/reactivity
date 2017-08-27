import React from 'react'
import { shallow } from 'enzyme'
import Loading from '../Loading'

const renderComponent = () => shallow(
  <Loading />
)

describe('<Loading />', () => {
  it('should render an <div>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find('h4').length).toEqual(1)
  })
  it('should render loading text', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find('h4').text()).toEqual('Loading!')
  })
})
