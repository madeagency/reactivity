// @flow

import React from 'react'
import Route from 'react-router-dom/Route'
import Redirect from 'react-router-dom/Redirect'

type Props = {
  from: string,
  to: string,
  status: number
}

const RedirectWithStatus = (props: Props) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = props.status // eslint-disable-line no-param-reassign
      }
      return <Redirect from={props.from} to={props.to} />
    }}
  />
)

export default RedirectWithStatus
