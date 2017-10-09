// @flow

import React from 'react'
import type { FieldProps } from 'redux-form'
import type { SelectOption } from '../../types'

type Props = {
  label: string,
  type: string,
  options: Array<SelectOption>
} & FieldProps

const SelectField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  options
}: Props) => (
  <div>
    <label htmlFor={input.name}>
      {label}
      <select id={input.name} {...input} type={type}>
        <option />
        {options &&
          options.map(({ title, value }) => (
            <option value={value} key={value}>
              {title}
            </option>
          ))}
      </select>
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </label>
  </div>
)

export default SelectField
