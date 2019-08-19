import React, {Component} from 'react'
import PropTypes from 'prop-types'

import RenderDateRangePicker from './DateRangePicker'

class DateWrapper extends Component {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ])
  }

  state = {
    mount: false,
    visible: false
  }

  componentDidMount () {
    this.setState({mount: true})
    this.isInputVisible()
  }

  shouldComponentUpdate (nextProps, nextState) {
    const old = this.props.value
    const next = nextProps.value
    let reload = (!this.state.mount || (nextProps.value && !this.props.value))
    reload = reload || (!this.state.visible && nextState.visible)

    if (!reload && old && next && old._d && next._d) {
      return !!old.diff(next)
    }

    if (!this.state.visible) {
      this.isInputVisible()
    }

    return reload
  }

  componentWillUnmount () {
    this.setState({mount: false})
  }

  isInputVisible = () => {
    if (!this.state.visible && !!document.getElementById(this.props.id)) {
      this.setState({visible: !!document.getElementById(this.props.id)})
    }
  }

  render () {
    return (
      <div>
        {this.state.visible &&
        <RenderDateRangePicker
          {...this.props}
        />
        }
      </div>
    )
  }
}

export default DateWrapper
