import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import TextField from 'components/TextField/TextField'
import SelectField from 'components/SelectField/SelectField'
import FileField from 'components/FileField/FileField'
import typicalValidation from './TypicalValidation'

const TypicalForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props

  return (
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

      <Field
        name="avatar"
        type="file"
        component={FileField}
      />

      <button type="submit" disabled={pristine || submitting}>Submit</button>
      <button type="button" disabled={pristine || submitting} onClick={reset}>Reset</button>
    </form>
  )
}

TypicalForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'typical', // a unique identifier for this form
  validate: typicalValidation
})(TypicalForm)
