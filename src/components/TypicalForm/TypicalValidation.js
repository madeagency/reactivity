// @flow

import memoize from "lru-memoize"
import { createValidator, required, email } from "../../utils/validation"

const typicalValidation = createValidator({
  firstName: required,
  email: [required, email]
})

export default memoize(10)(typicalValidation)
