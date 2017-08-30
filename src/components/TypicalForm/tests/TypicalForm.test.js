import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { Form } from '../TypicalForm'

const defaultProps = (response = Promise.resolve()) => ({
  pristine: false,
  submitting: false,
  fields: {
    value: '',
    touched: false,
    error: null
  },
  reset: sinon.spy(),
  handleSubmit: fn => fn,
  onSave: sinon.stub().returns(response)
})

const renderComponent = (props = {}) => shallow(
  <Form {...props} />
)

describe('<TypicalForm />', () => {
  it('should disable submit while submitting', () => {
    const renderedComponent = renderComponent({ ...defaultProps(), submitting: true })
    expect(renderedComponent.find('button[type="submit"]').prop('disabled')).toBe(true)
  })
})
