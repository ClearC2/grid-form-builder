import React, {Component} from 'react'
import PropTypes from 'prop-types'

import RenderDateRangePicker from './DateRangePicker'

class DateWrapper extends Component {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    visible: PropTypes.bool
  }

  state = {
    mount: false,
    visible: false
  }

  componentDidMount () {
    this.setState({mount: true})
  }

  shouldComponentUpdate (nextProps, nextState) {
    const old = this.props.value
    const next = nextProps.value
    let reload = (!this.state.mount || (nextProps.value !== this.props.value))
    reload = reload || (this.props.visible !== nextProps.visible)

    if (!reload && old && next && old._d && next._d) {
      return !!old.diff(next)
    }

    return reload
  }

  componentWillUnmount () {
    this.setState({mount: false})
  }

  render () {
    return (
      <div>
        {this.props.visible &&
        <RenderDateRangePicker
          {...this.props}
        />
        }
      </div>
    )
  }
}

export default DateWrapper
