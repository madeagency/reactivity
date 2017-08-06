import React from 'react'
import { shallow } from 'enzyme'
import FileField from '../FileField'

const defaultProps = {
  input: {
    name: 'Filer'
  },
  label: 'Test File',
  type: 'file',
  meta: { touched: false, error: '', warning: '' }
}

const renderComponent = (props = {}) => shallow(
  <FileField {...props} />
)

describe('<FileField />', () => {
  it('should render a file field', () => {
    const renderedComponent = renderComponent(defaultProps)
    expect(renderedComponent.find('input').prop('type')).toEqual('file')
  })
})
