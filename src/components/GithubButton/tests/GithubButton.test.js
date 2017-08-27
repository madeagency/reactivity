import React from 'react'
import { shallow } from 'enzyme'
import GithubButton from '../GithubButton'

const defaultProps = {
  title: 'Star this project on github',
  user: 'madeagency',
  repo: 'reactivity',
  type: 'star',
  width: 160,
  height: 30,
  count: false,
  large: false
}

const expectedSrc = 'https://ghbtns.com/github-btn.html?user=madeagency&repo=reactivity&type=star'

const renderComponent = (props = {}) => shallow(
  <GithubButton {...props} />
)

describe('<GithubButton />', () => {
  it('should render an <iframe>', () => {
    const renderedComponent = renderComponent(defaultProps)
    expect(renderedComponent.find('iframe').length).toEqual(1)
  })

  it('should have the expected source', () => {
    const renderedComponent = renderComponent(defaultProps)
    expect(renderedComponent.props().src).toEqual(expectedSrc)
  })

  it('should have a counter', () => {
    const renderedComponent = renderComponent({ ...defaultProps, count: true })
    expect(renderedComponent.props().src).toEqual(`${expectedSrc}&count=true`)
  })

  it('should be large', () => {
    const renderedComponent = renderComponent({ ...defaultProps, large: true })
    expect(renderedComponent.props().src).toEqual(`${expectedSrc}&size=large`)
  })
})
