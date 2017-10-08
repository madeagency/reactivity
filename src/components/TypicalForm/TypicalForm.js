// @flow

import React from 'react'
import { Field, reduxForm } from 'redux-form'
import type { FormProps } from 'redux-form'
import TextField from '../TextField/TextField'
import SelectField from '../SelectField/SelectField'
import typicalValidation from './TypicalValidation'

const TypicalForm = ({ handleSubmit, pristine, reset, submitting }:FormProps) => (
  <form onSubmit={handleSubmit} noValidate>
    <Field
      name="firstName"
      component={TextField}
      type="text"
      label="First Name"
    />

    <Field
      name="email"
      component={TextField}
      type="email"
      label="Email Address"
    />

    <Field
      name="favoriteColor"
      component={SelectField}
      type="select"
      label="Favorite Color"
      options={[
        { title: 'red', value: 'ff0000' },
        { title: 'blue', value: '00ff00' },
        { title: 'orange', value: '0000ff' }
      ]}
    />

    <button type="submit" disabled={pristine || submitting}>Submit</button>
    <button type="button" disabled={pristine || submitting} onClick={reset}>Reset</button>
  </form>
)

export default reduxForm({
  form: 'typical', // a unique identifier for this form
  validate: typicalValidation
})(TypicalForm)
