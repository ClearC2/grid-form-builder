import React, {Component} from 'react'
import {Map} from 'immutable'

export default class Checkbox extends Component {
  handleOnChange = e => {
    const {formValues = Map(), handleOnChange = () => {}, config} = this.props
    const {name = null} = config
    let value = formValues.get(name, '')
    if (typeof value === 'string') value = value.toLowerCase() === 'yes'
    value = !value
    handleOnChange({target: {name: e.target.name, value}})
  }

  render = () => {
    const {inline, formValues = Map(), config = {}} = this.props
    const {labelStyle = {}, style = {}, name = null} = config
    if (!name) return null
    const {label = name} = config
    let value = formValues.get(name, '')
    if (typeof value === 'string') value = value.toLowerCase() === 'yes'
    value = !!value

    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        background: 'transparent'
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
        lineHeight: inline ? '10pt' : '8pt',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        ...labelStyle
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
        <label style={styles.label}>
          <input className='checkbox-grid-input' onChange={this.handleOnChange} style={styles.input} type='checkbox' name={name} checked={value} />
          {label}
        </label>
      </div>
    )
  }
}
