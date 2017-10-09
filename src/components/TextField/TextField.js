// @flow

import React from 'react'
import type { FieldProps } from 'redux-form'

type Props = {
  label: string,
  type: string
} & FieldProps

const TextField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}: Props) => (
  <div>
    <label htmlFor={input.name}>
      {label}
      <input id={input.name} {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </label>
  </div>
)

export default TextField
