import React, {Component} from 'react'
import {Map} from 'immutable'

export default class Checkbox extends Component {
  handleOnChange = e => {
    const {formValues = Map(), handleOnChange = () => {}, config} = this.props
    const {name = null} = config
    let value = formValues.get(name, '')
    if (typeof value === 'string') {
      value = (value.toLowerCase() === 'yes' || value.toLowerCase() === 'on')
    }
    value = !value
    handleOnChange({target: {name: e.target.name, value: value}})
  }

  render = () => {
    const {inline, formValues = Map(), config = {}, Icon = null, requiredWarning} = this.props
    const {labelStyle = {}, style = {}, name = null, iconStyle = {}, required = false, containerStyle = {}, onKeyDown = () => null} = config
    if (!name) return null
    const {label = name} = config
    let value = formValues.get(name, '')
    if (typeof value === 'string') value = value.toLowerCase() === 'yes'
    value = !!value
    let {readonly = false, disabled = false} = config
    disabled = disabled || readonly
    const warn = requiredWarning && formValues.get(name, '').length === 0 && required

    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        background: 'transparent',
        minWidth: 177,
        ...containerStyle
      },
      label: {
        display: 'flex',
        flex: 1,
        height: inline ? 27 : 40,
        margin: 0,
        marginBottom: inline ? 5 : 0,
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: inline ? '10pt' : '8pt',
        lineHeight: '10pt',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        ...labelStyle
      },
      input: {
        display: 'flex',
        marginRight: 5,
        marginTop: 0,
        ...style
      },
      icon: {
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: -1,
        ...iconStyle
      }
    }

    return (
      <div style={styles.container}>
        <label style={styles.label}>
          {Icon && <Icon style={styles.icon} />}
          <input className='checkbox-grid-input' onChange={this.handleOnChange} style={styles.input} type='checkbox' name={name} checked={value} disabled={disabled} onKeyDown={onKeyDown} />
          {label}
          {required && <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>
            * <span style={{fontWeight: 'normal', fontSize: '9pt'}}>{warn ? 'This Field Is Required' : ''}</span>
          </div>}
        </label>
      </div>
    )
  }
}
