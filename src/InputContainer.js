import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class InputContainer extends Component {
  static propTypes = {
    config: PropTypes.object,
    input: PropTypes.func
  }

  render () {
    const {config, input: Input} = this.props
    return (
      <Input config={config} />
    )
  }
}
