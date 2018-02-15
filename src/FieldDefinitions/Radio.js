import React, {Component} from 'react'
import {Map, List} from 'immutable'

export default class Radio extends Component {
  render = () => {
    const {inline, field, formValues = Map(), handleOnChange = () => {}, opts = {}} = this.props
    const value = formValues.get(field, '')
    const {options = List(), label = field, style = {}, labelStyle = {}, Icon = null, iconProps = {}, props = {}, boxed = false} = opts
    const boxStyle = !boxed ? {} : {border: '1px solid lightgrey', backgroundColor: '#f5f5f5'}

    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        flexDirection: inline ? 'row' : 'column',
        background: 'transparent',
        ...boxStyle
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
        ...labelStyle
      },
      optionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginLeft: inline ? 0 : 10,
        marginTop: inline ? 10 : 5
      },
      icon: {
        marginRight: 5,
        width: 20
      },
      input: {
        display: 'flex',
        marginRight: 5,
        marginTop: 0,
        ...style
      }
    }

    return (
      <div style={styles.container}>
        <div style={styles.labelContainer}>
          {!!Icon && <Icon size={20} style={styles.icon} {...iconProps} />}
          <strong style={styles.label}>{label}</strong>
        </div>
        <div style={styles.optionsContainer}>
          {options.map(option => {
            return (
              <label key={option} style={styles.label}>
                <input className='radio-grid-input' onChange={handleOnChange} style={styles.input} type='radio' name={field} value={option} checked={option.toLowerCase() === value.toLowerCase()} {...props} />
                {option}
              </label>
            )
          })}
        </div>
      </div>
    )
  }
}