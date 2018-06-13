import React, {Component} from 'react'
import DateTime from 'react-datetime'
import {Map} from 'immutable'

export default class Date extends Component {
  handleChange = val => {
    const {handleOnChange = () => {}} = this.props
    const field = this.props.config.name
    const value = typeof val === 'object' ? val.format('M/D/YYYY') : val
    let e = {target: {name: field, value}}
    handleOnChange(e)
  }
  onMouseDown = e => {
    if (this.props.draggable) e.stopPropagation()
  }
  render = () => {
    const {inline, formValues = Map(), config = {}, Icon = null, requiredWarning} = this.props
    const {labelStyle = {}, name = null, iconStyle = {}, required = false, containerStyle = {}, onKeyDown = () => null} = config
    if (!name) return null
    const {label = name} = config
    const warn = requiredWarning && formValues.get(name, '').length === 0 && required
    let {readonly = false, disabled = false} = config
    disabled = disabled || readonly

    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        flexDirection: inline ? 'row' : 'column',
        background: 'transparent',
        paddingBottom: 5,
        ...containerStyle
      },
      labelContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: inline ? 150 : '100%',
        minWidth: inline ? 150 : '100%',
        height: 15,
        marginTop: inline ? 4 : 0,
        background: 'transparent',
        ...labelStyle
      },
      label: {
        display: 'flex',
        justifyContent: 'flex-start',
        lineHeight: inline ? '23px' : '15px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: inline ? '10pt' : '8pt',
        background: 'transparent',
        color: '#383e4b',
        ...labelStyle
      },
      icon: {
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: inline ? 3 : -1,
        ...iconStyle
      }
    }

    let className = inline ? `date-wrapper-grid-input date-wrapper-grid-input-inline` : `date-wrapper-grid-input`
    className = !warn ? className : className + ' warn-required'
    const inputClass = warn ? 'warn-required' : ''
    const placeholder = warn ? '* This Field Is Required' : ''

    return (
      <div style={styles.container}>
        <div style={styles.labelContainer}>
          {required && <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>}
          {Icon && <Icon style={styles.icon} />}
          <strong style={styles.label}>{label}</strong>
        </div>
        <DateTime
          onMouseDown={this.onMouseDown}
          value={formValues.get(name, '')}
          onChange={this.handleChange}
          dateFormat='M/D/YYYY'
          timeFormat={false}
          className={className}
          inputProps={{
            disabled: disabled,
            placeholder: placeholder,
            className: inputClass
          }}
          onKeyDown={onKeyDown}
        />
      </div>
    )
  }
}
