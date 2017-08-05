import React from 'react'
import PropTypes from 'prop-types'

class FileField extends React.Component {
  static propTypes = {
    input: PropTypes.shape().isRequired
  }

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { input: { onChange } } = this.props
    onChange(e.target.files[0])
  }

  render() {
    return (
      <input
        type="file"
        onChange={this.onChange}
      />
    )
  }
}

export default FileField
