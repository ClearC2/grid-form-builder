import React, {Component} from 'react'
import {Map} from 'immutable'

export default class Radio extends Component {
  render = () => {
    const {inline, config = {}, handleOnChange = () => {}, formValues = Map()} = this.props
    const {labelStyle = {}, style = {}, name = null} = config
    if (!name) return null
    const {label = name, keyword = {}, boxed} = config
    const {options = []} = keyword
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
          <strong style={styles.label}>{label}</strong>
        </div>
        <div style={styles.optionsContainer}>
          {options.map((option, i) => {
            return (
              <label key={i} style={styles.label}>
                <input className='radio-grid-input' onChange={handleOnChange} style={styles.input} type='radio' name={name} value={option.value} checked={option.value.toLowerCase() === formValues.get(name, '').toLowerCase()} />
                {option.label ? option.label : option.value}
              </label>
            )
          })}
        </div>
      </div>
    )
  }
}
