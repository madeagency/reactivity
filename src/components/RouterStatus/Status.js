// @flow

import React from 'react'
import type { Node } from 'react'
import Route from 'react-router-dom/Route'

type Props = {
  code: number,
  children: Node
}

const Status = ({ code, children }: Props) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = code // eslint-disable-line no-param-reassign
      }
      return children
    }}
  />
)

export default Status
