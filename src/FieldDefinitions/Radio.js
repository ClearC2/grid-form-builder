import React, {Component} from 'react'
import {Map} from 'immutable'

export default class Radio extends Component {
  render = () => {
    const {inline, config = {}, handleOnChange = () => {}, formValues = Map(), Icon = null, requiredWarning} = this.props
    const {labelStyle = {}, style = {}, name = null, iconStyle = {}, required = false, containerStyle = {}, onKeyDown = () => null} = config
    if (!name) return null
    const {label = name, keyword = {}, boxed} = config
    const {options = []} = keyword
    const boxStyle = !boxed ? {} : {border: '1px solid lightgrey', backgroundColor: '#f5f5f5'}
    let {readonly = false, disabled = false} = config
    disabled = disabled || readonly
    const warn = requiredWarning && formValues.get(name, '').length === 0 && required

    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        flexDirection: inline ? 'row' : 'column',
        background: 'transparent',
        minWidth: 177,
        ...boxStyle,
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
        lineHeight: inline ? '12pt' : '11pt',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: inline ? '10pt' : '8pt',
        background: 'transparent',
        ...labelStyle
      },
      optionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginLeft: inline ? 0 : 10,
        marginTop: inline ? 10 : 5
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
        <div style={styles.labelContainer}>
          {required && <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>}
          {Icon && <Icon style={styles.icon} />}
          <strong style={styles.label}>{label}</strong>
          <span style={{fontWeight: 'normal', fontSize: '9pt', color: 'red', marginLeft: 9}}>{warn ? 'This Field Is Required' : ''}</span>
        </div>
        <div style={styles.optionsContainer}>
          {options.map((option, i) => {
            return (
              <label key={i} style={styles.label}>
                <input className='radio-grid-input' onChange={handleOnChange} style={styles.input} type='radio' name={name} value={option.value} checked={option.value.toLowerCase() === formValues.get(name, '').toLowerCase()} disabled={disabled} onKeyDown={onKeyDown} />
                {option.label ? option.label : option.value}
              </label>
            )
          })}
        </div>
      </div>
    )
  }
}
