// @flow

import React from 'react'
import type { FieldProps } from 'redux-form'
import { SelectOptions } from '../../types'

type Props = {
  label: string,
  type: string,
  options: Array<SelectOptions>
} & FieldProps

const SelectField = ({ input, label, type, meta: { touched, error, warning }, options }:Props) => (
  <div>
    <label htmlFor={input.name}>{label}</label>
    <div>
      <select id={input.name} {...input} type={type}>
        <option />
        {options && options.map(({ title, value }) => (
          <option value={value} key={value}>{title}</option>
        ))}
      </select>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export default SelectField
