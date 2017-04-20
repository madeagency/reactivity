import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({ input, label, type, meta: { touched, error, warning }, options }) => (
  <div>
    <label htmlFor={input.name}>{label}</label>
    <div>
      <select {...input} type={type}>
        <option />
        {options && options.map(({ title, value }) => (
          <option value={value} key={value}>{title}</option>
        ))}
      </select>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

SelectField.propTypes = {
  input: PropTypes.shape({}).isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
    warning: PropTypes.bool
  }).isRequired
}

export default SelectField
