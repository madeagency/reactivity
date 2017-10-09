import React from 'react'
import { shallow } from 'enzyme'
import TextField from '../TextField'

const defaultProps = {
  input: {
    name: 'Texter'
  },
  label: 'Test Text',
  type: 'text',
  meta: { touched: false, error: '', warning: '' }
}

const renderComponent = (props = {}) => shallow(<TextField {...props} />)

describe('<TextField />', () => {
  it('should render an <input> tag if no route is specified', () => {
    const renderedComponent = renderComponent(defaultProps)
    expect(renderedComponent.find('input').length).toEqual(1)
  })

  it('should have a label', () => {
    const renderedComponent = renderComponent(defaultProps)
    expect(renderedComponent.find('label').text()).toEqual(defaultProps.label)
  })

  it('should display error when touched', () => {
    const meta = { touched: true, error: 'test error' }
    const renderedComponent = renderComponent({ ...defaultProps, meta })
    expect(renderedComponent.find('span').text()).toEqual(meta.error)
  })

  it('should display warning when touched', () => {
    const meta = { touched: true, error: '', warning: 'test warning' }
    const renderedComponent = renderComponent({ ...defaultProps, meta })
    expect(renderedComponent.find('span').text()).toEqual(meta.warning)
  })
})
