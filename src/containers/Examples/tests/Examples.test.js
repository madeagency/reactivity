import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { Examples } from '../Examples'

const defaultProps = {
  neo: null,
  loaded: false,
  loading: false,
  fetchData: sinon.spy()
}

const renderComponent = (props = {}) => shallow(
  <Examples {...props} />
)

describe('<Examples />', () => {
  it('should call fetchData on mount', () => {
    const fetchData = sinon.spy()
    renderComponent({ ...defaultProps, fetchData })
    expect(fetchData.calledOnce).toBe(true)
  })

  it('should not call fetch is it already has fetched', () => {
    const fetchData = sinon.spy()
    renderComponent({ ...defaultProps, loaded: true, fetchData })
    expect(fetchData.calledOnce).toBe(false)
  })

  it('should render a list of data', () => {
    const renderedComponent = renderComponent({
      ...defaultProps,
      loaded: true,
      neo: [{
        neo_reference_id: 'ref_1',
        name: 'Neo 1'
      }, {
        neo_reference_id: 'ref_2',
        name: 'Neo 2'
      }]
    })

    expect(renderedComponent.find('ul').children().length).toBe(2)
  })
})
