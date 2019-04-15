import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ToggleButton from 'react-toggle-button'

class Toggle extends Component {
  static propTypes = {
    value: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    activeLabel: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    inactiveLabel: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  }

  render () {
    return (
      <ToggleButton
        activeLabel={this.props.activeLabel}
        inactiveLabel={this.props.inactiveLabel}
        value={this.props.value}
        onToggle={this.props.onToggle}
        activeLabelStyle={{color: '#FFFFFF'}}
        inactiveLabelStyle={{color: '#FFFFFF'}}
        colors={{
          activeThumb: {
            base: '#1e8fc6' // 'rgb(62,130,247)'
          },
          inactiveThumb: {
            base: '#1e8fc6' // 'rgb(62,130,247)'
          },
          active: {
            base: 'rgb(65,66,68)',
            hover: 'rgb(95,96,98)'
          },
          inactive: {
            base: 'rgb(65,66,68)',
            hover: 'rgb(95,96,98)'
          }
        }}
      />
    )
  }
}

export default Toggle
