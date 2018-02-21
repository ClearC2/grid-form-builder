import React, {Component} from 'react'
import {Map} from 'immutable'

export default class Select extends Component {
  render = () => {
    const {inline, formValues = Map(), handleOnChange = () => {}, config = {}} = this.props
    const {labelStyle = {}, style = {}, name = null} = config
    if (!name) return null
    const {label = name, keyword = {}} = config
    const {options = []} = keyword

    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        flexDirection: inline ? 'row' : 'column',
        background: 'transparent'
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
      input: {
        display: 'flex',
        flexGrow: 1,
        height: inline ? 27 : 25,
        borderBottom: '1px solid #a0a0a0',
        borderTop: inline ? 0 : '1px solid #a0a0a0',
        borderLeft: inline ? 0 : '1px solid #a0a0a0',
        borderRight: inline ? 0 : '1px solid #a0a0a0',
        paddingLeft: 5,
        minWidth: 90,
        ...style
      }
    }

    return (
      <div style={styles.container}>
        <div style={styles.labelContainer}>
          <strong style={styles.label}>{label}</strong>
        </div>
        <select onChange={handleOnChange} className='select-grid-input' style={styles.input} name={name} value={formValues.get(name, '')}>
          <option key='blank' value='' />{/* {should all selects have a blank option?} */}
          {options.map((option, i) => <option key={i} value={option.value}>{option.label ? option.label : option.value}</option>)}
        </select>
      </div>
    )
  }
}
