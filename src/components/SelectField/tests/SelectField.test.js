import React from 'react'
import { shallow } from 'enzyme'
import SelectField from '../SelectField'

const defaultProps = {
  input: {
    name: 'Selector'
  },
  label: 'Test Select',
  type: 'select',
  meta: { touched: false, error: '', warning: '' },
  options: [
    { title: 'red', value: 'ff0000' },
    { title: 'blue', value: '00ff00' },
    { title: 'orange', value: '0000ff' }
  ]
}

const renderComponent = (props = {}) => shallow(
  <SelectField {...props} />
)

describe('<SelectField />', () => {
  it('should contain a <select> tag', () => {
    const renderedComponent = renderComponent(defaultProps)
    expect(renderedComponent.find('select').length).toEqual(1)
  })

  it('should have one more option then supplied in the props', () => {
    const renderedComponent = renderComponent(defaultProps)
    expect(renderedComponent.find('option').length).toEqual(defaultProps.options.length + 1)
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
